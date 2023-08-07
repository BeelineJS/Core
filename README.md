# Core
Core files to create a BeelineJS application

## beeline.js
Main file, connect the `components`, `layouts` and `request` with the core application.
The `onload` function is where the data converts to html/code.

### onload
The code below is the heart of the application and will create all the neccessary
updates, binding, rendering and sanitizing (removing unused views/models)


```
util.pipe(
   load,
   update,
   sanitize, 
   save
)(data);
```

## repository
The repository consist of model,view, viewData (viewModel), layout and view events, view observer enabling to notify/subscribe between views.

### model
Model value represent the value of the view only, a value can be updated and send back to the server.

### view
View is defining the component and the component data (attributes, lists, behaviours)

### view data
View data, which referred in some cases the view model is the data that describle to view.
For example: list of items in Select or Max number of chars in input.

### layouts
An HTML static layot to position views/components.

### Components
Component can be anything that interact with the user, for example: Button, H1, Text Input or custom components such as Student details.

Component API/Modudle export:
```
module.exports = {
  create,
  init,
  render,
  destroy
}
```

The init, render, destroy are not mandatory.
The destroy is unlikely to be used since all the events/observers are centeralized and auto sanitized when removed, 
it should be used only if you have custom addEventListeners were used.


### observer
The observer enable the view to notify and listen to event from other views.

### events
The 3 types of events handled are User, Document and Window.
All events can be bounded in the init funciton:

```
const userEvents = {
  'click': _onClick
};

function init(context) {
  const { events } = context;
  events.user.set(userEvents);
}

function _onClick(context){
   ...
}
```

## Context
The context is an object transfered between the views to allow access all required data to run the application.
```
{
    e,
    view,
    data,
    value,
    util,
    events,
    el,
    doc,
    win,
    state
}
```


The only items that canbe modified at the component level is the context's state

## events
The events are cought at document level and distributes to all the views.
User events are bounded by the component scope.
By default all events are captured but this can be modified at the application constructor.
The events being listened to can be modified dynamically.

## render
The render are the files that add/remove/update the layouts adn view/components data and values to the html.



