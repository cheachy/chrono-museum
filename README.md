# Chrono-Museum: VR Time Travel Experience

### Project Overview
Chrono-Museum is an immersive Virtual Reality application built for the web. It allows users to travel through five distinct eras of human history—from Prehistory to the Contemporary Age—to explore the evolution of technology and tools.

**Live Demo:** https://github.com/cheachy/chrono-museum.git

### Technology Stack
* **Framework:** A-Frame (WebVR)
* **Environment:** A-Frame Environment Component
* **Languages:** HTML5, CSS, Node Javascript (ES6)
* **Database:** MongoDB Atlas
* **Platform:** Web Browser (Desktop & Mobile VR compatible)

### Controls
* **Desktop:** WASD to move, Mouse to look, Click to interact.
* **Menu:** Press 'M' to open the Chrono-Visor.
* **Interaction:** Click on artifacts to read historical data.

### Team Roles & Responsibilities
* **Charmie Rafols:** Lead Developer - Implemented A-Frame logic, warp system, and DOM manipulation.
* **Psamm Gabriel Jonio:** 3D Artist - Sourced GLB assets and designed the layout.
* **Jounes Quezzagan:** Researcher - Curated historical data for the artifacts.

### .env File
* MONGO_URI=mongodb+srv://admin:skibiditoilet67@cluster0.jbnqv5d.mongodb.net/?appName=Cluster0
* PORT=3000

### Installation (Local)
1. Clone the repository.
2. Ensure to have .env file and copy the API keys.
3. Install the modules by running npm install.
4. Now you can run node src/server.js.

### Update Database (to your own liking)
1. Edit the erasData.js file.
2. Make sure the MongoDB_URI in the .env file is correct.
3. Run node scripts/seed.js