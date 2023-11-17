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

MYSQL - Database
1. Start the apache and mysql serve on Xampp.
2. Create a database named rrr9569_studyboard.
3. Run the file name createScripts.sql and tables will be created.
4. Run the createData.sql and data will be populated in the tables.


PHP Backend (If you are using pure php apis. Note The frontend was updated after this phase so some apis may not work)

1. Place the backend folder in htdocs in xampp folder.
2. Update the config.php file with connection details.
3. Your apis should be working now.
4. Need to update the apiUrl on the frontend.

Laravel Backend (Latest Backend that is connected to the react frontend)
1. cd laravelBackend
2. composer install
3. create a .env file and copy paste contents from .env.example
4. Update the variables inside .env
5. Run php artisan serve
6. May need to run php artisan optimize when updating or adding an api.

Chat Nodejs

1. npm install
2. npm start
3. Update the serverURL in frontend/src/contexts/AuthContext.jsx to localhost.

That's it! You should now have the StudyBoard website up and running on your local machine.
