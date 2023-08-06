module.exports = {
  create
}

const defaultEvents = ['mousemove'];
const { checkForDoubleClickEvent } = require('./eventsHelper');
let previousEvent = {
  type: null,
  time: 0,
  key: null
};

function create(repository, doc, win, add, remove, onEvent, events = defaultEvents, doubleClickDelay = 300) {
  events.forEach(name => doc.addEventListener(name, onDocumentEvent));

  return {
    add,
    remove,
    destroy,
    _: {
      onDocumentEvent
    }
  }

  function onDocumentEvent(e) {
    repository
      .views
      .list()
      .map(view => {

        const { models, viewModels } = repository;

        let model = models.get(view.mKey);
        const viewModel = viewModels.get(view.vmKey);
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
          doc, win
        }

        Object.freeze(context);

        return context;
      })
      .forEach(context => {
        onEvent(context, context.view.events.documentEvents());
      });
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onEvent));
  }
}
