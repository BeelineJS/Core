module.exports = {
  create
}

const defaultEvents = ['mousemove'];

function create(repository, doc, add, remove, events = defaultEvents) {
  events.forEach(name => doc.addEventListener(name, onEvent));

  return {
    add,
    remove,
    destroy,
    _: {
      onEvent
    }
  }

 function onEvent(e) {
    repository
      .views
      .list()
      .map(view => {
        return {
          component: repository.components.get(view.component),
           context: {
            view,
            model: repository.models.get(view.mKey),
            viewModel: repository.viewModels.get(view.vmKey),
            util: view.util,
            events: view.events,
            e,
            doc
            }
        }
      })
    .forEach(item => {
      item.component.onDocumentEvent(item.context)
    });
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onEvent));
  }
}
