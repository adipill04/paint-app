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

Information that should be present for each drawing:
- [x] Creation timestamp.
- [] Time it took to draw (from first stroke to sending the drawing).
- [x] Thumbnail of the drawing itself.
- [] show the user’s details
- [x] allow a user to delete their drawings


“Record” the drawing and “Replay” it at will -
* http://ramkulkarni.com/blog/record-and-playback-drawing-in-html5-canvas/

Handle Retina Displays - 
* https://www.kirupa.com/canvas/canvas_high_dpi_retina.htm
* https://www.html5rocks.com/en/tutorials/canvas/hidpi/