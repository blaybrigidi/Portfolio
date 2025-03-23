import { sequelize } from '../config/db.js';
import Project from '../models/Project.js';

// Define seed data for projects
const projectsData = [
  {
    title: "Commission: Zahra's Website",
    description: "Developed a website for an artist to showcase their work and facilitate exhibition bookings.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "ExpressJs", "MongoDB"],
    imageUrl: "/images/exhibitionart.jpg",
    githubUrl: "https://github.com/blaybrigidi/ZExhibitionWebsite",
    projectUrl: "https://zahra-exhibition-website.onrender.com",
    featured: false
  },
  {
    title: "News App",
    description: "A responsive React news application that delivers real-time headlines across various categories through the News API. Features include topic filtering, search functionality, and a clean, intuitive interface.",
    technologies: ["React", "JavaScript", "FetchAPI", "NewsAPI"],
    imageUrl: "https://snworksceo.imgix.net/jhn/d00486c1-8c64-4b94-b21d-a82964048e43.sized-1000x1000.png?w=1000",
    githubUrl: "https://github.com/blaybrigidi/news-app",
    projectUrl: "https://news-app-demo.onrender.com",
    featured: false
  }
];

// Seed the database with projects
const seedProjects = async () => {
  try {
    // Sync the database models
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Create projects from seed data
    for (const project of projectsData) {
      await Project.create(project);
      console.log(`Project created: ${project.title}`);
    }
    
    console.log('All projects have been seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

// Run the seeder
seedProjects(); 