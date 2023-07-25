/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var BeelineJS;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./beeline.js":
/*!********************!*\
  !*** ./beeline.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const util = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\nconst types = __webpack_require__(/*! core.types */ \"./shared/types.js\");\r\n\r\nmodule.exports = {\r\n    create,\r\n    types,\r\n    util\r\n}\r\n\r\nfunction create(boot) {\r\n    const log = boot.log || util.log;\r\n\r\n    setDefaults(boot, ['components', 'layouts', 'request'])\r\n\r\n    const components = boot.components || _components;\r\n    const layouts = boot.layouts || _layouts;\r\n    const request = (boot.request || _request).create(onLoad).request;\r\n\r\n    const doc = boot.doc || document;\r\n    const win = boot.win || window;\r\n\r\n    const repository = (__webpack_require__(/*! ./repository/repository */ \"./repository/repository.js\").create)(components, layouts, request, doc, win);\r\n    const renderer = (__webpack_require__(/*! ./render/renderer */ \"./render/renderer.js\").create)(repository, doc, win);\r\n    const events = (__webpack_require__(/*! ./event/events */ \"./event/events.js\").create)(repository, renderer, boot.events, doc, win);\r\n\r\n    const api = {\r\n        onLoad,\r\n        destroy,\r\n        _: {\r\n            events,\r\n            renderer,\r\n            repository\r\n        }\r\n    }\r\n\r\n    return api;\r\n\r\n    function onLoad(data) {\r\n        data = {\r\n            models: data.models || [],\r\n            viewModels: data.viewModels || [],\r\n            views: data.views || [],\r\n            layouts: data.layouts || [],\r\n            events: data.events || []\r\n        }\r\n\r\n        util.pipe(\r\n            repository.load,\r\n            renderer.update\r\n        )(data);\r\n\r\n        repository.sanitize()\r\n\r\n        return api;\r\n    }\r\n\r\n    function setDefaults(boot, values) {\r\n        values.forEach(value => {\r\n            if (boot[value] == null) {\r\n                log(`${value} is missing`);\r\n\r\n            }\r\n        });\r\n\r\n        return !values.some(value => boot[value] == null);\r\n    }\r\n\r\n    function destroy() {\r\n        observer.destroy();\r\n        repository.destroy();\r\n        events.destroy();\r\n    }\r\n}\r\n\r\n\r\nconst _components = {\r\n    get() {\r\n        return null;\r\n    }\r\n};\r\n\r\nconst _layouts = {\r\n    get() {\r\n        return null;\r\n    }\r\n};\r\n\r\nconst _request = {\r\n    create() {\r\n        return {\r\n            request() {\r\n                return null;\r\n            }\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./beeline.js?");

/***/ }),

/***/ "./event/document.js":
/*!***************************!*\
  !*** ./event/document.js ***!
  \***************************/
