module.exports = create;

function create(repository, renderer, events = {}, doc, win) {
    const user = require('./user').create(repository, renderer, doc, addFn(doc), removeFn(doc), onEvent, events.user);
    const document = require('./document').create(repository, doc, addFn(doc), removeFn(doc), onEvent, events.document);
    const window = require('./window').create(repository, win, doc, addFn(win), removeFn(win), onEvent, events.window);

    return {
        user,
        document,
        window,
        destroy
    }

    function destroy() {
        user.destroy();
        document.destroy();
        window.destroy();
    }


    function addFn(target) {
        return function add(value) {
            removeFn(target)(value);
            if (typeof value === 'string') {
                target.addEventListener(value, onEvent);
                return;
            }
            if (Array.isArray(value)) {
                value.array.forEach(name => {
                    target.addEventListener(name, onEvent);
                });
            }
        }
    }

    function removeFn(target) {
        return function remove(value) {
            if (typeof value === 'string') {
                target.removeEventListener(value, onEvent);
                return;
            }
            if (Array.isArray(value)) {
                value.array.forEach(name => {
                    target.removeEventListener(name, onEvent);
                });
                return;
            }
        }
    }

    function onEvent(context, events) {
        const { e, util, view } = context;
        const event = util.serializeEvent(e);
        if (events == null ||
            Object.keys(events).length == 0 ||
            events[event] == null) return;

        const value = events[event](context);
        update(e, view, value);
        repository.save()
        notify(view);
    }

    function update(e, view, value) {

        const { models } = repository;
        const { compare } = require('../shared/util');

        model = models.get(view.mKey);

        const modified = value !== undefined && !compare(model.value, value);

        if (!modified) return;
        model = models.set(model.key, value);

        renderer.refresh({
            models: [model]
        }, e);
    }

    function notify(view) {
        if (!view.request) return;

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
}