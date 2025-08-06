🚀 PromptCraft AI
Transform simple ideas into production-ready system architectures and professional-grade AI prompts.

PromptCraft AI is a full-stack application that leverages the power of Large Language Models (LLMs) to bridge the gap between a high-level concept and a tangible technical plan. Users can input a simple idea, and the application will generate an enhanced, detailed prompt along with a complete, visualized system architecture diagram.

✨ Features
Smart Prompt Enhancement: Converts vague user ideas into detailed, professional prompts suitable for AI systems.

Intelligent Architecture Generation: Automatically generates logical system architecture diagrams based on the enhanced prompt.

Interactive Diagram Visualization: Renders system diagrams in real-time using Mermaid.js.

Modern, Responsive UI: A clean and intuitive interface built with Next.js and Tailwind CSS.

Microservices Architecture: A scalable and maintainable backend built with Node.js and Python, separating concerns for optimal performance.

🛠️ Tech Stack
This project uses a modern, decoupled architecture.

Service

Technology

Purpose

Frontend

Next.js / React with TypeScript

User Interface & Experience



Tailwind CSS

Styling and Design System



React Query

Data Fetching & State Management



Framer Motion

UI Animations



Mermaid.js

Diagram Rendering

API Gateway

Node.js / Express.js

Handles user requests, acts as a secure proxy

AI Service

Python / FastAPI

Core AI logic, interacts with external APIs

AI Model

Google Gemini API

Language Model for generation tasks

🚀 Getting Started
Follow these instructions to get the project running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18 or later)

pnpm (npm install -g pnpm)

Python (v3.8 or later)

A Google Gemini API Key from Google AI Studio.

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/promptcraft-ai.git
cd promptcraft-ai

Install all dependencies:
This command uses pnpm workspaces to install dependencies for all services (web, api-gateway, ai-service) at once.

pnpm install

Set up Environment Variables:
You will need to create .env files for the backend services.

AI Service (apps/ai-service/.env):

GOOGLE_API_KEY="your-google-api-key-here"

API Gateway (apps/api-gateway/.env):

PORT=3001
AI_SERVICE_URL=http://localhost:8000

Install Python Dependencies:
Navigate to the AI service directory and install its required packages.

cd apps/ai-service
pip install -r requirements.txt
cd ../..

Running the Application
You will need to run each service in a separate terminal from the root of the project folder.

Terminal 1: Run the AI Service

cd apps/ai-service
uvicorn main:app --reload

Terminal 2: Run the API Gateway

cd apps/api-gateway
pnpm dev

Terminal 3: Run the Frontend

cd apps/web
pnpm dev

Once all services are running, open your browser and navigate to http://localhost:3000.

🏛️ Architectural Overview
PromptCraft AI is built on a microservices architecture to ensure a clean separation of concerns and scalability.

Frontend (Next.js): The user interacts with the React application. When a prompt is submitted, it makes an API call to the API Gateway.

API Gateway (Node.js): This service acts as a secure proxy. It receives the request from the frontend and forwards it to the appropriate internal service, in this case, the AI Service.

AI Service (Python): This is the core engine. It receives the request from the Gateway, constructs a detailed prompt for the LLM, and makes a call to the external Google Gemini API.

Data Flow: The response from Gemini flows back through the AI Service and the API Gateway to the frontend, where React Query manages the state and renders the results.

This decoupled design allows us to use the best technology for each task—Node.js for efficient I/O and Python for its powerful AI ecosystem.
