module.exports = {
  create,
  init,
  render,
  destroy,
  onUserEvent,
  onDocumentEvent,
  onWindowEvent
}

function create() {
  return '';
}

function init() {
}

function render() {
}

function onUserEvent(context) {
  return _onEvent(context, context.events.userEvents());
}

function onDocumentEvent(context) {
  return _onEvent(context, context.events.documentEvents());
}

function onWindowEvent(context) {
  return _onEvent(context, context.events.windowEvents());
}

function destroy() {
}

function _onEvent(context, eventsList) {
  const { e, events } = context;
  const event = events.serialize(e); // e=> name/data-key/key

  switch (true) {
    case eventsList == null:
    case Object.keys(eventsList).length:
    case eventsList[event] == null:
      return;
  }

  return eventsList[event](context);
}