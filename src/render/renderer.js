module.exports =  create;

function create(repository, doc, win) {
  const {
    Refresh
  } = require('core.types')
    .event.application;

  const {
    areIntersected,
    distinct
  } = require('core.util');

  const view = require('./view');
  const layout = require('./layout');

  return {
    update,
    refresh
  }

  function update(data, eventType = {
    type: Refresh
  }) {
    data = layout.insert(data, repository, doc);
    data = view.insert(data, repository, doc, win);
    refresh(data, eventType);

    return data;
  }

  function refresh(data, e = {
    type: Refresh
  }) {

    const modelKeys = data == null ?
      repository.models.list()
      .map(i => i.key) :
      data.models == null ? [] :
      data
      .models
      .filter(m => m.key != null)
      .map(m => m.key);

    const viewModelKeys = data == null || data.viewModels == null ? [] :
      data
      .viewModels
      .filter(m => m.key != null)
      .map(m => m.key);

    const views = repository.views.list();
    const modelViews = views.filter(view => modelKeys.includes(view.mKey));
    const viewModelViews = views.filter(view => viewModelKeys.includes(view.vmKey));

    const modelBindings = views.filter(view => areIntersected(modelKeys, view.bindings));

    const viewList = distinct([...viewModelViews, ...modelBindings, ...modelViews]);
    viewList.forEach(view => {
      const component = repository.components.get(view.component);
      const viewModel = repository.viewModels.get(view.vmKey);
      const model = repository.models.get(view.mKey);
      const context = {
          e,
          view,
          viewModel,
          model,
          util: view.util,
          events: view.events,
          el: view.util.el,
          doc,
          win
      };
      
      component.render(context);
    })
  }
}


