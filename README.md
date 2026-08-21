# FitCheck
 
**AI-powered resume intelligence platform — analyze, match, and prep for your target job.**
 
FitCheck houses two integrated tools under a shared dashboard: **Rezer**, which scores how well your resume matches a job description, and **TarobPrep**, which turns that gap analysis into a structured interview prep plan.
 
> Rezer is a mirror — it shows you where you stand. TarobPrep is a coach — it tells you what to do about it.
 
---
 
## Features
 
### Rezer (REsume + analyZER)
- Upload a resume and paste a job description to get an instant match score
- Identifies matched and missing keywords/skills
- Returns prioritized, actionable fix suggestions — not just generic feedback
- Tracks resume analysis history over time
### TarobPrep (TARget jOB Prep)
- Generates a skill-gap analysis based on your resume and target role
- Produces technical interview questions grounded in your actual skill gaps (tagged by topic and difficulty)
- Produces behavioral interview questions anchored to your seniority level and resume content
- Builds a week-by-week prep plan (1, 2, 4, 6, or 8 weeks), scaled in depth and question volume to the timeframe
- Read-only prep timeline with a summary view
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React.js, tailwind CSS | 
| Backend | Node.js / Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT, Bcrypt |
| File Storage | Cloudinary (resume PDFs) |
| LLM | Google Gemini, with Zod-validated structured JSON output |
 
---
 
## Architecture Highlights
 
- **Structured LLM output**: Gemini responses are validated against Zod schemas before being persisted, with explicit anti-hallucination and anti-prompt-injection constraints baked into the prompt design.
- **Shared auth & dashboard**: A single JWT-authenticated session powers both Rezer and TarobPrep, so users move between tools without re-authenticating.
- **Indexed analysis storage**: MongoDB schemas use compound indexing for efficient retrieval of a user's analysis history.
- **Secure file handling**: Resume PDFs are stored and deleted via Cloudinary with authenticated upload/delete flows.
- **Duration-aware prep generation**: TarobPrep's prompt varies tone, density, and question count based on the selected prep duration — a 1-week plan reads like a crash course, an 8-week plan like a deep dive.
---
 
## Getting Started
 
### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Gemini API key
- Cloudinary account (API key, secret, cloud name)
### Installation
 
```bash
git clone https://github.com/<your-username>/fitcheck.git
cd fitcheck
 
# Install backend dependencies
cd server
npm install
 
# Install frontend dependencies
cd ../client
npm install
```
 
### Environment Variables
 
Create a `.env` file in `/server` with:
 
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
 
### Running Locally
 
```bash
# From /server
npm run dev
 
# From /client
npm start
```
 
The app will be available at `http://localhost:3000`, with the API running on `http://localhost:5000`.
 
---
 
## Project Status
 
- **Rezer**: Core functionality complete — LLM scoring, keyword matching, priority fixes, and analysis storage are live.
- **TarobPrep**: Complete — skill-gap analysis, technical/behavioral question generation, and week-by-week prep plan generation are live.
---
 
## Roadmap

- [ ] Add completion tracking to prep plan tasks (v2)
- [ ] Expand analysis dashboard with trend visualization
---
 
## Author
 
Built by Yartik.
 
## License
 
This project is licensed under the MIT License.
 
