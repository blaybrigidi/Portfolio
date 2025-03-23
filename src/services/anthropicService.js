import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

// Check if API key is available
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('⚠️ ANTHROPIC_API_KEY is not set in environment variables!');
  console.error('Job analysis will fall back to mock implementation.');
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

/**
 * Analyze job fit using Anthropic's Claude model
 * @param {string} jobDescription - The job description to analyze
 * @returns {Object} - Analysis results with score, matching skills, missing skills
 */
export async function analyzeJobFit(jobDescription) {
  try {
    // Define your skills and experience here for Claude to reference
    const mySkills = `
    My Skills and Experience:
    
    Technical Skills:
    - Programming Languages: JavaScript, HTML, CSS, Python, Java, C++
    - Frameworks/Libraries: React.js, Node.js, Express.js
    - Databases: MongoDB, PostgreSQL, SQLite
    - Tools: Git, npm
    - Testing: Postman
    - Deployment: Render
    
    Projects & Experience:
    - Built a personal portfolio website with a job analysis feature using Claude's API
    - Created full-stack web applications with React frontend and Node.js backend
    - Implemented responsive designs for optimal viewing on all devices
    - Worked with REST APIs for data fetching and manipulation
    - Set up database schemas and models using Sequelize ORM
    - Implemented user authentication and authorization
    
    Soft Skills:
    - Problem-solving
    - Teamwork and collaboration
    - Communication skills
    - Time management
    - Adaptability and fast learning
    
    Education:
    - Bachelor's degree in Computer Science 
    - Online courses and certifications in web development
    `;

    // Create a prompt for Claude
    const prompt = `
    ${mySkills}

    Job Description:
    ${jobDescription}

    Based on the job description and my skills/experience above, please:
    1. Analyze how well my skills match the job requirements
    2. Calculate a match percentage score (0-100)
    3. Identify which of my skills match the job requirements
    4. Identify key skills mentioned in the job description that I may need to develop
    5. Provide a brief analysis of my overall fit for this position

    Format your response as JSON with the following structure:
    {
      "score": [a number from 0-100 representing match percentage],
      "analysis": [a 2-3 sentence summary of my fit for this role],
      "matchingSkills": [an array of strings listing my skills that match the job],
      "missingSkills": [an array of strings listing skills I should develop]
    }
    
    Provide ONLY valid JSON in your response with no additional text before or after.
    `;

    // Make the API call to Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1000,
      system: "You are a helpful job application assistant that analyzes job descriptions against a candidate's skills and provides honest, objective feedback as JSON.",
      messages: [{ role: 'user', content: prompt }]
    });

    // Parse the JSON response
    const content = response.content[0].text;
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanedContent);

    return result;
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    // Fallback to a mock response if the API call fails
    return fallbackAnalysis(jobDescription);
  }
}

/**
 * Fallback analysis if the API call fails
 * @param {string} jobDescription - The job description to analyze
 * @returns {Object} - Mock analysis results
 */
function fallbackAnalysis(jobDescription) {
  // Extract some keywords for a basic match (very simplified)
  const jobLower = jobDescription.toLowerCase();
  const keywords = ['javascript', 'html', 'css', 'react', 'node', 'api', 'git'];
  
  const matchingSkills = keywords.filter(keyword => jobLower.includes(keyword));
  const score = Math.min(Math.round((matchingSkills.length / keywords.length) * 100), 85);
  
  return {
    score: score,
    analysis: "This is a fallback analysis due to API issues. Based on simple keyword matching, there appears to be some alignment with your skills.",
    matchingSkills: matchingSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)),
    missingSkills: ["API analysis unavailable - please try again later"]
  };
}
