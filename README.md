# StudyBoard React App README

Welcome to the StudyBoard website! This README will guide you through the basic setup process after cloning or unzipping the project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- npm (Node Package Manager) installed with Node.js.

## Getting Started

1. **Clone or unzip the project to your local machine.**

git clone https://github.com/ruvin27/studyboard.git


2. **Navigate to the project directory.**

cd studyboard
cd frontend


3. **Install project dependencies using npm.**

npm install


4. **You're now ready to start the development server.**

npm start


5. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action.**

## Project Structure

The project structure is organized as follows:

- **src/:** Contains the source code of the React app.
- **src/features/:** Reusable React components.
- **src/assets/:** Static assets containing CSS, JS, and images for the application.
- **src/App.js:** Top-level components representing different pages/routes.
- **src/hooks:** Data Management for the frontend
- **src/lib:** Api Client for calling api
- **public/:** Static assets and the `index.html` file.

## Deployment

To deploy the app to a production environment, follow these steps:

1. **Build the app using `npm run build`.**

You will get a `build` folder containing the optimized production build of your app.

2. **Deploy the contents of the `build` folder to your web server or hosting service.**

You can use services like Netlify, Vercel, or traditional web hosting to deploy your application.

---
**Backend

Place the backend folder in htdocs in xampp folder.

SQL

1. Create a database named rrr9569_studyboard.
2. Run the file name createScripts.sql and tables will be created.
3. Run the createData.sql and data will be populated in the tables.


That's it! You should now have the StudyBoard website up and running on your local machine.