/***/ ((module) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nconst defaultEvents = ['mousemove'];\r\n\r\nfunction create(repository, doc, add, remove, events = defaultEvents) {\r\n  events.forEach(name => doc.addEventListener(name, onEvent));\r\n\r\n  return {\r\n    add,\r\n    remove,\r\n    destroy,\r\n    _: {\r\n      onEvent\r\n    }\r\n  }\r\n\r\n  function onEvent(e, doc) {\r\n    repository\r\n      .views\r\n      .list()\r\n      .map(vw => {\r\n        return {\r\n          view: vw,\r\n          component: repository.components.get(vw.component)\r\n        }\r\n      })\r\n      .map(vw => {\r\n        return {\r\n          view: vw.view,\r\n          component: vw.component,\r\n          model: repository.models.get(vw.mKey),\r\n          viewModel: repository.viewModels.get(vw.vmKey),\r\n          e: {\r\n            type: Event\r\n          }\r\n        }\r\n      })\r\n      .forEach(vw => {\r\n        const context = {\r\n          e,\r\n          view: vw.view,\r\n          viewModel: vw.viewModel,\r\n          model: vw.model,\r\n          doc\r\n        };\r\n        vw.component.onDocumentEvent(context)\r\n      });\r\n  }\r\n\r\n  function destroy() {\r\n    events.forEach(name => doc.removeListener(name, onEvent));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://BeelineJS/./event/document.js?");

/***/ }),

/***/ "./event/events.js":
/*!*************************!*\
  !*** ./event/events.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    create\r\n}\r\n\r\n\r\nfunction create(repository, renderer, events = {}, doc, win) {\r\n    const user = (__webpack_require__(/*! ./user */ \"./event/user.js\").create)(repository, renderer, doc, addFn(doc), removeFn(doc), events.user);\r\n    const document = (__webpack_require__(/*! ./document */ \"./event/document.js\").create)(repository, doc, addFn(doc), removeFn(doc), events.document);\r\n    const window = (__webpack_require__(/*! ./window */ \"./event/window.js\").create)(renderer, win, addFn(win), removeFn(win), events.window);\r\n\r\n    return {\r\n        user,\r\n        document,\r\n        window,\r\n        destroy\r\n    }\r\n\r\n    function destroy() {\r\n        user.destroy();\r\n        document.destroy();\r\n        window.destroy();\r\n    }\r\n}\r\n\r\nfunction addFn(target) {\r\n    return function add(value) {\r\n        removeFn(target)(value);\r\n        if (typeof value === 'string') {\r\n            target.addEventListener(value, onEvent);\r\n            return;\r\n        }\r\n        if (Array.isArray(value)) {\r\n            value.array.forEach(name => {\r\n                target.addEventListener(name, onEvent);\r\n            });\r\n        }\r\n    }\r\n}\r\n\r\nfunction removeFn(target) {\r\n    return function remove(value) {\r\n        if (typeof value === 'string') {\r\n            target.removeEventListener(value, onEvent);\r\n            return;\r\n        }\r\n        if (Array.isArray(value)) {\r\n            value.array.forEach(name => {\r\n                target.removeEventListener(name, onEvent);\r\n            });\r\n            return;\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./event/events.js?");

/***/ }),

/***/ "./event/user.js":
/*!***********************!*\
  !*** ./event/user.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nconst {\r\n  getId,\r\n  compare\r\n} = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\nconst defaultEvents = ['click', 'change', 'input'];\r\n\r\nfunction create(repository, renderer, doc, add, remove, events = defaultEvents) {\r\n  events.forEach(name => doc.addEventListener(name, onEvent));\r\n\r\n  return {\r\n    add,\r\n    remove,\r\n    destroy,\r\n    _: {\r\n      onEvent\r\n    }\r\n  }\r\n\r\n  function onEvent(e) {\r\n    const id = getId(e);\r\n    if (id == null) {\r\n      return;\r\n    }\r\n\r\n    e.preventDefault();\r\n    e.stopImmediatePropagation();\r\n\r\n    const {\r\n      views,\r\n      models,\r\n      components\r\n    } = repository;\r\n\r\n    const view = views.get(id);\r\n    let component = components.get(view.component);\r\n\r\n    let model = models.get(view.mKey);\r\n    let viewModel = models.get(view.vmKey);\r\n\r\n    const context = { e, view, viewModel, model, doc };\r\n    const value = component.onUserEvent(context);\r\n\r\n    if (!compare(model.value, value) && value !== undefined) {\r\n      model = models.set(model.key, value);\r\n    }\r\n\r\n    if (view.request) {\r\n      let formData = {};\r\n      if (view.request.formKey) {\r\n        formData = repository.models.getFormData(view.request.formKey);\r\n      }\r\n\r\n      const data = {\r\n        ...view.request,\r\n        ...{\r\n          formData\r\n        }\r\n      }\r\n      view.core.request(data);\r\n    }\r\n\r\n    renderer.refresh({\r\n      models: [model]\r\n    }, e);\r\n  }\r\n\r\n  function destroy() {\r\n    events.forEach(name => doc.removeListener(name, onEvent));\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://BeelineJS/./event/user.js?");

/***/ }),

