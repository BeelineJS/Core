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

function onDocumentEvent(context){
  return _onEvent(context, context.events.documentEvents());
}

function onWindowEvent(context){
  return _onEvent(context, context.events.windowEvents());
}

function destroy() {
}

function _onEvent(context, events){
  const { e, util } = context;
  const event = util.serializeEvent(e); // e=> name/data-key/key
  if(events == null || 
    Object.keys(events).length == 0 ||
    events[event] == null) return;

  return events[event](context);
}