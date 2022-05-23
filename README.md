# paint-app
A MERN stack paint app

## How to use
Note: Instructions are only verified with MacOS.

Make sure you have 
- mongodb-community installed
    ```shell
    brew install mongodb-community
    brew services start mongodb-community
    ```
- npm installed
    ```shell
    brew install node
    ```
You can install [MongoDB Compass](https://www.mongodb.com/try/download/compass) to view the collections for paint-app on a UI.

Once in the project folder -

To run the React app -
```shell
cd client
npm install
npm run start
```

To run the ExpressJS app -
```shell
cd server
npm install
npm run dev
```

## Project Features

### Register page [ /register ]

This screen lets a user register
- [x] Register using email, password

### Login page [ /login ]

This screen lets a user login
- [x] Login using email, password returns a jwt
- [x] Redirect to login if unauthenticated user accesses protected routes
- [x] Verify login status for protected route using jwt from local storage on page load

### Home page [ / ]

This screen shows a gallery list of all drawings that are owned by the user and those that are publically/privately shared with the user.

- [x] Show the user’s details (email currently).
- [x] Show all user drawings and other drawings(publically available or privately shared with them). Features for each gallery list item - 
    - [x] Show creation timestamp.
    - [x] Show time it took to draw.
    - [x] Show thumbnail of the drawing itself.
    - [x] Allow a user to delete their drawing.
    - [x] Allow a user to share their drawing.

### Paint page [ /paint ]

This screen allows the user to create drawings and save them as publically available or private drawings. 

- [x] User is able to choose colors (at least five).
- [x] User is able to change the brush’s stroke width.
- [x] Special “Eraser” brush.
- [x] User is able to choose whether this drawing is public or private.
- [x] Create video of first 4 seconds of drawing once started. to access scroll down on the paint page. [Not complete]


## Main Technical choices
- In the interest of time -
    - All routes in the React app are protected except login and register. This allows making api calls passing in user info as jwt token straightforward instead of implementing checking for login and redirecting them to login page if not logged in so that we are able to pass in user info wherever required.
    - All routes in expressJS app are in the index.js page instead of routes based on paths managed by a router.
    - Focused on web experience more than mobile experience.
- Wrapped the App component with a Auth context provider exported using a custom hook. This allows for us to globally provide authentication state to every component that needs it.
- Local storage to store user data and access token. This was done to provide for a simpler way of getting auth state and performing api calls.
- Mongodb -
    - Used as persistence layer for images since canvas images aren't usually that big in size. Each document in mongodb has an internal max size of 16MB before chunking is implemented internally for storing it.
    - Images stored as string that is Base64 encoded image in png format for the same reason that canvas images aren't usually that big.
    - Technology used on the basis of ease of setup and use with modiying data model schemas based on requirement and ease of querying in real time.



## How would I modify current project to make it better?

React App
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

ExpressJS App
- Validation for api inputs/outputs and api documentation using something like [Swagger](https://github.com/swagger-api/swagger-node).
- Save passwords in an encrypted way instead of String using something like [bcrypt](https://github.com/kelektiv/node.bcrypt.js).
- Make route separations based on main url path as route folders/files and use a router to handle api verbs for each route.
- Error/Exception handling with better error messaging instead of just try catch blocks.

## What else for production use?
Well, that depends on a lot of things. But considerations can include
- Handling authentication/authorization in a completely different way with a separate database table to handle sessions, refresh tokens etc. Also, switching to cookies instead of using local storage for storing jwt tokens. 
- Using a reverse proxy to handle error pages, compression, caching, serving files, and load balancing among other things.
- Serve images using blobl storage service like s3 with cdn support for faster access.
- Host static website.

