Login & Registration System
This project implements a basic Login and Registration system using Node.js, Express, MongoDB, and Bcrypt for hashing passwords. Users can register with a unique username and password, and log in using the same credentials to access a personalized message.

 It includes:

A registration form for users to create an account.
A login form for existing users to log in with their credentials.
Backend logic to handle user registration and authentication using MongoDB and Bcrypt.
Tech Stack
Node.js: Server-side JavaScript runtime environment.
Express.js: Web framework for Node.js to handle HTTP requests and routes.
MongoDB: NoSQL database to store user data.
Bcrypt: A library to hash passwords securely.
HTML, CSS, JavaScript: Frontend code to create forms and send data to the backend.
Project Setup
To set up the project on your local machine, follow these steps:

Install Node.js:

Make sure you have Node.js and npm installed on your system.
Download and install it from Node.js official website.
Install Dependencies:

After installing Node.js, run the following command in your terminal to install the necessary dependencies:
bash
Copy
Edit
npm install express mongoose bcrypt body-parser cors
MongoDB Setup:

You will need a MongoDB account. If you don’t have one, you can sign up at MongoDB Atlas.
Create a cluster and replace the connection URI in the app.js file in this project with your MongoDB URI.
Usage
Run the Application
To run the application:

In your terminal, navigate to the project directory.
Start the server by running:
bash
Copy
Edit
node app.js
Open your browser and go to http://localhost:5000 to access the Login and Registration page.
Registration:
Enter a unique username and password in the registration form.
Upon successful registration, the data will be saved in the MongoDB database.
Login:
Enter the registered username and password in the login form.
If the credentials are correct, the user will receive a success message.
Code Structure
Here is the breakdown of the project structure:

perl
Copy
Edit
login-system/
├── public/
│   ├── app.js            # Frontend JavaScript for handling form submissions.
│   └── index.html        # HTML file with registration and login forms.
├── app.js                # Backend server logic (Node.js/Express).
├── package.json          # Contains project dependencies and scripts.
└── README.md             # This documentation.
Frontend:
index.html: Contains the HTML structure of the registration and login forms.
app.js (Frontend): Handles form submission, sends data to the backend, and displays results.
Backend:
app.js (Backend): Handles the server setup, MongoDB connection, user registration, and login routes.
MongoDB:
User data (username and hashed password) is stored in the MongoDB database.
Additional Configuration
MongoDB URI
In the app.js file, update the uri variable with your MongoDB URI (found in your MongoDB Atlas cluster setup). The format of the URI should look like:

javascript
Copy
Edit
const uri = "mongodb+srv://<username>:<password>@cluster0.gbuk2.mongodb.net/<your-database>?retryWrites=true&w=majority";
Make sure to replace <username>, <password>, and <your-database> with your actual MongoDB credentials.

Conclusion
This project demonstrates a simple login and registration system built with Node.js and MongoDB. It covers user authentication, data storage, and password hashing with Bcrypt.

You can extend the functionality by adding more features, such as:

User profile management.
Email verification.
Session management.
Feel free to customize and expand the application as per your requirements.

End of README.md

autor:Amina Tuzelova
