const mongoose = require("mongoose");

const introSchema = new mongoose.Schema({
  
    name:{
        type: String,
        required: true
    },
    roles:{
        type:Array,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    github:{
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        required: true
    },
    youtube:{
        type: String,
        required: true
    },
    insta:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    resume:{
        type: String,
        required: true
    },
   
    address:{
      type: String,
        required: true
    },
    email:{
      type: String,
        required: true
    },
    phone:{
      type: String,
        required: true
    },

  

});

const skillsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    skills: [
        {
            name: {
                type: String,
                required: true
            },
            image: {
                type: String
            }
        }
    ]
});



const projectSchema = new mongoose.Schema({
 
  title: { type: String, required: true }, // Project title
  date: { type: String, required: true }, // Date or duration of the project
  description: { type: String, required: true }, // Project description
  image: { type: String, required: true }, // Image URL
  tags: { type: [String], required: true }, // Array of tech stack tags
  category: { type: String, required: true }, // Project category (e.g., web app)
  github: { type: String, required: true }, // GitHub link
  webapp: { type: String, required: true }, // Web app link
  member: [
    {
      name: { type: String, required: true }, // Member name
      img: { type: String, required: true }, // Image URL for the member
      linkedin: { type: String, required: true }, // LinkedIn profile link
      github: { type: String, required: true } // GitHub profile link
    }
  ]
});

const educationSchema = new mongoose.Schema({
    img: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
  });

  const experienceSchema = new mongoose.Schema({
    img: {
      type: String, // URL for the image
      required: true
    },
    role: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    date: {
      type: String, // Date in string format (can be changed to Date object if needed)
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    skills: {
      type: [String], // Array of strings to store skills
      required: true
    },
    doc: {
      type: String, // URL for the document, optional field
    }
  });

  const articleSchema = new mongoose.Schema({
    img: {
      type: String, // URL for the image
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    
  });

  const awardSchema = new mongoose.Schema({
    img: {
      type: String, // URL for the image
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    
  });


module.exports ={
    Intro: mongoose.model("intros", introSchema),
    Skill: mongoose.model("skills", skillsSchema),
    Project: mongoose.model("projects", projectSchema),
    Education: mongoose.model("educations", educationSchema),
    Experience: mongoose.model("experiences", experienceSchema),
    Article: mongoose.model("articles",articleSchema),
    Award:mongoose.model("awards",awardSchema),
 
} 
