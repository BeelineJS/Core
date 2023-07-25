module.exports = {
  insert
}
const {
  Create,
  Init,
} = require('core.types')
  .event.application;

const {
  htmlToElement,
} = require('core.util');

function insert(data, repository, doc, win) {
  data.views.forEach(view => {
    const component = repository.components.get(view.component);
    const viewModel = repository.viewModels.get(view.vmKey);
    const model = repository.models.get(view.mKey);
    const e = {
      type: Create
    };

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
     
    const html = component.create(context);
    const element = htmlToElement(html, doc);
    element.id = view.id;
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
      viewModel,
      model,
      util: view.util,
      events: view.events,
      el: view.util.el,
      doc
    }
    component.init(initContext)

    return data;
  });
}
