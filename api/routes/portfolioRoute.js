const router = require("express").Router();
const {Intro,Skill,Project,Education,Experience,Article,Award,Testimonial} = require("../models/portfolioModel");
const User = require("../models/userModel"); // Ensure this path is correct



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
        const testimonials = await Testimonial.find();

       

        res.status(200).send({
            intro: intros[0], // Adjust as needed
            skill: skills,
            project: projects,
            education: educations,
            experience: experiences,
            article: articles || [], 
            award: awards || [], 
            testimonial: testimonials || [],
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

  
  
  // Ensure the backend checks for missing required fields in new projects
  router.post('/update-projects', async (req, res) => {
    try {
      const updatedProjects = req.body.projects;
      const deletedProjects = req.body.deletedProjects;
  
      console.log('Received updated projects:', updatedProjects);
      console.log('Received deleted projects:', deletedProjects);
  
      // Validate data
      if (!Array.isArray(updatedProjects) || !Array.isArray(deletedProjects)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid data format. Projects and deletedProjects must be arrays.',
        });
      }
  
      // Validate that new projects have required fields
      for (const project of updatedProjects) {
        if (!project._id) {
          if (!project.title || !project.description || !project.image) {
            console.log('Missing required fields:', project); // Log the problematic project
            return res.status(400).send({
              success: false,
              message: 'Missing required fields (title, description, or image) for new project.',
            });
          }
        }
      }
  
      // Remove deleted projects from the database
      if (deletedProjects.length > 0) {
        await Project.deleteMany({ _id: { $in: deletedProjects } });
      }
  
      // Insert or update each project
      for (const project of updatedProjects) {
        if (project._id) {
          await Project.findByIdAndUpdate(project._id, project);
        } else {
          const newProject = new Project(project);
          await newProject.save();
        }
      }
  
      res.status(200).send({
        success: true,
        message: 'Projects updated successfully',
      });
    } catch (error) {
      console.error('Error updating projects:', error); // Log the full error
      res.status(400).send({
        success: false,
        message: 'Error updating projects',
        error: error.message,
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
    const deletedExperiences = req.body.deletedExperiences; // Array of IDs for experiences to be deleted

    // Use Promise.all to handle concurrent updates and inserts
    const updatePromises = updatedExperiences.map(async (experience) => {
      if (experience._id) {
        // If there's an ID, update the existing experience
        return await Experience.findByIdAndUpdate(experience._id, experience, { new: true });
      } else {
        // If there's no ID, insert a new experience
        return await Experience.create(experience);
      }
    });

    // Handle experience deletions
    if (deletedExperiences && deletedExperiences.length > 0) {
      const deletePromises = deletedExperiences.map(async (id) => {
        return await Experience.findByIdAndDelete(id);
      });
      await Promise.all(deletePromises);
    }

    // Wait for all updates to complete
    await Promise.all(updatePromises);

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

//admin login
router.post("/admin-login", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Check incoming data

    // Attempt to find the user
    const user = await User.findOne({ username: req.body.username, password: req.body.password });
    console.log("User found:", user); // Log the user result
    user.password = "";
    if (user) {
      res.status(200).send({
        data: user,
        success: true,
        message: "User logged in successfully", // Or "Admin logged in successfully"
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(400).send({
      success: false,
      message: "An error occurred",
      error: error.message
    });
  }
});

router.get("/", (req, res) => {
  res.json({ message: "Portfolio route works!" });
});

router.post("/update-testimonials", async (req, res) => {
  try {
    const updatedTestimonials = req.body.testimonials; // Array of updated testimonials
    const deletedTestimonials = req.body.deletedTestimonials; // Array of IDs for testimonials to be deleted

    // Handle updates and inserts
    const updatePromises = updatedTestimonials.map(async (testimonial) => {
      if (testimonial._id) {
        // Update existing testimonial
        return await Testimonial.findByIdAndUpdate(testimonial._id, testimonial, { new: true });
      } else {
        // Create new testimonial
        return await Testimonial.create(testimonial);
      }
    });

    // Handle deletions
    if (deletedTestimonials && deletedTestimonials.length > 0) {
      const deletePromises = deletedTestimonials.map(async (id) => {
        return await Testimonial.findByIdAndDelete(id);
      });
      await Promise.all(deletePromises);
    }

    // Wait for all promises to complete
    await Promise.all(updatePromises);

    res.status(200).send({
      success: true,
      message: "Testimonials updated successfully"
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to update testimonials",
      error: error.message
    });
  }
});






module.exports = router;


