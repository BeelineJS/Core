module.exports = create;

function create(repository, renderer, events = {}, doc, win) {
    const user = require('./user').create(repository, renderer, doc, addFn(doc), removeFn(doc), events.user);
    const document = require('./document').create(repository, doc, addFn(doc), removeFn(doc), events.document);
    const window = require('./window').create(repository, win, doc, addFn(win), removeFn(win), events.window);

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