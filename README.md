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

function _onClick(){
   ...
}
```

The events are cought at document level and delegated to all the views.
User events are bounded by the component scope.

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
    win
}
```




