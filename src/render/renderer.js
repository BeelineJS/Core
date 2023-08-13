module.exports = create;

function create(repository, doc, win) {
  const {
    Refresh
  } = require('../shared/types').event.application;

  const {
    areIntersected,
    distinct
  } = require('../shared/util');

  return {
    update,
    refresh
  }

  function update(data, eventType = {
    type: Refresh
  }) {
    data = require('./view')(data, repository, doc);
    data = require('./layout')(data, repository, doc, win);
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
      const component = repository.components(view.component);
      const viewModel = repository.viewModels.get(view.vmKey);
      const model = repository.models.get(view.mKey);
      const context = {
        e,
        view,
        data: viewModel == null
          ? {}
          : viewModel.value,
        value: model.value,
        util: view.util,
        events: view.events,
        el: view.util.el(),
        doc,
        win,
        state: {}
      };
      Object.freeze(context);

      component.render(context);
    })
  }
}


