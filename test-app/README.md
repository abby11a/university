# Inventory Manager

## Table of Contents
- [Getting started](#getting-started)
  - [Download dependencies](#1-download-example-and-install-dependencies)
  - [Add an .env file](#2-add-an-env-file)
  - [Create and seed the database](#3-create-and-seed-the-database)
  - [Start the app](#4-start-the-app)
  - [Unit test the app](#5-unit-test-the-app)
  - [E2E test the app](#6-e2e-test-the-app)
- [Methods used in the app](#methods-used-in-the-app)
  - [Modular programming](#modular-programming)
  - [Version control](#version-control-and-refactoring)
  - [Usability](#usability)
  - [Data validation](#data-validation)
  - [Authentication](#authentication)
  - [Data storage](#data-storage)
  - [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
- [Dependencies](#dependencies)
  - [TypeScript](#typescript)
  - [NextJS](#nextjs)
  - [Prisma](#prisma)
  - [SQLite](#sqlite)
  - [Cypress](#cypress)
  - [Jest](#jest)
- [Layout of the app](#layout-of-web-app)
- [Using the REST API](#using-the-rest-api)

## Getting started
### 1. Download example and install dependencies

Download this example:

```
git clone https://github.com/abby11a/university
```

Install npm dependencies:

```
cd university
cd test-app
npm install
```
### 2. Add an .env file
Create a .env file in the test-app folder. In this file be sure to include:
```
NextAuth_SECRET= "Any-String"
```
### 3. Create and seed the database

Create the Prisma database using a SQLite Database, seeded in prisma/seed.ts.

```
npx prisma migrate dev                                  
```
### 4. Start the app
(cd test-app)

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.
To sign into the UI you can use the following details:

For admin view:
email: admin@prisma.io
password: password

For regular view:
email: regular@prisma.io
password: password
### 5. Unit test the app
```
npm run test
```
Runs unit tests on the main components
### 6. E2E test the app
```
npm run cypress
```

## Methods used in the app
### Modular programming
I made sure each element is seperated into a component, this ensures reuasability of the code. By following modularisation, I can reuse components, like the [app Header](/src/components/Header.tsx), throughout my code.

I structured my code into [components](/src/components/), [pages](/src/pages/), [APIs](/src/pages/api/), [CSS](/src/styles/), and [testing folders](/__tests__/) to ensure intuative flow and to follow best practices of both naming conventions and modular programming. You can see an outline of the structure under [Layout of web app](#layout-of-web-app).

### Version Control and Refactoring

I used git to version control the changes to this app, the commits can be found under the git repository: https://github.com/abby11a/university

During the process I prioritised working increments in each commit. I then would revisit the code to refactor and improve it, for instance changing naming conventions, removing unused components, adding tests.

This follows Agile's principles of: early and continuous delivery of working software, and continuous attention to technical excellence.

### Usability

I created wireframes for the UX design of the app.
I ensured to create simple navigation to allow the user to navigate the app easily.

### Data Validation
By using typescript, it ensures that entered data is the correct type.
I added validation on submit buttons to ensure that the required fields are entered.

In the form, I ensured that the user cannot submit it without filling in the required fields. I disabled the button, and added an appropriate message to display on screen.
In the login component, as well as others, a pop-up is displayed if the credentials that are entered are incorrect
In the delete section, I ensured to display a confirmation message to confirm the user wanted to delete a device

### Authentication
I used Next authentication to ensure that the user can log in with the correct credentials. 
Admins have a different view to regular users, as the delete device button is enabled for them.
A user can also sign up as a regular user.

### Data Storage
The data is stored in a SQLite database using Prisma, this is for the purposes of the Proof of Concept.
This can later be replaced with a DynamoDB database.

### Object-Oriented Programming (OOP)
When developing in React, Object-Oriented Programming (OOP) is thought of because of its components and inheritance. However React is a functional framework where each component must contain an output in order to render (Chiarelli, 2018). For this reason, React frameworks are not OOP based and support functional, modular based applications. Therefore, when creating the app I did not use OOP, but I did use an OOP mindset.

Chiarelli, A. (2018) “The functional side of React,” Medium, 31 October. Available at: https://medium.com/@andrea.chiarelli/the-functional-side-of-react-229bdb26d9a6 (Accessed: April 14, 2023). 

## Dependencies
### TypeScript
  TypeScript is a language based on JavaScript with the added benefit of type safety
### NextJS
  NextJS is a framework that helps the development of web-applications.
  - Pages
    NextJS allows React components to render specific URLs, under each file of the folder “pages”, NextJs creates an automatic route based on its name.
  - Dynamic Routes
    NextJS can create routes that are dependent on external data, for instance I used pages/single-device/[id]; this is a dynamic route that creates a page based on the value of [id], this variable can be used in the page. Therefore, this [id] is used in the heading for the page.
  - Server-side Rendering
    NextJS automatically uses server-side rendering, this means that the information is loaded on the server and then sent to the client. This is used when loading all the pages under the /pages folder. It is also directly referenced by using “getServerSideProps” when data is fetched at request time. This is used in the inventory manager to fetch the Prisma data for the devices and farms at the beginning of the session.
  - API Routes
    NextJS helps with API routing, which allows fetching and manipulating data on the server. This is described under [Using the REST API](#using-the-rest-api).
  - Client-side routing
    If needed, client-side routing can be implemented
### Prisma
  Prisma is a Node.js and TypeScript Object–Relational Mapping (ORM), that helps create and manage databases
### SQLite
  I used an SQLite table for the proof of concept, as it will be easy to replace with a DynamoDB database.
### Cypress
  Cypress is a testing framework that enables easy E2E testing
### Jest
  Jest is a testing framework which I used to implement unit tests

## Layout of web app
### [src/prisma](/prisma/)
This folder contains all the files concerning the database. 
- "Prisma is a server-side library that helps developers read and write data to the database in an intuitive, efficient and safe way." (Prisma, 2023)

### [src/components](/src/components/)
- This folder contains all the reusable components for the web app
#### [AdminButton](/src/components/AdminButton.tsx)
- Creates a button that is only available to admin users, this is used in /pages/[id] to allow admins to delete a device.
- Whilst this is only used once, I believed it was best practice to add it as a component, in case it is needed later in the development process.
#### [Device](/src/components/Device.tsx)
- Returns a table row for a device
#### [Form](/src/components/Form.tsx)
- Creates an editable form used in the create and edit component
#### [Header](/src/components/Header.tsx)
- Creates a header for the web app, containing navigation of the page
#### [Layout](/src/components/Layout.tsx)
- Contains the header and main app in one component
#### [TableHeader](/src/components/TableHeader.tsx)
- Returns the correct header for the device table

### [src/pages](/src/pages/)
#### [/api](/src/pages/api/)
- Contains the APIs for the web app, these are explained in the *Using the REST API* section
#### [/auth](/src/pages/auth/)
- Contains the components for the sign in/ sign up pages
#### [/single-device](/src/pages/single-device/)
- Returns a component that views the information for a single device. Users have the ability to edit and admins have the ability to delete the device
#### [/create](/src/pages/create.tsx)
- Returns a component that is a form to create a device
#### [/index](/src/pages/index.tsx)
- The entry point
- Brings multiple components together, returns the device table if the user is authenticated, or the authentication pages when the user is not authenticated.
### [/styles](/src/styles)
- The CSS components for the app

This code was built upon a NextJS fullstack app example, which shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).


## Using the REST API

You can also access the REST API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is `localhost:3000/api/`, so you can e.g. reach the API with [`localhost:3000/api/device`](http://localhost:3000/api/device)).

- GET
  - `/api/device`: Fetch all devices
  - `/api/filterDevices?searchString={searchString}`: Filter devices

- POST
  - `/api/device`: Create a new device
    - Body:
      - data: {
        `id: String`,
        `updatedAt: Date`,
        `make: String`,
        `model: String`,
        `chipset: String`,
        `status: String`,
        `availability: Boolean`,
        `location: String`, 
        `farmId: String`
      }
  - `/api/device/[id]/edit`: Edit a device
  - Body:
    - id: String,
    - data: {
        `updatedAt: Date`,
        `make: String`,
        `model: String`,
        `chipset: String`,
        `status: String`,
        `availability: Boolean`,
        `location: String`,
        `farm: Farm`
      }
  - `/api/device/[id]`: Delete a device
    - method: 'DELETE',
    
  - `/api/user`: Create a new user
    - Body:
      - `email: String` (required): The email address of the user
      - `name: String` (optional): The name of the user