/***/ "./event/window.js":
/*!*************************!*\
  !*** ./event/window.js ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = {\r\n    create\r\n}\r\nconst defaultEvents = ['resize'];\r\n\r\nfunction create(renderer, win, add, remove, events = defaultEvents) {\r\n\r\n    events.forEach(name => win.addEventListener(name, onEvent));\r\n\r\n    return {\r\n        add,\r\n        remove,\r\n        destroy,\r\n        _: {\r\n            onEvent\r\n        }\r\n    }\r\n\r\n    function onEvent(e) {\r\n        renderer.refresh(e);\r\n    }\r\n\r\n    function destroy() {\r\n        events.forEach(name => win.removeListener(name, onWindowEvent));\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./event/window.js?");

/***/ }),

/***/ "./render/layout.js":
/*!**************************!*\
  !*** ./render/layout.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    insert\r\n}\r\n\r\nconst {\r\n    htmlToElement,\r\n} = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\nfunction insert(data, repository, doc) {\r\n    data.layouts.forEach(layout => {\r\n        const layoutHtml = repository.layouts.get(layout.name);\r\n        const element = htmlToElement(layoutHtml, doc);\r\n        const parentElement = doc.querySelector(layout.parentPath);\r\n        if (parentElement == null) {\r\n            console.log(`${view.parentPath} is missing`)\r\n            return;\r\n        }\r\n        parentElement.innerHTML = '';\r\n        parentElement.appendChild(element);\r\n    })\r\n\r\n    return data;\r\n}\n\n//# sourceURL=webpack://BeelineJS/./render/layout.js?");

/***/ }),

/***/ "./render/renderer.js":
/*!****************************!*\
  !*** ./render/renderer.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  create\r\n}\r\n\r\nfunction create(repository, doc, win) {\r\n  const {\r\n    Refresh\r\n  } = (__webpack_require__(/*! core.types */ \"./shared/types.js\").event.application);\r\n\r\n  const {\r\n    areIntersected,\r\n    distinct\r\n  } = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\n  const view = __webpack_require__(/*! ./view */ \"./render/view.js\");\r\n  const layout = __webpack_require__(/*! ./layout */ \"./render/layout.js\");\r\n\r\n  return {\r\n    update,\r\n    refresh\r\n  }\r\n\r\n  function update(data, eventType = {\r\n    type: Refresh\r\n  }) {\r\n    data = layout.insert(data, repository, doc);\r\n    data = view.insert(data, repository, doc, win);\r\n    refresh(data, eventType);\r\n\r\n    return data;\r\n  }\r\n\r\n  function refresh(data, e = {\r\n    type: Refresh\r\n  }) {\r\n\r\n    const modelKeys = data == null ?\r\n      repository.models.list()\r\n      .map(i => i.key) :\r\n      data.models == null ? [] :\r\n      data\r\n      .models\r\n      .filter(m => m.key != null)\r\n      .map(m => m.key);\r\n\r\n    const viewModelKeys = data == null || data.viewModels == null ? [] :\r\n      data\r\n      .viewModels\r\n      .filter(m => m.key != null)\r\n      .map(m => m.key);\r\n\r\n    const views = repository.views.list();\r\n    const modelViews = views.filter(view => modelKeys.includes(view.mKey));\r\n    const viewModelViews = views.filter(view => viewModelKeys.includes(view.vmKey));\r\n\r\n    const modelBindings = views.filter(view => areIntersected(modelKeys, view.bindings));\r\n\r\n    const viewList = distinct([...viewModelViews, ...modelBindings, ...modelViews]);\r\n    viewList.forEach(view => {\r\n      const component = repository.components.get(view.component);\r\n      const includeEvents = component.renderEvents == null ||\r\n        component.renderEvents.length === 0 ||\r\n        component.renderEvents.includes(e.type);\r\n\r\n      if (includeEvents) {\r\n        const viewModel = repository.viewModels.get(view.vmKey);\r\n        const model = repository.models.get(view.mKey);\r\n        const context = { e, view, viewModel, model, doc, win };\r\n        component.render(context);\r\n      }\r\n    })\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://BeelineJS/./render/renderer.js?");

