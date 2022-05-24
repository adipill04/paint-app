# paint-app
A MERN stack paint app

## How to use
Note: Instructions are currently only verified with MacOS.

### Pre-requisites

Make sure you have 
- **mongodb-community** installed
    ```shell
    brew install mongodb-community
    brew services start mongodb-community
    ```
- **npm** installed
    ```shell
    brew install node
    ```
You can install [MongoDB Compass](https://www.mongodb.com/try/download/compass) to view the collections for paint-app on a UI.

### Steps to Run

Once in the project folder -

* To run the React app -
```shell
cd client
npm install
npm run start
```

* To run the ExpressJS app -
```shell
cd server
npm install
npm run dev
```

## Project Features

### Register page [ /register ]

![Alt text](/screenshots/register-page.png?raw=true "Register Page")

This screen lets a user register
- [x] User can register using email and password.

### Login page [ /login ]

![Alt text](/screenshots/login-page.png?raw=true "Register Page")

This screen lets a user login
- [x] Login using email, password returns a jwt.
- [x] Redirect to login if unauthenticated user accesses protected routes.
- [x] Verify login status for protected route using jwt from local storage on page load.

### Home page [ / ]

![Alt text](/screenshots/home-page.png?raw=true "Register Page")

This screen shows a gallery list of all drawings that are owned by the user and those that are publically/privately shared with the user.

- [x] Show the user’s details (email currently).
- [x] Show all user drawings and other drawings(publically available or privately shared with them). Features for each gallery list item: 
    - [x] Show creation timestamp.
    - [x] Show time it took to draw.
    - [x] Show thumbnail of the drawing itself.
    - [x] Allow a user to delete their drawing.
    - [x] Allow a user to share their drawing.

### Paint page [ /paint ]

(insert screenshot)

This screen allows the user to create drawings and save them as publicly available or private drawings. 

- [x] User is able to choose colors (at least five).
- [x] User is able to change the brush’s stroke width.
- [x] Special “Eraser” brush.
- [x] User is able to choose whether this drawing is public or private.
- [x] Create video of first 4 seconds of drawing once started. To access scroll down on the paint page. [Not complete]


## Main Technical choices

- Wrapped the App component with a Auth context provider exported using a custom hook. This allows for us to globally provide authentication state to every component that needs it. (explain)
- Local storage to store user data and access token. This was done to provide for a simpler way of getting user data and JWT.
- Chose Mongodb as the database solution on the basis of ease of setup and use with modiying data model schemas based on requirement and ease of querying in real time.

### Design decisions made in the interest of time 

- Paint page route is protected and navigates you to login page if user is not authenticated instead of requiring auth only when user is trying to save drawing.
- All routes in expressJS app are in the index.js page instead of routes based on paths managed by a router.
- Used mongodb as persistence layer for images. Drawings are stored as a string that is Base64 encoded in png format. Prioritized the handling rasterization, it's persitence and working with rasterized drawings based on device display sizes as an enhancement.
- Focused more on web experience than mobile experience.

## How can I make it better?

**Image Peristence**
- Use [fabricJS](http://fabricjs.com/) to handle rasterization of html canvas to SVGs while saving canvas.
- Generate multiple qualities of SVGs while saving to handle different display sizes - small, medium and large.
- Store canvas svgs in blob storage and metadata including urls for blobs containing SVGs of different quality for the canvas in Mongodb.
- Here's a [comic](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for why [srcset](https://ericportis.com/posts/2014/srcset-sizes/) will be good for use here.

**React App**
- Making home page a public route where publically accessible drawings can be seen and adding the requirement for protected route where user is needed to be recorgnized for persisting and fetching information on and from the backend.
- Better styling using bootstrap, styled components.
- Validation for inputs used across the application.
- Make painting canvas into a custom hook instead of the current functional component to separate out logic further and make general component look cleaner.
- Scale pixels for the canvas with [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) to make sure canvas looks good on high dpi screens like MacBook's Retina display.
- Error/Exception handling with better error messaging and UI instead of just try catch blocks.
- Based on how mouse events are handled on desktop devices for the canvas, handle touch events in a similar way to  mobile touch screen devices for the canvas to work for mobile devices.
- Use quadratic curves for points on the canvas to make it look smoother. More research needed on that and other options to achieve the same.
- Find opportunities to use Memoized components, debouncing.
- Analyze re-renders and network utilization for the app for optimization.

**ExpressJS App**
- Validation for api inputs/outputs and api documentation using something like [Swagger](https://github.com/swagger-api/swagger-node).
- Save passwords in an encrypted way instead of String using something like [bcrypt](https://github.com/kelektiv/node.bcrypt.js).
- Make route separations based on main url path as route folders/files and use a router to handle api verbs for each route.
- Error/Exception handling with better error messaging instead of just try catch blocks.

## What else for production use?
Well, that depends on a lot of things. But considerations can include -
- Handling authentication/authorization in a completely different way with a separate database table to handle sessions, refresh tokens etc. Also, switching to cookies instead of using local storage for storing jwt tokens. 
- Using a reverse proxy to handle error pages, compression, caching, serving files, and load balancing among other things.
- Serve images using blob storage service like s3.
- Host static website.
- Parameterize global variables into secrets for the front end and backend and store it in a secrets vault.
- CI/CD process for deploying front end and backend APIs.
- Logging and monitoring services for client and server.
