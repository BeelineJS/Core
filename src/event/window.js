module.exports = {
  create
}
const defaultEvents = ['resize', 'load', 'hashchange'];

function create(repository, win, doc, add, remove, onEvent, events = defaultEvents) {

  events.forEach(name => win.addEventListener(name, onWindowEvent));

  return {
    add,
    remove,
    destroy,
    _: {
      onWindowEvent
    }
  }

  function onWindowEvent(e) {
    repository
      .views
      .list()
      .map(view => {
        const context = {
          view,
          value: repository.models.get(view.mKey).value,
          viewModel: repository.viewModels.get(view.vmKey),
          util: view.util,
          events: view.events,
          el: view.util.el(),
          e,
          doc,
          win,
          state: {}
        }
        Object.freeze(context);

        return context;
      })
      .forEach(context => {
        onEvent(context, context.view.events.windowEvents());
      });
  }

  function destroy() {
    events.forEach(name => win.removeListener(name, onWindowEvent));
  }
}