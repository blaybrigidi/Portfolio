import express from 'express';

const router = express.Router();

// POST analyze job
router.post('/analyze', async (req, res) => {
  try {
    const { jobDescription } = req.body;
    
    if (!jobDescription) {
      return res.status(400).send({
        status: 400,
        msg: "Job description is required",
        data: null
      });
    }
    
    // In a real implementation, this would call the OpenAI/Claude API
    // For now, we'll return mock data
    const mySkills = [
      'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express', 'MongoDB',
      'SQLite', 'RESTful APIs', 'Git', 'Responsive Design'
    ];
    
    // Simple matching algorithm
    const matchingSkills = [];
    const missingSkills = [];
    
    // Convert job description to lowercase for case-insensitive matching
    const jobDescLower = jobDescription.toLowerCase();
    
    // Check which skills are mentioned in the job description
    mySkills.forEach(skill => {
      if (jobDescLower.includes(skill.toLowerCase())) {
        matchingSkills.push(skill);
      }
    });
    
    // Extract some potential skills from the job description
    const potentialSkills = ['TypeScript', 'Angular', 'Vue.js', 'PHP', 'Python', 'Java', 'C#', 'Docker', 'AWS', 'Azure'];
    potentialSkills.forEach(skill => {
      if (jobDescLower.includes(skill.toLowerCase()) && !mySkills.includes(skill)) {
        missingSkills.push(skill);
      }
    });
    
    // Calculate match score
    const matchScore = Math.min(90, Math.round((matchingSkills.length / (matchingSkills.length + missingSkills.length)) * 100));
    
    // Ensure score is at least 40% for demo purposes
    const finalScore = Math.max(40, matchScore);
    
    // Generate analysis text
    const analysis = `Based on the job description, I'm a ${finalScore}% match for this position. 
                     I have strong experience with ${matchingSkills.slice(0, 3).join(', ')} which are key requirements.
                     ${missingSkills.length > 0 ? 
                       `To be an even better fit, I could develop skills in ${missingSkills.join(', ')}.` : 
                       'I have all the skills needed for this position!'}`;
    
    return res.status(200).send({
      status: 200,
      msg: "Job analysis completed successfully",
      data: {
        score: finalScore,
        matchingSkills,
        missingSkills,
        analysis
      }
    });
    
  } catch (error) {
    console.error("Error in job analysis:", error);
    return res.status(500).send({
      status: 500,
      msg: "Error analyzing job description",
      data: null
    });
  }
});

export default router; 