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

    ```bash
    cd studyboard
    ```

---

## React Frontend

1. **Navigate to the react frontend directory.**

    ```bash
    cd frontend
    ```

2. **Install project dependencies using npm.**

    ```bash
    npm install
    ```

3. **Change laravel backend url in frontend\src\config.js to the route where your laravel backend will run.**

4. **You're now ready to start the development server.**

    ```bash
    npm start
    ```

6. **Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action.**

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

You will get a `dist` folder containing the optimized production build of your app.

2. **Deploy the contents of the `dist` folder to your web server or hosting service.**

You can use services like Netlify, Vercel, or traditional web hosting to deploy your application.

---

## MYSQL - Database

### Prerequisites

Before setting up the MySQL database for the StudyBoard app, ensure you have Xampp installed on your machine.

### Steps to Setup Database

1. **Start the Apache and MySQL servers in Xampp.**

2. **Create a Database:**

    - Open PhpMyAdmin (usually at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).
    - Create a new database named `rrr9569_studyboard`.

3. **Import SQL Scripts Manually:**

   - Open PhpMyAdmin (usually at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).

   - Create the `rrr9569_studyboard` database.

   - Choose the "SQL" tab.

   - Open the `createScripts.sql` file in a text editor.

   - Copy the contents of `createScripts.sql` and paste them into the SQL tab.

   - Execute the SQL query to create the necessary tables for the StudyBoard app.

   - Repeat the above steps for the `createData.sql` file to populate the tables with initial data.

By following these steps, you can manually import the SQL scripts into your MySQL database for the StudyBoard app.


### Additional Information

- The `createScripts.sql` file contains the SQL queries to create tables required for the StudyBoard app.

- The `createData.sql` file contains the SQL queries to populate the tables with initial data.

Now, the MySQL database for the StudyBoard app is set up and ready to be used.


---

### PHP Backend (Pure PHP APIs)

1. **Place Backend Folder:**
    - Copy the contents of the `backend` folder.
    - Paste it into the `htdocs` folder within your XAMPP installation directory.

2. **Install Dependencies:**
    - Open your terminal.
    - Change the directory to the Laravel Backend folder:
        ```bash
        composer install
        ```

3. **Configure Connection Details:**
    - Open the `config.php` file located in the `backend` folder using a text editor.
    - Update the file with your database connection details and email smtp details, such as hostname, username, password, and database name.

4. **Verify API Functionality:**
    - Ensure that your Apache and MySQL servers are running in XAMPP.
    - Open your web browser and navigate to the API endpoint to verify functionality.
    - You can run 'http://localhost/backend/api.php' as a test file.

5. **Update Frontend API URL:**
    - Locate the axios configuration in all pages in your frontend.
    - Update it with the appropriate URL to match your XAMPP setup.

By following these steps, you should have the PHP backend APIs up and running. Make sure to adjust the configuration based on your specific environment.

---

### Laravel Backend (Connected to React Frontend)

1. **Navigate to Laravel Backend:**
    - Open your terminal.
    - Change the directory to the Laravel Backend folder:
        ```bash
        cd laravelBackend
        ```

2. **Install Composer Dependencies:**
    - Run the following command to install the necessary dependencies:
        ```bash
        composer install
        ```

3. **Create and Configure .env File:**
    - Duplicate the `.env.example` file in the `laravelBackend` directory.
    - Rename the duplicated file to `.env`.
    - Open the `.env` file and update the variables with your database and other configuration details.

4. **Run Laravel Server:**
    - Start the Laravel development server with the following command:
        ```bash
        php artisan serve
        ```
    - This will launch the server at `http://localhost:8000` by default.

5. **Optional: Optimize Laravel (if needed):**
    - Run the following command to optimize Laravel (may be necessary when updating or adding APIs):
        ```bash
        php artisan optimize
        ```

By following these steps, you should have the Laravel backend connected to the React frontend up and running. Adjust configurations as needed for your environment.

---

## Chat Nodejs

1. **Navigate to Chat Nodejs:**
    ```bash
    cd chat
    ```

2. **Install Node.js Dependencies:**
    ```bash
    npm install
    ```

3. **Start the Chat Server:**
    ```bash
    npm start
    ```
    Ensure the server is running at `http://localhost:5000`.

4. **Update the AuthContext.jsx File:**
    - Open `frontend/src/contexts/AuthContext.jsx`.
    - Update the `serverURL` to `http://localhost:5000`.

---

## TextPredictionApi Nodejs

1. **Navigate to TextPredictionApi Nodejs:**
    ```bash
    cd TextPredictionApi
    ```

2. **Install Node.js Dependencies:**
    ```bash
    npm i
    ```

3. **Create .env File:**
    - Create a file named `.env` in the `TextPredictionApi` directory.
    - Paste the following content into the `.env` file:
        ```env
        OPENAI_KEY='YOUR_OPENAI_KEY'
        ```

4. **Start the Text Prediction API Server:**
    ```bash
    npm start
    ```
    Ensure the server is running at `http://localhost:6000`.

5. **Update the sendRecommendations.jsx File:**
    - Open `frontend/src/features/PC/sendRecommendations.jsx`.
    - Update the `TextPredictionUrl` to `http://localhost:6000`.

---

By following these steps, you should have the Chat Nodejs and TextPredictionApi Nodejs servers set up and configured for the StudyBoard app. Adjust configurations as needed for your environment.


That's it! You should now have the StudyBoard website up and running on your local machine.
