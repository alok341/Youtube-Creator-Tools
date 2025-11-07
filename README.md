# 🎬 YouTube Creator Tools  

A simple full-stack project that uses **React (TypeScript)** and **Spring Boot** to interact with the **YouTube Data API v3**.  
It allows users to analyze any YouTube video, extract thumbnails, and generate useful tags — all without any login or database.  

---

## 🚀 Features  

- 🎥 **Video Data Analyzer** – Get video title, views, duration, channel name, and publish date.  
- 🖼️ **Thumbnail Extractor** – Extract HD thumbnail directly from YouTube video links.  
- 🏷️ **Tag Generator** – Generate related tags from video metadata (title & description).  
- ⚡ **No Database / No Authentication** – Simple and lightweight setup.  

---

## 🧰 Tech Stack  

**Frontend:** React + TypeScript + Axios  
**Backend:** Spring Boot + Java  
**API:** YouTube Data API v3  

---

## ⚙️ Setup Instructions  

### 🖥️ Backend (Spring Boot)
1. Go to the `backend` folder  
2. Open `application.properties` and add your YouTube API key:
   ```properties
   server.port=8080
   youtube.api.key=YOUR_YOUTUBE_API_KEY
Run:

bash
Copy code
mvn spring-boot:run
💻 Frontend (React + TypeScript)
Go to the frontend folder

Update the API base URL in your axios config if needed:

ts
Copy code
const API_BASE_URL = "http://localhost:8080/api";
Run:

bash
Copy code
npm install
npm run dev
🧩 API Endpoints
Endpoint	Method	Description
/api/youtube/analyze	POST	Analyze video details using YouTube URL
/api/thumbnail/extract-id	POST	Extract video ID and thumbnail
/api/youtube/generate-tags	POST	Generate relevant tags

🖼️ Example Output
Request:
json
Copy code
{
  "videoUrl": "https://youtu.be/DM748yduRRw"
}
Response:
json
Copy code
{
  "title": "Java Full Stack Project with React and Spring Boot",
  "channelTitle": "Alok Kumar Dubey",
  "views": "12450",
  "duration": "8:32",
  "thumbnailUrl": "https://i.ytimg.com/vi/DM748yduRRw/maxresdefault.jpg",
  "tags": ["java", "react", "spring boot", "full stack"]
}
📂 Folder Structure
css
Copy code
youtube-creator-tools/
 ┣ 📂 backend/
 ┃ ┣ 📂 controller/
 ┃ ┣ 📂 service/
 ┃ ┗ 📜 YouTubeCreatorToolsApplication.java
 ┣ 📂 frontend/
 ┃ ┣ 📂 src/
 ┃ ┣ 📂 components/
 ┃ ┗ 📜 App.tsx
 ┗ 📜 README.md
👨‍💻 Developer
Alok Kumar Dubey
🎓 IT Student, Datta Meghe College of Engineering
💻 Java | Spring Boot | React | TypeScript
🔗 LinkedIn
💾 GitHub

⭐ If you like this project, don’t forget to star the repository! ⭐


---

Would you like me to add **small emoji-based section headers (like ⚙️ Setup, 💡 Features, etc.)** with a 
