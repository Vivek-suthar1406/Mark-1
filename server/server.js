const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connect to MongoDB (Added mark1_database to the end of the URL)
const MONGO_URI = 'mongodb+srv://viki79225_db_user:YdgYGlNeM3jkK3qa@cluster0.sgwurf7.mongodb.net/mark1_database?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Database'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 2. Define the Database Blueprint (Schema)
const toolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }] 
});

const Tool = mongoose.model('Tool', toolSchema);

// 3. The GET Route: Fetch from Database
app.get('/api/tools', async (req, res) => {
  try {
    const toolsArray = await Tool.find(); 
    
    const toolsObject = {};
    toolsArray.forEach(tool => {
      toolsObject[tool.name] = tool;
    });

    res.json(toolsObject);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ... (your existing app.get route) ...

// 🛠️ The CREATE Route: Add a new tool
app.post('/api/tools', async (req, res) => {
    try {
      const newTool = new Tool({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        features: req.body.features
      });
  
      // Save it to MongoDB
      const savedTool = await newTool.save();
      res.status(201).json(savedTool);
    } catch (error) {
      res.status(400).json({ message: "Error saving tool. Make sure the name is unique!", error });
    }
  });
  
  // 🗑️ The DELETE Route: Remove a tool by its name
  app.delete('/api/tools/:name', async (req, res) => {
    try {
      const deletedTool = await Tool.findOneAndDelete({ name: req.params.name });
      
      if (!deletedTool) {
        return res.status(404).json({ message: "Tool not found" });
      }
      
      res.json({ message: "Tool successfully deleted!" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });
  
  // ... (your existing /api/seed route) ...
// 4. The Seed Route
app.post('/api/seed', async (req, res) => {
  const initialData = [
    {
      name: 'Google Chat-box',
      title: 'Google Chat-box',
      description: 'Google Chat is a secure, intelligent communication platform designed for teams and individuals, offering direct messages and "Spaces" for group collaboration. It integrates seamlessly with Google Workspace.',
      features: ['Direct Messages & Spaces: Communicate with individuals or create "Spaces" for projects.', 'Google Workspace Integration: Instantly share Google Drive files and Meet links.', 'Rich Messaging: Send emojis, GIFs, and format text using Markdown.']
    },
    {
      name: 'W3School',
      title: 'W3School',
      description: 'W3Schools is a leading global educational platform offering free tutorials, exercises, and references for web development and programming.',
      features: ['Web Design: Tutorials on HTML, CSS, and responsive design.', 'Programming Languages: Comprehensive guides for JavaScript, Python, Java, etc.', 'Try it Yourself Editor: Interactive online code editor.']
    },
    {
      name: 'Dribbble',
      title: 'Dribbble',
      description: 'Dribbble is a premier digital design showcase and social networking platform for designers to share work, find inspiration, and discover employment opportunities.',
      features: ['Inspiration & Trends: Known for identifying trends such as Neomorphism.', 'Design Categories: Web Design, Mobile, Product Design, Branding, etc.', 'For Designers: Post work, create portfolios, and reach clients.']
    },
    {
      name: 'Gemini',
      title: 'Gemini',
      description: 'Gemini is a family of multimodal generative AI models developed by Google. It is designed to understand, operate across, and combine different types of information.',
      features: ['Multimodality: Process and generate content in text, image, audio, and video.', 'Long Context Window: Handle up to 2 million tokens.', 'Workspace Integration: Connects to Gmail, Docs, Drive, and Maps.']
    },
    {
      name: 'ChatGPT',
      title: 'ChatGPT',
      description: 'ChatGPT is an advanced AI chatbot developed by OpenAI, designed to interact in a conversational way, answer questions, and assist with creative tasks.',
      features: ['Conversational AI: Remembers previous comments for follow-up questions.', 'Multimodal: Generate text, analyze uploaded images, and voice conversations.', 'Custom GPTs: Create customized versions for specific tasks.']
    }
  ];

  // ---> THIS WAS THE MISSING BLOCK <---
  try {
    // Wipe the existing database collection clean
    await Tool.deleteMany({}); 
    
    // Insert the fresh data
    await Tool.insertMany(initialData);
    
    res.json({ message: "Database wiped and successfully seeded with all 5 tools!" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding database", error });
  }
});

// 5. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running live on http://localhost:${PORT}`);
});