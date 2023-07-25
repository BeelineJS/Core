module.exports = {
    create
}
const defaultEvents = ['resize', 'load', 'hashchange'];

function create(repository, win, doc, add, remove, events = defaultEvents) {

    events.forEach(name => win.addEventListener(name, onEvent));

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
              el: view.util.el,
              e,
              doc,
              win
            }
        }
      })
      .forEach(item => {
        item.component.onWindowEvent(item.context)
      });
  }

    function destroy() {
        events.forEach(name => win.removeListener(name, onWindowEvent));
    }
}