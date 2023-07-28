module.exports = {
  create
}

const {
  getId
} = require('../shared/util');

const defaultEvents = ['click', 'dblclick', 'change', 'input', 'keyup', 'keydown', 'focus', 'focusout'];

let previousEvent = {
  type: null,
  time: 0,
  key: null
};

function create(repository, renderer, doc, add, remove, onEvent, events = defaultEvents, doubleClickDelay = 300) {
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
    const ee = checkForDoubleClickEvent(e, events, previousEvent);

    previousEvent = {
      type: e.type,
      time: (new Date()).getTime(),
      target: e.target
    }

    const context = {
      e: ee,
      view,
      viewModel,
      model,
      util: view.util,
      events: view.events,
      el: view.util.el,
      doc
    };

    onEvent(context, view.events.userEvents());
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onUserEvent));
  }

  function checkForDoubleClickEvent(e, events, previousEvent) {

    if (!events.includes('dblclick') || previousEvent.type !== 'click' || e.type !== 'click') return e;

    if ((new Date()).getTime() - previousEvent.time > doubleClickDelay) {
      return e;
    }

    return {
      type: 'dblclick',
      target: e.target,
      isTrusted: e.isTrusted,
      currentTarget: e.currentTarget,
      childNodes: e.childNodes,
      children: e.children,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      pageX: e.pageX,
      pageY: e.pageY,
      screenX: e.screenX,
      screenY: e.screenY,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      ctrlKey: e.ctrlKey,
      x: e.x,
      y: e.y,
      srcElement: e.srcElement
    };
  }
}