/***/ }),

/***/ "./render/view.js":
/*!************************!*\
  !*** ./render/view.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n  insert\r\n}\r\nconst {\r\n  Create,\r\n  Init,\r\n} = (__webpack_require__(/*! core.types */ \"./shared/types.js\").event.application);\r\n\r\nconst {\r\n  htmlToElement,\r\n} = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\nfunction insert(data, repository, doc, win) {\r\n  data.views.forEach(view => {\r\n    const component = repository.components.get(view.component);\r\n    const viewModel = repository.viewModels.get(view.vmKey);\r\n    const model = repository.models.get(view.mKey);\r\n    const e = {\r\n      type: Create\r\n    };\r\n    const context = { e, view, viewModel, model, doc, win };\r\n    const html = component.create(context);\r\n    const element = htmlToElement(html, doc);\r\n    element.id = view.id;\r\n    element.classList.add(view.component);\r\n\r\n    //TODO: use fragments and insert once at the end of the loop \r\n    const parentElement = doc.querySelector(view.parentPath);\r\n    if (parentElement == null) {\r\n      console.log(`${view.parentPath} is missing`)\r\n      return;\r\n    }\r\n\r\n    parentElement.appendChild(element);\r\n    const initContext = {\r\n      e: {\r\n        type: Init\r\n      },\r\n      view,\r\n      viewModel,\r\n      model,\r\n      doc\r\n    }\r\n    component.init(initContext)\r\n\r\n    return data;\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://BeelineJS/./render/view.js?");

/***/ }),

/***/ "./repository/models.js":
/*!******************************!*\
  !*** ./repository/models.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    load,\r\n    get,\r\n    getFormData,\r\n    set,\r\n    list,\r\n    sanitize\r\n}\r\n\r\nconst {\r\n    clone,\r\n    areEqual\r\n} = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\nconst _models = {};\r\n\r\nfunction get(key) {\r\n    return clone(_models[key])\r\n}\r\n\r\nfunction getFormData(formKey) {\r\n    return Object.values(_models)\r\n        .filter(m => formKey === m.form)\r\n        .map(m => clone(m))\r\n        .reduce((acc, item) => {\r\n            acc[item.key] = item.value;\r\n            return acc;\r\n        }, {});\r\n}\r\n\r\nfunction set(key, value) {\r\n    var model = _models[key];\r\n    model.value = value\r\n    model.isDirty = model.value != model.dbValue;\r\n\r\n    return clone(_models[key]);\r\n}\r\n\r\n\r\nfunction list() {\r\n    return clone(Object.values(_models))\r\n}\r\n\r\nfunction load(data) {\r\n    data.models.forEach(m => {\r\n        var model = _models[m.key];\r\n        if (model == null) {\r\n            _models[m.key] = _create(m)\r\n            return;\r\n        }\r\n        model.value = m.value;\r\n        model.isDirty = !areEqual(model.value, m.value);\r\n    })\r\n\r\n    return data;\r\n}\r\n\r\nfunction _create(model) {\r\n    const m = clone(model);\r\n    return {\r\n        value: m.value,\r\n        dbValue: m.value,\r\n        form: m.form || null,\r\n        key: m.key,\r\n        isDirty: false\r\n    }\r\n}\r\n\r\nfunction sanitize(keys) {\r\n    const unusedModelKeys = list()\r\n        .filter(m => !keys.includes(m.key))\r\n        .map(m => m.key);\r\n\r\n    unusedModelKeys.forEach(key => delete _models[key]);\r\n}\n\n//# sourceURL=webpack://BeelineJS/./repository/models.js?");

/***/ }),

