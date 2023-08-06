module.exports = {
  create
}

const { getId } = require('../shared/util');
const { checkForDoubleClickEvent } = require('./eventsHelper');
const defaultEvents = ['click', 'dblclick', 'change', 'input', 'keyup', 'keydown', 'focus', 'focusout'];
let previousEvent = {
  type: null,
  time: 0,
  key: null
};

function create(repository, doc, add, remove, onEvent, events = defaultEvents, doubleClickDelay = 300) {
  events.forEach(name => doc.addEventListener(name, onUserEvent));

  return {
    add,
    remove,
    destroy,
    _: {
      onEvent: onUserEvent
    }
  }

  function onUserEvent(e) {

    const id = getId(e);
    if (id == null) {
      return;
    }

    e.stopImmediatePropagation();

    const {
      views,
      models
    } = repository;

    const view = views.get(id);

    let model = models.get(view.mKey);
    const viewModel = models.get(view.vmKey);
    const ee = checkForDoubleClickEvent(e, events, previousEvent, doubleClickDelay);

    previousEvent = {
      type: e.type,
      time: (new Date()).getTime(),
      target: e.target
    }

    const context = {
      e: ee,
      view,
      data: viewModel == null
        ? {}
        : viewModel.value,
      value: model.value,
      util: view.util,
      events: view.events,
      el: view.util.el(),
      doc,
      state: {}
    };

    Object.freeze(context);

    onEvent(context, view.events.userEvents());
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onUserEvent));
  }
}
