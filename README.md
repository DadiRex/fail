# 🚀 AI STEM Video Bot

An AI-powered STEM education platform with personalized learning experiences and high-quality video creation capabilities.

## ✨ Features

- **AI-Powered STEM Assistant** - Personalized responses using OpenAI GPT-5
- **Child Personalization** - Custom experiences based on name, age, and interests
- **AI Video Creator** - Generate STEM activity videos with scripts
- **Lumion Pro-Quality Graphics** - Professional video rendering with advanced effects
- **Personalized Learning Paths** - Age-appropriate content and recommendations
- **Interactive STEM Activities** - Daily curated activities for children
- **Open Source Learning Materials** - Curated resources by category

## 🏗️ Project Structure

```
ai-stem-video-bot/
├─ frontend/
│  └─ index.html          ← Main website with personalization features
├─ backend/
│  ├─ server/
│  │  ├─ package.json     ← Node.js dependencies and scripts
│  │  ├─ openai-client.js ← OpenAI API integration and vector store
│  │  └─ server.js        ← Express.js server with API endpoints
│  ├─ renderer/
│  │  ├─ requirements.txt ← Python dependencies for video processing
│  │  ├─ render.py        ← High-quality video rendering service
│  │  └─ start_python_service.py ← Python service starter
│  ├─ assets/
│  │  └─ mascots/
│  │     └─ fidget_fox/   ← Cute STEM mascot graphics
│  │        ├─ fidget_fox_wave.svg
│  │        ├─ fidget_fox_point.svg
│  │        └─ fidget_fox_goggles.svg
│  └─ start_services.bat  ← Windows service launcher
└─ public/                ← Generated content and uploads
   └─ uploads/            ← File upload directory
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (3.8 or higher)
- **npm** or **yarn**

### 1. Install Dependencies

#### Backend (Node.js)
```bash
cd backend/server
npm install
```

#### Video Renderer (Python)
```bash
cd backend/renderer
pip install -r requirements.txt
```

### 2. Start Services

#### Option A: Use the Batch Script (Windows)
```bash
cd backend
start_services.bat
```

#### Option B: Manual Start
```bash
# Terminal 1: Start Python video renderer
cd backend/renderer
python start_python_service.py

# Terminal 2: Start Node.js backend
cd backend/server
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Video Renderer**: http://localhost:5000

## 🔧 Configuration

### OpenAI API Key
The API key is configured in `backend/server/server.js`. Update the key in the `OpenAIClient` constructor:

```javascript
const openaiClient = new OpenAIClient('your-api-key-here');
```

### Environment Variables
Create a `.env` file in the `backend/server/` directory:

```env
OPENAI_API_KEY=your-api-key-here
PORT=3000
NODE_ENV=development
```

## 📡 API Endpoints

### Node.js Backend (Port 3000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve frontend |
| `/api/health` | GET | Health check |
| `/api/ask` | POST | AI STEM assistant |
| `/api/generate-script` | POST | Generate video scripts |
| `/api/render-video` | POST | Render videos (calls Python) |
| `/api/generate-preview` | POST | Generate previews (calls Python) |
| `/api/upload` | POST | File uploads |
| `/api/store-status` | GET | Vector store status |
| `/admin/index` | POST | Index content for search |

### Python Video Renderer (Port 5000)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Service health check |
| `/render-video` | POST | High-quality video rendering |
| `/generate-preview` | POST | Video preview generation |

## 🎬 Video Processing Capabilities

### Lumion Pro-Quality Features
- **60 FPS rendering** for smooth motion
- **Full HD (1920x1080)** output
- **Advanced visual effects** and transitions
- **Professional color grading**
- **Cinematic camera movements**
- **High-quality audio processing**

### Supported Formats
- **Input**: Text scripts, images, audio
- **Output**: MP4, AVI, MOV with H.264 encoding
- **Quality**: Up to 4K resolution support

## 👶 Child Personalization

### Features
- **Name-based greetings** throughout the interface
- **Age-appropriate content** filtering
- **Interest-based recommendations** (animals, space, nature, etc.)
- **Personalized AI responses** using child's profile
- **Custom activity suggestions** based on preferences
- **Profile management** with easy editing

### Profile Data
- Child's name and age
- Selected interests (8 categories)
- Learning preferences
- Activity history

## 🛠️ Development

### Adding New Features

1. **Frontend**: Edit `frontend/index.html`
2. **Backend API**: Add routes in `backend/server/server.js`
3. **Video Processing**: Extend `backend/renderer/render.py`
4. **AI Logic**: Modify `backend/server/openai-client.js`

### Testing

```bash
# Test Node.js backend
cd backend/server
npm test

# Test Python renderer
cd backend/renderer
python -m pytest tests/
```

## 📦 Dependencies

### Node.js Dependencies
- `express` - Web framework
- `openai` - OpenAI API client
- `cors` - Cross-origin resource sharing
- `multer` - File upload handling
- `node-fetch` - HTTP client

### Python Dependencies
- `flask` - Web framework
- `moviepy` - Video editing
- `opencv-python` - Computer vision
- `Pillow` - Image processing
- `numpy` - Numerical computing
- `cairosvg` - SVG rendering

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in server files
2. **Missing dependencies**: Run `npm install` and `pip install -r requirements.txt`
3. **API key errors**: Verify OpenAI API key configuration
4. **Video rendering fails**: Check Python service is running on port 5000

### Logs
- **Node.js**: Check terminal output for errors
- **Python**: Flask debug mode shows detailed logs
- **Frontend**: Browser console for JavaScript errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- OpenAI for GPT-5 integration
- MoviePy team for video processing
- STEM education community for inspiration

---

**Made with ❤️ for STEM education** 