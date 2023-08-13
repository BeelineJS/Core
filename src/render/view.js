module.exports = insert;

const {
  Create,
  Init,
} = require('../shared/types').event.application;

const {
  htmlToElement,
} = require('../shared/util');

function insert(data, repository, doc, win) {
  data.views.forEach(view => {
    const component = repository.components(view.component);
    const viewModel = repository.viewModels.get(view.vmKey);
    const model = repository.models.get(view.mKey);
    const e = {
      type: Create
    };

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

    const html = component.create(context);
    const element = htmlToElement(html, doc);
    element.setAttribute('data-id', view.id);
    element.classList.add(view.component);

    //TODO: use fragments and insert once at the end of the loop 
    const parentElement = doc.querySelector(view.parentPath);
    if (parentElement == null) {
      console.log(`${view.parentPath} is missing`)
      return;
    }

    parentElement.appendChild(element);
    const initContext = {
      e: {
        type: Init
      },
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
    }
    Object.freeze(initContext);

    component.init(initContext)
  });

  return data;
}
