const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import models
const {Intro, Skill, Project, Education, Experience, Article, Award, Testimonial} = require("./models/portfolioModel");
const User = require("./models/userModel");

// Sample data
const sampleIntro = {
  name: "Your Name",
  roles: ["Full Stack Developer", "UI/UX Designer"],
  description: "Welcome to my portfolio! I'm a passionate developer with experience in modern web technologies.",
  profileImage: "/uploads/default-profile.jpg", // Local image path
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  youtube: "https://youtube.com/@yourusername",
  insta: "https://instagram.com/yourusername",
  facebook: "https://facebook.com/yourusername",
  resume: "https://your-resume-link.com",
  address: "Your City, Country",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567"
};

const sampleSkills = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", image: "/uploads/skills/react-icon.svg" },
      { name: "JavaScript", image: "/uploads/skills/javascript-icon.svg" },
      { name: "HTML5", image: "/uploads/skills/html5-icon.svg" },
      { name: "CSS3", image: "/uploads/skills/css3-icon.svg" }
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", image: "/uploads/skills/nodejs-icon.svg" },
      { name: "Express", image: "/uploads/skills/express-icon.svg" },
      { name: "MongoDB", image: "/uploads/skills/mongodb-icon.svg" }
    ]
  }
];

const sampleProjects = [
  {
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Node.js",
    image: "/uploads/projects/portfolio-project.jpg",
    github: "https://github.com/yourusername/portfolio",
    webapp: "https://yourportfolio.com",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    category: "web app"
  }
];

const sampleEducation = [
  {
    school: "Your University",
    degree: "Bachelor of Computer Science",
    date: "2020 - 2024",
    grade: "3.8 GPA",
    desc: "Focused on software engineering and web development."
  }
];

const sampleExperience = [
  {
    role: "Full Stack Developer",
    company: "Tech Company",
    date: "Jan 2024 - Present",
    desc: "Working on modern web applications using React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "MongoDB", "Express"]
  }
];

const defaultUser = {
  username: "admin",
  password: "admin123" // In production, this should be hashed
};

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Clear existing data
    console.log("Clearing existing data...");
    await Promise.all([
      Intro.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Article.deleteMany({}),
      Award.deleteMany({}),
      Testimonial.deleteMany({}),
      User.deleteMany({})
    ]);

    // Insert sample data
    console.log("Inserting sample data...");
    
    await Intro.create(sampleIntro);
    console.log("✓ Intro data inserted");
    
    await Skill.insertMany(sampleSkills);
    console.log("✓ Skills data inserted");
    
    await Project.insertMany(sampleProjects);
    console.log("✓ Projects data inserted");
    
    await Education.insertMany(sampleEducation);
    console.log("✓ Education data inserted");
    
    await Experience.insertMany(sampleExperience);
    console.log("✓ Experience data inserted");
    
    await User.create(defaultUser);
    console.log("✓ Admin user created");

    console.log("\n🎉 Database seeded successfully!");
    console.log("You can now login with:");
    console.log("Username: admin");
    console.log("Password: admin123");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
    process.exit();
  }
}

// Run the seeding function
seedDatabase();
