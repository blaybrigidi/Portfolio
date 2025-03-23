import express from 'express';
import { analyzeJobFit } from '../services/anthropicService.js';

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
    
    // Call the Anthropic service to analyze the job description
    const analysisResult = await analyzeJobFit(jobDescription);
    
    return res.status(200).send({
      status: 200,
      msg: "Job analysis completed successfully",
      data: analysisResult
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