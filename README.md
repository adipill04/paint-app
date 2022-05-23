# paint-app
A MERN stack paint app

Project Features

Register page [/register]
This screen lets a user register
- [x] Register using email, password

Login page [/login]
This screen lets a user login
- [x] Login using email, password returns a jwt
- [x] Redirect to login if unauthenticated user accesses protected routes
- [x] Verify login status for protected route using jwt from local storage on page load

Main page [/]
This screen is the public list of drawings that all users uploaded. 

Information for each drawing:
- [x] Creation timestamp.
- [x] Time it took to draw.
- [x] Thumbnail of the drawing itself.
- [x] show the user’s details
- [x] allow a user to delete their drawings