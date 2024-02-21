<h1 align="center" id="title">VitaFile</h1>

<p align="center"><img src="https://socialify.git.ci/Team-Cornflakes/VitaFile/image?description=1&amp;font=KoHo&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;stargazers=1&amp;theme=Dark" alt="project-image"></p>

<p id="description">VitaFile leverages Google's advanced APIs to revolutionize health record management by centralizing and simplifying access to family EHRs enhancing security and promoting interactive user engagement through innovative technology for a seamless health management experience.</p>

<p align="center"><img src="https://img.shields.io/badge/Build-Vitafile-red?logo=npm" alt="shields"></p>
<br>
<h2>Project Screenshots:</h2>
<br>
<p align="center">
  <img src="./frontend/src/assets/Login_page.png"><br>
  <p> Login using the credintials used during  Signup or Sign-In using Google Auth which provides a <b>Fast and Seamless Login</b></p><br>
  <img src="./frontend/src/assets/Family.png"><br>
  <p> You can add your family members on you Family Page and manage all their health Records from a <b>Single Dashboard</b></p><br>
  <img src="./frontend/src/assets/Timeline.png"><br>
  <p> View all the records of your loved ones in a timeline format with an upload card to easily upload new reports <b>without any hassle</b></p><br>
  <img src ="./frontend/src/assets/EHR_search.png"><br>
  <p> With our <b>integrated Search Feature</b> you can Search across all your reports using key words and <b>get the EHRs in an instant</b> which will help you save time and find the Document whenever you need it.</p><br>
  <img src="./frontend/src/assets/EHR_translate.png"><br>
  <p> Google Translate in the Top 5 languages of the world. Chatbot Feature Equiped with Text to Speech and Speech to Text to help those with<b> disabilities</b>. Summarizer and the Actual Report. All together to provide a <b>ONE STOP SOLUTION</b> for all.<br>
</p>

<h2>🧐 Features</h2>

*   **Firebase & Google Auth:** Secures and streamlines user data and authentication ensuring real-time data synchronization and robust security measures for user access.
*   **Google Gemini API:** Integrates advanced health data analytics providing insights and organizing medical records efficiently.
*   **Text-to-Speech & Speech-to-Text APIs:** Enhances accessibility allowing users to interact with the system using voice commands and receive audible content making the platform more accessible to users with different needs.
*  **pyTesseract:** Integrates pyTesseract for OCR, enhancing document digitization by converting scans to editable text, streamlining health record management within our comprehensive EHR system.
*  **Google Translate:** Offers multilingual support breaking down language barriers in understanding health documents.
*  **Google Palm:** Utilizes gesture recognition for intuitive navigation and interaction offering a futuristic approach to health record management.
<br>
<h2>🛠️ Installation Steps:</h2>
<br>
<p> 1. Prerequisites- <b>Node.js >=18.19.0</b> </p>

<p>2. Git Clone</p>

```
git clone https://github.com/Team-Cornflakes/VitaFile.git
```
<br>
<p> 3. Start the Frontend </p>

```
cd frontend
npm install
npm run dev
```
<br>

  <p> 4. Setup the Server </p>

```
cd ../backend
pip install -r requirements.txt
python manage.py runserver
```
<br>
  
<p> 5. You are Good to Go! </p>
<br>
<h2>💻 Built with</h2>
<br>

Technologies used in the project:

*   Django
*   React
*   Gemini API
*   Google Translate
*   PaLM API