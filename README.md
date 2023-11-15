# Travel Tracker
![Tests](https://badgen.net/badge/tests/passing/green?icon=github)

# Tech Stack
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

# Contributors
[Erica Hagle](https://github.com/ericahagle)

# Abstract
This application is designed to allow travelers to track their past, upcoming, and pending trips, as well as create and submit new trip requests. The traveler can see an estimate of trip cost prior to submission, and can see the total amount in US dollars that they have spent on travel with the agency over the course of this year. The application has been tested against several accessiblity metrics for users who may be colorblind or have other visual impairments, as well as for users who may have mobility impairments.

# Context
This application was built as the final solo project of Turing School of Software and Design's Front End Web Development program, Mod 2. We were given 7 days, from kick-off, to complete and submit the project for evaluation.

# Preview
https://github.com/ericahagle/travel-tracker/assets/133910120/fe936a82-d7ed-4e09-b755-9f62f5f1fda5

# Installation Instructions
1. Clone this client respository to your local machine
1. Clone this server repository to your local machine
1. Navigate (`cd`) to your local directory containing the server repository
1. Run `npm install` to install the dependencies
1. Run `npm start` to start the server
1. Open a separate Terminal window or tab
1. Navigate (`cd`) to your local directory containing the client repository
1. Run `npm install` to install the dependencies
1. Run `npm start` to start the server
1. On your web browser, navigate to http://localhost:8080/
1. Log into the app with the following credentials:
    - username: `traveler1` (where 1 is the ID of the user, and can be any integer between 1 and 50)
    - password: `travel`

# Learning Goals
- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface
- Make network requests to retrieve data
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP (Single Responsibility Principle)

# Challenges & Wins
## Challenges
- This was the first time I approached creating an app that uses both GET and POST fetch API calls, as well as writing all functions, unit tests, and DOM updates as the sole contributor. It was a LOT, but I felt like I really learned even more by implementing these technologies myself.
- Getting the POST to work was a fun challenge. I ended up leaning on some of my cohort-mates to help me suss out an issue that was causing errors. Luckily, they had already run into the same issue and were able to point me in the right direction! (Turns out the date wasn't formatting correctly, so I had to run a little helper function to format it in the way that the API wanted.)
- I spent pretty much the entire project coughing and not sleeping. I was stricken with a bad upper respiratory infection right before kickoff and it lasted through the duration. Trying to build an app while coughing and in a brain fog is NOT FUN.
## Wins
- Working solo means that I can arrange my project in not only a clean and orderly way, but specifically in a clean and orderly way that makes sense to _me_. 
- Once I got rolling, I was surprised at how easy some of the coding came for me. There were bits like calculating the total yearly spend that I heard other folks were having a lot of trouble with, that I somehow solved very quickly. There were plenty of hiccups along the way, but I managed to slog through with very minimal outside help. That felt pretty great.
- I persevered. Despite illness and time constraints, I succeeded in producing a simple, clean, _usable_ application. I'm looking forward to making it more robust in in the future.
