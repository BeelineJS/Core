# Core

Core files to create a BeelineJS application

## beeline.js (main)

Main file, connect the `components`, `layouts` and `request` with the `core` application.

### onload

The code below is the heart of the application and will create all the necessary
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

View is defining the component and the component data (attributes, lists, behavior)

### view model

The data/definitions for the view.
For example: list of items in Select, Max number of chars in input, valid characters.

### layouts

An HTML static layout to position views/components.

### Components

Component can be anything that interact with the user, for example: Button, H1, Text Input or custom components such as Student details.

Component API/Module export:

```
module.exports = {
  create,
  init,
  render,
  destroy
}
```

The init, render, destroy are not mandatory.
The destroy is unlikely to be used since all the events/observers are centralized and auto sanitized when removed,
it should be used only if you have custom addEventListeners were used.

### observer

The observer enable the view to notify and listen to event from other views.

### events
The events are caught at document level and distributes to all the views.
User events are bounded by the component scope (`data-id`).  
By default all events are captured but this can be modified at the application constructor.
The events being listened to can be modified dynamically.  

The 3 types of events handled are `User`, `Document` and `Window`.
All events can be bounded in the init function:

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

The context is an object transferred between the views to allow access all required data to run the application.

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

The only items that can be modified at the component level is the context's state

## render

The render are the files that add/remove/update the layouts adn view/components data and values to the html.