/***/ "./repository/observer.js":
/*!********************************!*\
  !*** ./repository/observer.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = {\r\n    create\r\n};\r\n\r\nfunction create() {\r\n    const _subscriptions = {};\r\n    const _viewSubscriptions = {};\r\n    const _subscriptionsById = {};\r\n    let _id = 1;\r\n\r\n    return {\r\n        notify,\r\n        subscribeFn,\r\n        unsubscribeFn,\r\n        destroy\r\n    };\r\n\r\n    function unsubscribeFn(viewId) {\r\n\r\n        return function unsubscribe(id) {\r\n            if (viewId) {\r\n                _viewSubscriptions[viewId].array.forEach(id => {\r\n                    _clear(id)\r\n                });\r\n                return;\r\n            }\r\n\r\n            _clear(id);\r\n        }\r\n    }\r\n\r\n    function _clear(id) {\r\n        var item = _subscriptionsById[id];\r\n        if (item == null) {\r\n            return;\r\n        }\r\n\r\n        delete _subscriptions[item.event][item.id];\r\n    }\r\n\r\n    function notify(event, data) {\r\n\r\n        if (_subscriptions[event] == null) {\r\n            return;\r\n        }\r\n\r\n        for (var id in _subscriptions[event]) {\r\n            _subscriptions[event][id](data);\r\n        };\r\n    }\r\n\r\n    function subscribeFn(viewId) {\r\n\r\n        return function subscribe(event, callback) {\r\n            if (_subscriptions[event] == null) {\r\n                _subscriptions[event] = {};\r\n            }\r\n\r\n            _subscriptions[event][_id] = callback;\r\n            _subscriptionsById[_id] = {\r\n                event: event,\r\n                id: _id,\r\n                viewId: viewId\r\n            };\r\n\r\n            if (_viewSubscriptions[viewId] == null) {\r\n                _viewSubscriptions[viewId] = [];\r\n            }\r\n\r\n            _viewSubscriptions[viewId].push(_id);\r\n\r\n            return _id++;\r\n        }\r\n    }\r\n\r\n    function destroy() {\r\n        util.sanitize(_subscriptions);\r\n        util.sanitize(_viewSubscriptions);\r\n        util.sanitize(_subscriptionsById);\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./repository/observer.js?");

/***/ }),

/***/ "./repository/repository.js":
/*!**********************************!*\
  !*** ./repository/repository.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    create\r\n}\r\n\r\nfunction create(components, layouts, request, doc) {\r\n    const viewModels = __webpack_require__(/*! ./viewModels */ \"./repository/viewModels.js\");\r\n    const models = __webpack_require__(/*! ./models */ \"./repository/models.js\");\r\n    const views = (__webpack_require__(/*! ./views */ \"./repository/views.js\").create)(request, viewModels.get, doc);\r\n\r\n    return {\r\n        load,\r\n        sanitize,\r\n        components,\r\n        viewModels,\r\n        models,\r\n        views,\r\n        layouts,\r\n        destroy\r\n    }\r\n\r\n    function load(data) {\r\n        data = viewModels.load(data);\r\n        data = models.load(data);\r\n        data = views.load(data);\r\n\r\n        return data;\r\n    }\r\n\r\n    function sanitize() {\r\n        views.sanitize();\r\n\r\n        const modelKeys = views\r\n            .list()\r\n            .map(v => v.mKey);\r\n\r\n        models.sanitize(modelKeys);\r\n\r\n        const viewModelKeys = views\r\n            .list()\r\n            .map(v => v.vmKey);\r\n\r\n        viewModels.sanitize(viewModelKeys);\r\n    }\r\n\r\n    function destroy() {\r\n        models.destroy();\r\n        viewModels.destroy();\r\n        views.destroy();\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./repository/repository.js?");

/***/ }),

