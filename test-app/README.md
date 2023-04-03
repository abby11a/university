# Inventory Manager

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
### 2. Add an env file
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

## Methods used in the app
### Modular programming
I made sure each element is seperated into a component, this ensures reuasability of the code. By following modularisation, I can reuse components, like the app Header, throughout my code.

I structured my code into components, pages, APIs, CSS, and testing folders to ensure intuative flow and to follow best practices of both naming conventions and modular programming. You can see an outline of the structure under *Layout of web app*.

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

### Data Storage
The data is stored in a SQLite database using Prisma, this is for the purposes of the Proof of Concept.
This can later be replaced with a DynamoDB database.

## Layout of web app
### /prisma
This folder contains all the files concerning the database. 
- "Prisma is a server-side library that helps developers read and write data to the database in an intuitive, efficient and safe way." (Prisma, 2023)

### src/components
- This folder contains all the reusable components for the web app
#### AdminButton
- Creates a button that is only available to admin users, this is used in /pages/[id] to allow admins to delete a device.
- Whilst this is only used once, I believed it was best practice to add it as a component, in case it is needed later in the development process.
#### Device
- Returns a table row for a device
#### Form
- Creates an editable form used in the create and edit component
#### Header
- Creates a header for the web app, containing navigation of the page
#### Layout
- Contains the header and main app in one component
#### TableHeader
- Returns the correct header for the device table

### src/pages
#### /api
- Contains the APIs for the web app, these are explained in the *Using the REST API* section
#### /auth
- Contains the components for the sign in/ sign up pages
#### /single-device
- Returns a component that views the information for a single device. Users have the ability to edit and admins have the ability to delete the device
#### /create
- Returns a component that is a form to create a device
#### /index
- The entry point
- Brings multiple components together, returns the device table if the user is authenticated, or the authentication pages when the user is not authenticated.
### /styles
- The CSS components for the app

This code was built upon a NextJS fullstack app example, which shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).


## Using the REST API

You can also access the REST API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is `localhost:3000/api/`, so you can e.g. reach the API with [`localhost:3000/api/device`](http://localhost:3000/api/device)).

### `GET`

- `/api/device`: Fetch all devices
- `/api/filterDevices?searchString={searchString}`: Filter devices

### `POST`

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
        `farm: Farm`
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
