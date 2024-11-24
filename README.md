# Facebook Clone 
<img width="916" alt="‏‏Feed" src="https://github.com/user-attachments/assets/df6134ee-8e84-4a26-99f9-36c00f3d00c3">

## Links:
server:
https://github.com/edenbdv/Facebook_clone-Server.git

client web:
https://github.com/edenbdv/Facebook_clone-Client.git

Bloom-Filter server:
https://github.com/edenbdv/BloomFilter.git

client android:
https://github.com/edenbdv/Facebook-clone-android.git

## Overview:
"Foobar" is a social networking application similar to Facebook, designed to connect people and support sharing of updates and photos.
This repository is for the server, designed to mimic the functionalities of Facebook. It provides support for both Android and web clients, allowing developers to simulate interactions with the Facebook API without accessing the actual Facebook servers. The server is structured following the MVC (Model-View-Controller) architecture.

## Technologies Used (whole project)

**Backend:** The backend of Foobar is designed to handle server-side logic and routing efficiently. Key features include:
- **Node.js:** Utilizes a non-blocking, event-driven architecture for efficient handling of multiple connections.
- **Express.js:** Simplifies server creation and routing, providing a robust set of features for web applications.
- **MongoDB:** A NoSQL database used for storing user data and posts, offering flexibility and scalability.
- **jsonwebtoken:** Implements JSON Web Tokens for secure user authentication and authorization, ensuring safe access to protected resources.
- **WebSockets:** Enables real-time communication between clients (the web server) and the server (the bloom-filter/TCP server), facilitating instant updates.
- **Multithreading:** Supports concurrent processing, allowing the server (the bloom-filter/TCP server) to handle multiple requests simultaneously for improved performance.
- **TCP:** Utilizes Transmission Control Protocol for reliable and ordered data transmission.
- **RESTful API:** Implements REST principles for structured and efficient communication between the frontend and backend.
  
**Frontend:** The frontend of Foobar is built with **JavaScript, React, HTML, and CSS**. Key features include:
- **JavaScript:** Provides dynamic functionality and interactivity.
- **React:** Used for building reusable components and managing state efficiently.
- **HTML & CSS:** Structures and styles the user interface, ensuring a responsive design.

## Deployment

### AWS EC2
- The application is deployed on an Amazon Linux EC2 instance, providing a reliable and scalable cloud infrastructure.
- Security groups are configured to allow access to required services:
  - Frontend on port `3000`
  - Backend on port `12346`
  - Database on port `27017`
  - BloomFilter service on port `5555`
- Ensures high availability with the potential to add more instances or services as needed.

### Dockerized Setup
- Entire application stack (frontend, backend, database) is containerized using Docker.
- Docker Compose orchestrates multiple containers, allowing seamless interaction between services via internal networking.

### Continuous Integration and Deployment (CI/CD)
- Incorporated CI/CD pipelines for automated testing, building, and deployment of the bloom-filter service.
- **GitHub Actions** is used to streamline updates and ensure smooth rollouts:
  - For every pull request into the main branch, all tests for the bloom-filter service are automatically run.
  - For every release version of the code, a dockerized version of the service is automatically built and pushed to a private repository on **DockerHub**.


## Features

### **Login and Signup** 
Foobar allows users to create accounts securely with a unique username and password. Key features include:
- **Create Account:** 
  - Users can securely create an account with a unique username and password.
    - **Password Requirements:** Contains at least 8 characters,Includes both letters and number.

  This secure and user-friendly process ensures a smooth onboarding experience for new users.

- **Login:** 
  - Users can log in to access their accounts and use the app's features.


