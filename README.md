# IATA
Service for receiving information about airport based on IATA code.

#INSTALLATION 

1. First get this repo by using `git clone https://github.com/shmuga/IATA`.    
2. Run `npm install` inside the project folder. 
3. Run the application `npm start`.

#Running the App in Production

This really depends on how complex your app is and the overall infrastructure of your system, but the general rule is that all you need in production are all the files under the app/ directory. Everything else should be omitted.

Angular apps are really just a bunch of static html, css and js files that just need to be hosted somewhere they can be accessed by browsers.

If your Angular app is talking to the backend server via xhr or other means, you need to figure out what is the best way to host the static files to comply with the same origin policy if applicable. Usually this is done by hosting the files by the backend server or through reverse-proxying the backend server(s) and webserver(s).