/***/ "./repository/viewModels.js":
/*!**********************************!*\
  !*** ./repository/viewModels.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    load,\r\n    get,\r\n    list,\r\n    sanitize\r\n}\r\n\r\n\r\nconst {\r\n    clone\r\n} = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\n\r\nconst _viewModels = {};\r\n\r\nfunction get(key) {\r\n    return clone(_viewModels[key])\r\n}\r\n\r\nfunction load(data) {\r\n    data.viewModels.forEach(m => {\r\n        _viewModels[m.key] = m;\r\n    })\r\n\r\n    return data;\r\n}\r\n\r\nfunction list() {\r\n    return clone(Object.values(_viewModels))\r\n}\r\n\r\nfunction sanitize(keys) {\r\n    const unusedModelKeys = Object.values(_viewModels)\r\n        .filter(m => !keys.includes(m.key))\r\n        .map(m => m.key);\r\n\r\n    unusedModelKeys.forEach(key => delete _viewModels[key]);\r\n}\n\n//# sourceURL=webpack://BeelineJS/./repository/viewModels.js?");

/***/ }),

/***/ "./repository/views.js":
/*!*****************************!*\
  !*** ./repository/views.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = {\r\n    create\r\n}\r\n\r\nconst _util = __webpack_require__(/*! core.util */ \"./shared/util.js\");\r\nconst _observer = (__webpack_require__(/*! ./observer */ \"./repository/observer.js\").create)();\r\n\r\nfunction create(request, valueForKey, doc) {\r\n    const _views = {};\r\n    let _uid = 1;\r\n\r\n    return {\r\n        load,\r\n        list,\r\n        get,\r\n        forKey,\r\n        forBoundKey,\r\n        sanitize,\r\n        _: {\r\n            build\r\n        }\r\n    }\r\n\r\n    function build(data) {\r\n        const cData = _util.clone(data);\r\n\r\n        cData.views = cData.views.map(vw => {\r\n            const id = _hexId(_uid++);\r\n            const core = {\r\n                subscribe: _observer.subscribeFn(id),\r\n                notify: _observer.notify,\r\n                valueForKey,\r\n                request: request,\r\n                remove: removeFn(id)\r\n            }\r\n\r\n            const view = {\r\n                id,\r\n                bindings: vw.bindings || [],\r\n                dispatch: vw.dispatch || [],\r\n                requestEvents: vw.requestEvents || [],\r\n                model: vw.model || null,\r\n                core\r\n            }\r\n\r\n            const newView = {\r\n                ...vw,\r\n                ...view\r\n            };\r\n\r\n            Object.freeze(newView);\r\n\r\n            return newView;\r\n        })\r\n\r\n        return cData;\r\n    }\r\n\r\n    function load(data) {\r\n        data = build(data);\r\n        data.views.forEach(vw => {\r\n            _views[vw.id] = vw;\r\n        })\r\n\r\n        return data;\r\n    }\r\n\r\n    function list() {\r\n        return Object.values(_views)\r\n    }\r\n\r\n    function get(id) {\r\n        return _views[id]\r\n    }\r\n\r\n    function forKey(key) {\r\n        return Object.values(_views)\r\n            .filter(view => view.key === key);\r\n    }\r\n\r\n    function forBoundKey(key) {\r\n        return Object.values(_views)\r\n            .filter(view => view.bindings.length > 0)\r\n            .filter(view => view.bindings.includes(key));\r\n    }\r\n\r\n    function _hexId(id) {\r\n        return 'H' + Number(id).toString(16).toUpperCase();\r\n    }\r\n\r\n    function removeFn(id) {\r\n        return function remove() {\r\n            const el = doc.getElementById(id);\r\n            el.remove();\r\n        }\r\n    }\r\n\r\n    function sanitize() {\r\n\r\n        const unusedIds = list()\r\n            .filter(v => doc.getElementById(v.id) == null)\r\n            .map(v => v.id);\r\n\r\n        unusedIds.forEach(id => delete _views[id]);\r\n    }\r\n}\n\n//# sourceURL=webpack://BeelineJS/./repository/views.js?");

/***/ }),

/***/ "./shared/types.js":
/*!*************************!*\
  !*** ./shared/types.js ***!
  \*************************/
