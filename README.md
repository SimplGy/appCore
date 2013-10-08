appCore
=======

If you want to use Backbone and AMD modules to build a large application, this core might be a good starting place for you.

It provides a way to abstract application-wide functionality like error management, page changing, and application paths up to a high level, and leave "pages" to control all of their content independently.

Leverages these included dependencies:
* Backbone / Underscore
* Curl.js
* Zepto

Try The Example App
-------------------
To try it, pull the project, run a static web server, and navigate to:

    http://localhost/appCore/exampleApp1/

You can try different routes as defined when the application is started in `exampleApp1/index.html`, such as:

    http://localhost/appCore/exampleApp1/#settings
    http://localhost/appCore/exampleApp1/#reports
    http://localhost/appCore/exampleApp1/#home

The application core also understands and prebuilds up to 3 parameters, so you can try paths like this:

    http://localhost/appCore/exampleApp1/#reports/1/2013

These options are passed to the view in the array `this.options.urlParams`.
This gives your application's pages easy access to route params.


Create Your Own App
-------------------
* Create a folder that is a sibling to `exampleApp1`
* Create an `index.html` file in this folder. Use the file from `exampleApp1/index.html` as a starting point
* Change the paths that are sent to the application to represent the pages you want to have in your application
* Load your new app in a browser
* Note that the screen is blank. Open the Console. Note the console error `shared/appCore/app.view: pages/yourPagePath.view is not a valid module path for pageId: yourPagePath`

This app core uses a convention to define pages. Every path you send to the application is expected to have a corresponding Backbone View.

* Create `pages/yourPagePath.view.js`. One for every path you have defined for your application.
* Each should implement `initialize` and `render` and append itself to the DOM. use `this.options.parentSelector` as the location.
* Load the app in the browser and navigate to: `localhost/appCore/yourApplication/#yourPagePath`

You should now have a new application which, given configuration as an array of objects with ids, will stand up routes and seek out pages matching those ids.