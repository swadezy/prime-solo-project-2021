# PickLogger

## Description

_Duration: 2 Week Sprint_

This app was the penultimate project for Prime Academy - a full-stack, full CRUD app deployed via Heroku. Now, before you get any ideas, in terms of shady-ness, the people who enjoy locksport (the hobby of lockpicking) are generally much closer to Rubik’s Cube enthusiasts than they are to the subjects of breaking-and-entering investigations. This app allows a hobbyist lockpicker to track their lock collection, log lockpicking performance, and view their progress over time via sortable tables and charts. The app uses React, Express, and PostgreSQL.

To see the fully functional site, please visit: [PickLogger](https://intense-brushlands-45030.herokuapp.com/)

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- PostgreSQL
- a .env with a SERVER_SESSION_SECRET

## Installation

1. Create a database named `picklogger`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. A new user may start by registering by clicking 'login/register' Upon registration, they are brought to their 'view locks' page. 
2. They may begin to use the app first by adding any locks they have in their collection, via the 'add locks' form. Any locks they add will appear in their view locks page.
3. Once the user has added the locks they need to, they may want to add picking events for those locks to begin tracking their picking history. They can do this by entering the relevant information into the 'add picking' form.
4. Once a user has added however many pickings they would like, they may view this data in the 'picking history' page. This page has two views - a sortable, filterable table, and a filterable chart. These features make up the bulk of the user experience.
5. An admin may log in using the same login as a normal user, but will see an 'admin' link in the navbar. They are taken to an admin data management view by clicking that link.
6. From the admin page, an admin may add, remove, or edit lock types and brands. They can also remove users, or make other users admins.


## Built With

This version uses React, Redux, Express, Passport, MaterialUI, ApexCharts, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. (Thank your people)

## Support
If you have suggestions or issues, please email me at [smwade1115@gmail.com](smwade1115@gmail.com)