/***/ ((module) => {

eval("  const event = {\r\n      application: {\r\n          Create: 'create',\r\n          Init: 'init',\r\n          Refresh: 'refresh',\r\n          Update: 'update'\r\n      },\r\n\r\n  }\r\n  Object.freeze(event);\r\n\r\n  const request = {\r\n      types: {\r\n          Json: 'json',\r\n          Page: 'page',\r\n          File: 'file'\r\n      },\r\n      method: {\r\n          Post: 'post',\r\n          Get: 'get'\r\n      }\r\n  }\r\n  Object.freeze(request);\r\n\r\n\r\n  module.exports = {\r\n      event,\r\n      request\r\n  }\n\n//# sourceURL=webpack://BeelineJS/./shared/types.js?");

/***/ }),

/***/ "./shared/util.js":
/*!************************!*\
  !*** ./shared/util.js ***!
  \************************/
/***/ ((module) => {

eval("module.exports = {\r\n    clone,\r\n    compare,\r\n    areEqual,\r\n    htmlToElement,\r\n    pipe,\r\n    toArray,\r\n    distinct,\r\n    log,\r\n    intersection,\r\n    areIntersected,\r\n    getId\r\n}\r\n\r\nfunction clone(obj) {\r\n    if (obj == null) {\r\n        return null;\r\n    }\r\n    return JSON.parse(JSON.stringify(obj));\r\n}\r\n\r\nfunction compare(a, b) {\r\n    if (a == null && b == null) {\r\n        return true;\r\n    }\r\n\r\n    if (a == null || b == null) {\r\n        return false;\r\n    }\r\n\r\n    return JSON.stringify(a) === JSON.stringify(b);\r\n}\r\n\r\nfunction areEqual(a, b) {\r\n    switch (true) {\r\n        case a !== Object(a) || a != Object(a):\r\n            return a === b;\r\n        case a === b:\r\n            return true;\r\n        case aKeys.length !== bKeys.length:\r\n            return false;\r\n    }\r\n\r\n    const aKeys = Object.keys(a);\r\n    const bKeys = Object.keys(b);\r\n\r\n    aKeys.forEach(key => {\r\n        if (a[key] !== b[key]) {\r\n            if (typeof a[key] === 'object' && typeof b[key] === 'object') {\r\n                return !areEqual(a[key], b[key]);\r\n            }\r\n            return false;\r\n        }\r\n    })\r\n\r\n    return true;\r\n}\r\n\r\nfunction htmlToElement(html, doc) {\r\n    const div = doc.createElement('div');\r\n    div.innerHTML = html;\r\n\r\n    return div.firstChild;\r\n}\r\n\r\nfunction pipe(...fns) {\r\n    return function (value) {\r\n        fns.reduce((v, f) => {\r\n            return f(v)\r\n        }, value);\r\n    }\r\n}\r\n\r\nfunction log() {\r\n    if (console && console.log) {\r\n        [...arguments].forEach(value => {\r\n            console.log(value);\r\n        });\r\n    }\r\n}\r\n\r\nfunction toArray(obj) {\r\n    var copy = clone(obj)\r\n    return Object.values(copy);\r\n}\r\n\r\nfunction areIntersected(a, b) {\r\n    return intersection(a, b).length > 0;\r\n}\r\n\r\nfunction intersection(a, b) {\r\n    const setA = new Set(a);\r\n    return b.filter(value => setA.has(value));\r\n}\r\n\r\nfunction distinct(arr) {\r\n    return arr.filter((x, i, a) => a.indexOf(x) == i)\r\n}\r\n\r\nfunction getId(e) {\r\n    var el = e.srcElement || e.target;\r\n    while (el != null && (el.id == null || el.id.indexOf('H') < 0)) {\r\n        el = el.parentElement;\r\n    }\r\n    if (el == null) {\r\n        return null;\r\n    }\r\n    return el.id;\r\n}\n\n//# sourceURL=webpack://BeelineJS/./shared/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./beeline.js");
/******/ 	BeelineJS = __webpack_exports__;
/******/ 	
/******/ })()
;