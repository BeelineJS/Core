# Core
Core files to create a BeelineJS application

## beeline.js
Main file, connect the `components`, `layouts` and `request` with the core application.
The `onload` function is where the data converts to html/code.

### onload
The code below is the heart of the application and will create all the neccessary
updates, binding, rendering and sanitizing (removing unused views/models)


`util.pipe(

            load,
            
            update,
            
            sanitize,
            
            save
            
        )(data);`
