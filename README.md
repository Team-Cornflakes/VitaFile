<h1 align="center" id="title">VitaFile</h1>

<p align="center"><img src="https://socialify.git.ci/Team-Cornflakes/VitaFile/image?description=1&amp;font=KoHo&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Solid&amp;stargazers=1&amp;theme=Dark" alt="project-image"></p>

<p id="description">VitaFile leverages Google's advanced APIs to revolutionize health record management by <b>centralizing and simplifying access to family EHRs</b>, <b>enhancing security</b>, and <b>promoting interactive user engagement</b> through innovative technology, for a seamless health management experience.</p>
<p>In the critical but often overlooked phase after exiting the hospital, <b>VitaFile plays a pivotal role</b>. It ensures that patients and their families continue to have streamlined access to their health records, enabling continuous care and health monitoring. This <b>bridges the gap between hospital care and home recovery</b>, making VitaFile an essential tool for post-discharge health management.</p>
<p align="center"><i>"Bridging the Gap in Post-Discharge Health Management"</i></p>

<p align="center"><img src="https://img.shields.io/badge/Build-Vitafile-red?logo=npm" alt="shields"></p>
<br>
<h2>Project: </h2>
<br>
<p align="center">
  <img src="./frontend/src/assets/Login_page.png"><br>
  <p> Login with the credentials used during sign-up. Or sign-in using Google Auth, for <b>fast and seamless</b> login.</p><br>
  <img src="./frontend/src/assets/Family.png"><br>
  <p> You can add family members  on your Family Page, and manage their health records from a <b>single dashboard.</b></p><br>
  <img src="./frontend/src/assets/Timeline.png"><br>
  <p> View your loved ones' records in a <b>timeline</b> format, and easily upload new reports with the upload card.</p><br>
  <img src ="./frontend/src/assets/EHR_search.png"><br>
  <p> Search across all your reports using key words and recieve the EHRs using our <b>Integrated Search Feature</b>, to save time and find the document in an instant.</p><br>
  <img src="./frontend/src/assets/EHR_translate.png"><br>
  <p> Google Translate to the top <b>5 languages of the world</b>. The Chatbot feature equipped  with text-to-speech and speech-to-text for those with special needs. Summarizer and the actual report, to provide a one stop solution for all.<br>
</p>

<h2>🧐 Features</h2>

 * 🔐 **Firebase & Google Auth:** Secures user data and authentication, ensuring real-time synchronization and robust security.
*  🧠 **Google Gemini API:** Provides advanced health analytics, organizing medical records efficiently.
*  🗣️ **Text-to-Speech & Speech-to-Text APIs:** Improves accessibility with voice interactions and audible content.
* 📝 **pyTesseract for OCR:** Converts scans to editable text, streamlining health record digitization.
* 🌍 **Google Translate:** Breaks language barriers, offering multilingual support for health documents.
* 🖐️ **Google Palm:** Enhances user experience with gesture recognition for intuitive navigation.
<br>

<img src="./frontend/src/assets/googletech.png">

<h2> 🏗️ Solution Architecture </h2>

<img src="./frontend/src/assets/architecture.png"><br>

* 🔄 **End-to-End Data Processing:** From Tesseract OCR digitizing written records to Gemini Vision structuring text, and Google's APIs providing multilingual translation and voice interaction, our architecture creates a seamless flow of accessible, interactive health data.

<img src="./frontend/src/assets/db.png"><br>

* 📊 **Data Schema & Security:** The ehr and family tables are encrypted and linked to users, ensuring data integrity and security.

<img src="./frontend/src/assets/JWT.png"><br>

* **🌐 JWT Authentication Flow** The server and browser interaction using JWTs for login processes guarantees secure sessions.

<h2>🔜 What's Next?</h2>

*  **🩺 Google Healthcare API Integration:** To enhance data management, we're moving to store health records in the **FHIR format**, making data more accessible and interoperable.

-  **📊 BigQuery Analysis:** Leveraging Google Analytics for deeper insights, we'll introduce interactive graphs and models. This aims to give users a clearer understanding of their health through **advanced analytics**.


<h2> 🛣️ The Road Ahead </h2>

- 🚀 **Porting to Flutter**: Transition to Flutter for seamless cross-platform use, improving accessibility.
- 📄 **Multi-page Reports**: Introduce detailed multi-page reports for in-depth health insights.
- 🔔 **Notification Feature**: A smart alert system for frequent disease mentions, prompting medical consultation.

<h2>🛠️ Installation Steps:</h2>

<p> 1. Prerequisites- 

```
1. Node.js >=18.19.0
2. Gemini API key
3. Text to Speech and Speech to Text APIs
4. PaLM API

```
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

*   **Django**
*   **React**
*   **Gemini API**
*   **Google Translate**
*   **PaLM API**