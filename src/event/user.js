module.exports = {
  create
}

const {
  getId,
  compare
} = require('core.util');

const defaultEvents = ['click', 'dblclick', 'change', 'input', 'keyup', 'keydown', 'focus', 'focusout'];

let previousEvent = {
  type: null,
  time: 0,
  key: null
};

function create(repository, renderer, doc, add, remove, events = defaultEvents, doubleClickDelay = 300) {
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

    const id = getId(e);
    if (id == null) {
      return;
    }

    e.stopImmediatePropagation();

    const {
      views,
      models,
      components
    } = repository;

    const view = views.get(id);
    let component = components.get(view.component);

    let model = models.get(view.mKey);
    const viewModel = models.get(view.vmKey);
    const ee = checkForDoubleClickEvent(e, events, previousEvent);
 
    previousEvent = {
      type: e.type,
      time: (new Date()).getTime(),
      target: e.target
    }

    const context = { 
      e:ee,
      view, 
      viewModel,
      model,
      util: view.util,
      events: view.events,
      el: view.util.el,
      doc 
    };
    const value = component.onUserEvent(context);

    model = models.get(view.mKey);

    const modified = value !== undefined && !compare(model.value, value);
    
    if (modified) {
      model = models.set(model.key, value);
    }

    if (view.request) {
      let formData = {};
      if (view.request.formKey) {
        formData = repository.models.getFormData(view.request.formKey);
      }

      const data = {
        ...view.request,
        ...{
          formData
        }
      }
      view.core.request(data);
    }
    if(!modified) return;

    renderer.refresh({
      models: [model]
    }, e);

    repository.save()
  }

  function destroy() {
    events.forEach(name => doc.removeListener(name, onEvent));
  }

  function checkForDoubleClickEvent(e, events, previousEvent){
   
     if(!events.includes('dblclick') || previousEvent.type !== 'click' || e.type !== 'click' ) return e;

     if((new Date()).getTime() - previousEvent.time > doubleClickDelay){
        return e;
     }
    
    return {
        type:'dblclick',
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
