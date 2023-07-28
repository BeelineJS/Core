module.exports = {
  create
}

const defaultEvents = ['mousemove'];

function create(repository, doc, add, remove, onEvent, events = defaultEvents) {
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
        return {
          view,
          model: repository.models.get(view.mKey),
          viewModel: repository.viewModels.get(view.vmKey),
          util: view.util,
          events: view.events,
          e,
          doc
        }
      })
      .forEach(context => {
        onEvent(context, context.view.events.documentEvents());
      });
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onEvent));
  }
}
