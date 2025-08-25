# 🧪 STEM Helper - AI-Powered Animation Pipeline

A comprehensive backend for creating STEM educational content through AI-generated characters, stories, and animation planning.

## 🚀 Features

- **Character Generation**: AI-created STEM education characters
- **Story Scripts**: Educational adventures with learning objectives
- **Animation Planning**: Production pipeline guidance
- **TTS Integration**: Voiceover planning and recommendations
- **Export Planning**: Video publishing and SEO optimization
- **Complete Pipeline**: End-to-end workflow automation

## 🛠️ API Endpoints

### 1. Character Generation
**POST** `/api/character`
```json
{
  "prompt": "Make me a curious fox scientist that teaches chemistry",
  "child_age": "8-12"
}
```

**Response:**
```json
{
  "success": true,
  "character": {
    "name": "Dr. Foxy",
    "species": "Red Fox",
    "personality": "Curious, enthusiastic, patient",
    "appearance": "Wearing a lab coat and safety goggles",
    "backstory": "Former forest researcher turned chemistry teacher",
    "teaching_style": "Hands-on experiments with clear explanations",
    "catchphrase": "Let's make some chemical magic!",
    "age_appropriateness": "Perfect for 8-12 year olds who love animals and science"
  }
}
```

### 2. Story Script Generation
**POST** `/api/story`
```json
{
  "characters": ["Dr. Foxy"],
  "topic": "volcanoes",
  "child_age": "8-12",
  "duration": "5-10 minutes"
}
```

**Response:**
```json
{
  "success": true,
  "story": {
    "title": "Dr. Foxy's Volcanic Adventure",
    "characters": ["Dr. Foxy"],
    "setting": "Dr. Foxy's backyard laboratory",
    "plot_summary": "Dr. Foxy creates a safe volcano experiment to teach kids about chemical reactions and geology.",
    "scenes": [
      {
        "scene_number": 1,
        "location": "Backyard lab",
        "characters_present": ["Dr. Foxy"],
        "action": "Dr. Foxy introduces the volcano experiment",
        "stem_concept": "Chemical reactions between baking soda and vinegar",
        "dialogue": "Dr. Foxy: 'Today we're going to make a volcano erupt!'",
        "visual_description": "Dr. Foxy standing next to a model volcano made of clay"
      }
    ],
    "learning_objectives": ["Understand chemical reactions", "Learn about volcanoes"],
    "safety_notes": "Adult supervision required for experiments",
    "age_appropriateness": "Engaging for 8-12 year olds with clear explanations"
  }
}
```

### 3. Animation Pipeline Planning
**POST** `/api/animation-plan`
```json
{
  "story": { /* story object */ },
  "animation_style": "2D"
}
```

### 4. TTS Generation Planning
**POST** `/api/tts`
```json
{
  "text": "Today we're going to make a volcano erupt!",
  "voice_style": "friendly",
  "child_age": "8-12"
}
```

### 5. Export Planning
**POST** `/api/export-plan`
```json
{
  "story": { /* story object */ },
  "animation_style": "2D",
  "target_platform": "YouTube"
}
```

### 6. Complete Pipeline Workflow
**POST** `/api/pipeline`
```json
{
  "character_prompt": "Make me a curious fox scientist that teaches chemistry",
  "topic": "volcanoes",
  "child_age": "8-12",
  "animation_style": "2D",
  "target_platform": "YouTube"
}
```

## 🎬 Animation Pipeline Options

### Text-to-Animation AI
- **Pika Labs**: Early but growing text-to-video
- **Runway Gen-2**: Professional video generation
- **Stable Video Diffusion**: Open-source option

### Text-to-Image + Lip-sync
- **Character Generation**: Stable Diffusion / DALL-E
- **Animation**: D-ID, HeyGen, open-source lip-sync tools

### 2D/3D Pipeline
- **Software**: Blender, Unity, Godot
- **Workflow**: Character sheets → Animation → Voiceover sync

## 🎙️ TTS Integration

### Recommended Services
- **ElevenLabs**: Realistic, customizable voices
- **Azure TTS**: Microsoft's professional solution
- **Google TTS**: Good quality, cost-effective

### Audio Specifications
- **Format**: MP3
- **Sample Rate**: 22050 Hz
- **Bitrate**: 64 kbps
- **Duration**: ~150 characters per second

## 📹 Video Export & Publishing

### YouTube Optimization
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 24-30 FPS
- **Format**: MP4 with H.264 codec
- **Bitrate**: 8-12 Mbps for 1080p

### SEO Recommendations
- **Titles**: Include STEM topic + age group
- **Description**: Learning objectives + safety notes
- **Tags**: STEM, education, age-appropriate, topic-specific
- **Thumbnails**: Character + experiment visuals

## 🔧 Technical Requirements

### Dependencies
```json
{
  "compression": "^1.7.4",
  "cors": "^2.8.5", 
  "express": "^4.19.2",
  "helmet": "^7.1.0",
  "openai": "^4.56.0"
}
```

### Environment Variables
```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini  # Optional, defaults to gpt-4o-mini
PORT=3000                  # Optional, defaults to 3000
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set API Key**
   ```bash
   $env:OPENAI_API_KEY = "your_key_here"
   ```

3. **Start Server**
   ```bash
   npm run dev
   ```

4. **Test Endpoints**
   ```bash
   # Health check
   Invoke-RestMethod http://localhost:3000/healthz
   
   # Create character
   Invoke-RestMethod -Uri "http://localhost:3000/api/character" -Method POST -ContentType "application/json" -Body '{"prompt":"Make me a curious fox scientist that teaches chemistry"}'
   ```

## 🔄 Complete Workflow Example

1. **Generate Character**: Create Dr. Foxy the chemistry fox
2. **Create Story**: Generate volcano experiment narrative
3. **Plan Animation**: Determine tools and timeline
4. **Generate TTS**: Plan voiceover and audio
5. **Export Plan**: Configure video settings for YouTube
6. **Production**: Use recommended tools to create content
7. **Publish**: Follow SEO and platform guidelines

## 🎯 Next Steps

- **Character Visuals**: Integrate with Stable Diffusion/DALL-E
- **TTS Generation**: Connect to ElevenLabs or Azure
- **Animation Tools**: Build Blender/Unity integration
- **Video Processing**: Add FFmpeg for video manipulation
- **Frontend Interface**: Create user-friendly web UI

## 📚 Resources

- **OpenAI API**: [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **ElevenLabs**: [https://elevenlabs.io/](https://elevenlabs.io/)
- **Blender**: [https://www.blender.org/](https://www.blender.org/)
- **Unity**: [https://unity.com/](https://unity.com/)
- **Stable Diffusion**: [https://github.com/CompVis/stable-diffusion](https://github.com/CompVis/stable-diffusion)

---

**Built with ❤️ for STEM Education** 