![login](https://github.com/user-attachments/assets/334173b9-571f-4a1e-a27c-9c672ea950aa)
  
![image](https://github.com/user-attachments/assets/60b2b411-2f21-4230-a27b-9eb5f9b74171)


### **Feed**
The core feature of Foobar is its feed, where users can view updates, posts, and media. Key features include:

- **Posts:** Users can see, create, and edit posts.
- **Comments and Likes:** Users can comment on and like posts.
- **Search Functionality:** A search box is available at the top menu.
- **Navigation Buttons:**
  - **Log Out:** Redirects to the login page and logs out the current user.
  - **Night Mode:** Switches the site's theme.
  - 
<img width="916" alt="‏‏Feed" src="https://github.com/user-attachments/assets/df6134ee-8e84-4a26-99f9-36c00f3d00c3">

<img width="946" alt="Feed2" src="https://github.com/user-attachments/assets/dcc8a2de-528d-4071-ba53-c736c4197590">

<img width="948" alt="comments" src="https://github.com/user-attachments/assets/2744bee0-92ad-4024-9e76-1b59a2713751">

<img width="951" alt="likes" src="https://github.com/user-attachments/assets/5f50a19c-db0a-4524-bbc6-e88b8678b68f">


### **Profile Page**
The Profile page in Foobar provides users with an overview of their personal information and social connections. Key features include:

- **Edit Personal Details:** Users can easily update their display name, profile picture, and other personal information to keep their profile current and engaging.

- **View Friends:** Users can view a list of their friends, allowing them to keep track of their connections on the platform.

- **Friend Requests Management:** The Profile page allows users to accept or decline incoming friend requests, facilitating seamless social interactions.

- **User Interaction:** Users can explore additional options related to their friends and friend requests, enhancing their networking experience on Foobar.

This user-friendly interface ensures that managing personal profiles and social connections is efficient and intuitive.

  <img width="952" alt="edit-profile" src="https://github.com/user-attachments/assets/14517f31-2291-4268-8331-25d7fa299f63">
  
  <img width="1131" alt="‏‏לכידה" src="https://github.com/user-attachments/assets/41f0069f-64d6-462e-a972-b2b7ff773ad1">


### General Server Features:

- Mocks essential Facebook functionalities like user authentication, profile management, friend requests, posts, and comments.
- Supports both **Android and web clients**.
- Built with a modular architecture following the **MVC architecture** for easy maintenance and extensibility.
- Utilizes a service layer to encapsulate business logic and ensure separation of concerns.
- Easy-to-use routes for handling **API** requests.
- **Bloom Filter:** An additional **multi-threaded server** that prevents users from creating posts containing forbidden URLs via **web sockets**, enhancing security by blocking access to restricted or harmful content. This functionality is applicable only when using the Bloom Filter server. By default, there is a blacklist containing three URLs: `['http://example.com', 'https://warning.com', 'http://danger.il']`. If a user attempts to post any of these URLs, the post will not be published.


# Cloud Setup Instructions

## Deployment Steps

1. **Launch an EC2 Instance**  
   - Use an **Amazon Linux 2 AMI**.  
   - Configure security groups to allow access to:
     - **Port 3000** (frontend).
     - **Port 12346** (backend).
     - **Port 27017** (database).
     - **Port 22** (SSH).  
   - Download the `.pem` key file for SSH access.  

2. **Connect to the Instance**  
   - SSH into the instance:
     ```bash
     ssh -i <keyfile>.pem ec2-user@<instance-public-ip>
     ```
   - Install Docker and Git:
     ```bash
     sudo yum update -y
     sudo yum install -y docker git
     sudo service docker start
     sudo usermod -aG docker ec2-user
     ```

3. **Clone the Repository and Run Docker Compose**  
   - Clone your repository:
     ```bash
     git clone <repository-url>
     cd <repository-directory>
     ```
   - Build and deploy the application:
     ```bash
     docker-compose up --build -d
     ```
4. **Update IP Addresses in Configuration Files**
   - Change IP_ADDRESS_BF_SERVER and IP_CLIENT in the backend environment configuration file (app/config/.env) to the public IP of the EC2 instance.
   - Update the client IP in client/sec/config.js to the public IP of the EC2 instance as well.

6. **Access the Application**  
   - Open `http://<instance-public-ip>:3000` in a browser to access the frontend.

     

# Local Setup Instructions

## Steps to Set Up Locally with Docker

1. **Clone the Repository**  
   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Update IP Addresses in Configuration Files**
   - Change IP_ADDRESS_BF_SERVER and IP_CLIENT in the backend environment configuration file (app/config/.env) to `localhost`for local development.
   - Update the client IP in client/sec/config.js to `localhost` as well.

4. **Run the Application Using Docker Compose**
   ```bash
   docker-compose up --build
   
 and then access the application at http://localhost:3000 in your browser.

## Locally Without Docker

Follow the detailed instructions in the original repositories for the Bloom Filter, backend server, and client, in the following order. You can run all the code in one repo, as shown here (in which case you must follow the paths for this repo instead of the original), or you can run each repo separately.
  
### Important Note:
When you run the server for the first time, a JavaScript script will set up the database with default users, their posts, and comments. After the process completes, you will see the message "Database initialized with default users and their posts." Please make sure that there are no existing collections named `users`, `posts`, or `comments`.

### Tip:
For the best experience, log in using the credentials for user **Eden1@gmail.com** (Password: **Eden1234**), although any account will function properly.


