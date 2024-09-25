const router = require("express").Router();
const {Intro,Skill,Project,Education,Experience,Article,Award} = require("../models/portfolioModel");



//get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
    try {
        const intros = await Intro.find();
        const skills = await Skill.find();
        const projects = await Project.find();
        const educations = await Education.find();
        const experiences = await Experience.find();
        const articles = await Article.find();
        const awards = await Award.find();

       

        res.status(200).send({
            intro: intros[0], // Adjust as needed
            skill: skills,
            project: projects,
            education: educations,
            experience: experiences,
            article: articles || [], 
            award: awards || [],// Ensure articles is an array or default to empty array
        });
    } catch (error) {
        console.error("Error fetching portfolio data:", error);
        res.status(400).send(error);
    }
});


//update intro
router.post("/update-intro", async (req, res) => {
  console.log("Incoming request data:", req.body); // Log incoming data
  try {
      const intro = await Intro.findOneAndUpdate(
          { _id: req.body._id },
          req.body,
          { new: true }
      );

      if (!intro) {
          return res.status(404).send({ success: false, message: "Intro not found" });
      }

      res.status(200).send({
          data: intro,
          success: true,
          message: "Intro updated successfully"
      });
  } catch (error) {
      console.error("Error updating intro:", error); // Log error details
      res.status(400).send(error);
  }
});




router.post("/update-skills", async (req, res) => {
    try {
      const updatedSkills = req.body.skills; // Array of updated skills
  
      // Update each skill or replace the entire skills array
      await Skill.deleteMany({}); // Remove old skills
      await Skill.insertMany(updatedSkills); // Insert new skills
  
      res.status(200).send({
        success: true,
        message: "Skills updated successfully"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post("/update-projects", async (req, res) => {
    try {
      const updatedProjects = req.body.projects; // Array of updated projects
  
      // Validate each project to ensure it has required fields
      updatedProjects.forEach(project => {
        if (!project.title || !project.description || !project.image || !project.category) {
          throw new Error("Each project must have a title, description, image, and category.");
        }
      });
  
      // Loop through each project and either update or create it
      for (const project of updatedProjects) {
        await Project.updateOne(
          { _id: project._id }, // Match by ID
          { $set: project }, // Update project fields
          { upsert: true } // Insert if it doesn't exist
        );
      }
  
      res.status(200).send({
        success: true,
        message: "Projects updated successfully"
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Failed to update projects",
        error: error.message
      });
    }
  });
  
  

router.post("/update-education", async (req, res) => {
  try {
    const updatedEducation = req.body.education; // Array of updated education

    // Update each education or replace the entire education array
    await Education.deleteMany({}); // Remove old education entries
    await Education.insertMany(updatedEducation); // Insert new education entries

    res.status(200).send({
      success: true,
      message: "Education updated successfully"
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to update education",
      error: error.message
    });
  }
});

router.post("/update-experience", async (req, res) => {
    try {
      const updatedExperiences = req.body.experiences; // Array of updated experiences
  
      // Update each experience or replace the entire experiences array
      await Experience.deleteMany({}); // Remove old experiences
      await Experience.insertMany(updatedExperiences); // Insert new experiences
  
      res.status(200).send({
        success: true,
        message: "Experiences updated successfully"
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Failed to update experiences",
        error: error.message
      });
    }
  });

  router.get('/get-articles', async (req, res) => {
    try {
      const articles = await Article.find();
      res.status(200).send(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(400).send(error);
    }
  });

  router.post('/update-articles', async (req, res) => {
    try {
      const updatedArticles = req.body.articles; // Array of updated articles
  
      // Validate and update each article
      await Article.deleteMany({}); // Remove all existing articles
      await Article.insertMany(updatedArticles); // Insert new articles
  
      res.status(200).send({
        success: true,
        message: 'Articles updated successfully',
      });
    } catch (error) {
      console.error('Error updating articles:', error);
      res.status(400).send({
        success: false,
        message: 'Failed to update articles',
        error: error.message,
      });
    }
  });

  router.get('/get-awards', async (req, res) => {
    try {
      const awards = await Award.find();
      res.status(200).send(awards);
    } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(400).send(error);
    }
  });

  router.post('/update-awards', async (req, res) => {
    try {
      const updatedAwards = req.body.awards; // Array of updated articles
  
      // Validate and update each article
      await Award.deleteMany({}); // Remove all existing articles
      await Award.insertMany(updatedAwards); // Insert new articles
  
      res.status(200).send({
        success: true,
        message: 'Awards updated successfully',
      });
    } catch (error) {
      console.error('Error updating awards:', error);
      res.status(400).send({
        success: false,
        message: 'Failed to update awards',
        error: error.message,
      });
    }
  });

module.exports = router;


