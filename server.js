const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Portfolio data (in a real app, this would come from a database)
const portfolioData = {
  profile: {
    name: "Divya B Gowda",
    title: "Python Backend Developer and AI/ML Engineer",
    bio: "Aspiring python backend developer and data science enthusiast with strong skills in Python and modern web technologies. I enjoy building real-world projects, exploring innovative solutions, and continuously learning to bring impactful ideas to life through code.",
    skills: ["Python", "SQL", "Java", "Flask", "FastAPI", "Django", "HTML", "CSS", "Streamlit", "Docker", "REST APIs", "GitHub", "CI/CD", "MySQL", "MongoDB", "PostgreSQL", "AWS"],
    experience: [
      {
        company: "Technocolabs Softwares",
        position: "Data Scientist Intern",
        duration: "Feb 2024 - July 2024",
        description: "Engineered end-to-end data science pipelines, from data preprocessing to model deployment",
        type: "work"
      },
      {
        company: "Don Bosco Institute of Technology",
        position: "Bachelor of Engineering - Information Science",
        duration: "2022 - 2026",
        description: "Currently pursuing Bachelor's degree in Information Science and Engineering. Specializing in software development, data structures, algorithms, database management, and web technologies. Maintaining strong academic performance while working on practical projects.",
        type: "education"
      },
      {
        company: "Pre-University College",
        position: "Pre-University Course (Science Stream)",
        duration: "2020 - 2022",
        description: "Completed higher secondary education in Science stream with subjects including Physics, Chemistry, Mathematics, and Computer Science. Achieved excellent grades and developed strong analytical and problem-solving skills.",
        type: "education"
      },
      {
        company: "High School",
        position: "Secondary School Certificate (10th Grade)",
        duration: "2020",
        description: "Completed secondary education with distinction. Developed foundational knowledge in mathematics, sciences, and languages. Participated in various academic competitions and extracurricular activities.",
        type: "education"
      }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Smart Library assistant",
      description: "A full-featured Library Information Management System built with Django, designed to manage books, readers, and transactions through a clean, web-based interface. It simplifies daily operations such as lending, returns, and inventory tracking with real-time updates and administrative controls.",
      technologies: ["Python", "Django", "SQLite", "HTML", "CSS", "Bootstrap"],
      github: "https://github.com/DivyaBGowda484/LibraryInformationManagementSystem",
      live: "https://www.youtube.com/watch?v=BIIp7xqaD6w",
      image: "/images/project1.jpg", // To be changed
      features: [
        "User authentication and role-based access (librarian/admin)",
        "Reader registration and management system",
        "Book catalog with search and filtering by title, author, or genre",
        "Borrowing system with automatic due date and availability checks",
        "Return processing with overdue tracking and notifications",
        "Real-time inventory updates for available and borrowed books",
        "Admin dashboard with enhanced Django interface and bulk operations",
        "Responsive design with intuitive Bootstrap-based UI"
      ]
    },
    {
      id: 2,
      title: "Instabrief – Summarize Smarter, Tag Faster",
      description: "An AI-powered tool that automates document summarization and tagging. It uses NLP and ML techniques to generate concise summaries and contextually relevant tags, making it easier to process large volumes of unstructured text.",
      technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "MongoDB", "Elasticsearch", "spaCy", "Hugging Face Transformers", "NLTK", "Sentence-Transformers", "gTTS", "Docker"],
      github: "https://github.com/DivyaBGowda484/InstaBrief-SummarizeSmarterTagFaster",
      live: "", // To be changed
      image: "/images/project2.jpg", // To be changed
      features: [
        "AI-powered extractive and abstractive document summarization",
        "Context-aware tagging with keywords, named entities, and categories",
        "Multilingual support using mBART, mT5, and custom models",
        "Semantic search and keyword-based document retrieval with Elasticsearch",
        "Custom model training for domain-specific summarization and tagging",
        "Optional text-to-speech output for generated summaries",
        "Integration with external document management systems (e.g., Google Drive)",
        "Responsive React frontend with Tailwind CSS for a seamless user experience"
      ]
    },
    {
      id: 3,
      title: "Bank Churn Prediction",
      description: "A machine learning-based system that analyzes customer behavior and predicts churn in banking services. This project uses exploratory data analysis, feature engineering, and multiple ML models (Logistic Regression, Random Forest, XGBoost, MLP) to identify customers likely to exit, helping financial institutions improve customer retention strategies.",
      technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Scikit-learn", "XGBoost", "Streamlit"]      ,
      github: "https://github.com/DivyaBGowda484/CustomerChurnPredictionWebApp",
      live: "https://github.com/DivyaBGowda484/bank-churn-prediction/blob/main/ScreenRecording%20-%20BankChurnWebApp%20Demo.mov?raw=true",
      image: "/images/project3.jpg", // To be changed
      features: [
        "Exploratory data analysis using visualizations to find churn patterns",
        "Feature engineering for age groups, salary categories, and geography",
        "Encoding of categorical data using Label and One-Hot Encoding",
        "Scaling of numerical features using StandardScaler",
        "Multiple ML models including Logistic Regression, Random Forest, XGBoost, and MLP",
        "Model evaluation using accuracy, precision, recall, and F1-score",
        "Hyperparameter tuning using GridSearchCV for optimal performance",
        "Interactive charts and visual insights using Plotly and Seaborn"
      ]
    },
    /*{
      id: 4,
      title: "Social Media Dashboard",
      description: "A comprehensive social media management platform that allows users to schedule posts, analyze engagement metrics, and manage multiple social media accounts from a single interface.",
      technologies: ["React", "Node.js", "MongoDB", "Redis", "Social APIs"],
      github: "https://github.com/yourusername/social-dashboard",
      live: "https://your-social-dashboard.com",
      image: "/images/project4.jpg",
      features: [
        "Multi-platform social media integration",
        "Post scheduling and automation",
        "Engagement analytics and reporting",
        "Content calendar management",
        "Team collaboration features",
        "Brand monitoring and mentions",
        "Custom reporting dashboards",
        "Mobile app companion"
      ]
    }*/
  ]
};

// API Routes
app.get('/api/profile', (req, res) => {
  res.json(portfolioData.profile);
});

app.get('/api/projects', (req, res) => {
  res.json(portfolioData.projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = portfolioData.projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // In a real application, you would send an email here
    // For demo purposes, we'll just log the message
    console.log('Contact form submission:', { name, email, message });
    
    // Simulate email sending (uncomment and configure for real use)
    /*
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${name}`,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    */

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Serve different pages based on routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/experience', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'experience.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve the main page for any other non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view your portfolio`);
}); 