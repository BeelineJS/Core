module.exports = {
  create
}

const _util = require('../shared/util');
const _observer = require('./observer')
  .create();

function create(request, valueForKey, doc) {
  const _views = {};
  let _uid = 1;

  return {
    load,
    list,
    get,
    forKey,
    forBoundKey,
    sanitize,
    destroy,
    _: {
      build
    }
  }

  function build(data) {
    const cData = _util.clone(data);

    cData.views = cData.views.map(vw => {
      const id = _hexId(_uid++);
      const core = {
        subscribe: _observer.subscribeFn(id),
        notify: _observer.notify,
        valueForKey,
        request: request,
        remove: removeFn(id)
      }

      const view = {
        id,
        bindings: vw.bindings || [],
        dispatch: vw.dispatch || [],
        requestEvents: vw.requestEvents || [],
        model: vw.model || null,
        core,
        util: require('./views.utility').create(id, doc),
        events: require('./views.events').create(doc),
      }

      const newView = {
        ...vw,
        ...view
      };

      Object.freeze(newView);

      return newView;
    })

    return cData;
  }

  function load(data) {
    data = build(data);
    data.views.forEach(vw => {
      _views[vw.id] = vw;
    })

    return data;
  }

  function list() {
    return Object.values(_views)
  }

  function get(id) {
    return _views[id]
  }

  function forKey(key) {
    return Object.values(_views)
      .filter(view => view.key === key);
  }

  function forBoundKey(key) {
    return Object.values(_views)
      .filter(view => view.bindings.length > 0)
      .filter(view => view.bindings.includes(key));
  }

  function _hexId(id) {
    return 'H' + Number(id)
      .toString(16)
      .toUpperCase();
  }

  function removeFn(id) {
    return function remove() {
      const el = doc.getElementById(id);
      el.remove();
    }
  }

  function sanitize() {

    const unusedIds = list()
      .filter(v => doc.getElementById(v.id) == null)
      .map(v => v.id);

    unusedIds.forEach(id => {
      _views[id].events.destroy()
      delete _views[id]
    });
  }

  function destroy() {
    _observer.destroy();
    _views.forEach(v => v.events.destroy())
    _views = null;
  }
}
