module.exports = {
    create
}

function create(doc) {
    let _userEvents = {};
    let _documentEvents = {};
    let _windowEvents = {};

    return {
        user: {
            set: setUserEvents,
            add: addUserEvent,
            remove: removeUserEvent
        },
        document: {
            set: setDocumentEvents,
            add: addDocumentEvent,
            remove: removeDocumentEvent,
        },
        window: {
            set: setWindowEvents,
            add: addWindowEvent,
            remove: removeWindowEvent,
        },
        userEvents,
        documentEvents,
        windowEvents,
        serialize,
        destroy
    }

    function destroy() {
        _userEvents = null;
        _documentEvents = null;
        _windowEvents = null;
    }

    function userEvents() {
        return { ..._userEvents };
    }

    function documentEvents() {
        return { ..._documentEvents };
    }

    function windowEvents() {
        return { ..._windowEvents };
    }

    function addUserEvent(name, func) {
        _userEvents[name] = func;
    }

    function removeUserEvent(name) {
        delete _userEvents[name];
    }

    function setUserEvents(events) {
        _userEvents = { ...events };
    }

    function addDocumentEvent(name, func) {
        _documentEvents[name] = func;
    }

    function removeDocumentEvent(name) {
        delete _documentEvents[name];
    }

    function setDocumentEvents(events) {
        _documentEvents = { ...events };
    }

    function addWindowEvent(name, func) {
        _windowEvents[name] = func;
    }

    function removeWindowEvent(name) {
        delete _windowEvents[name];
    }

    function setWindowEvents(events) {
        _windowEvents = { ...events };
    }

    function serialize(e) {
        const arr = [e.type];
        if (e.target && e.target.dataset && e.target.dataset.key) {
            arr.push(e.target.dataset.key);
        }
        if (e.key != null) {
            arr.push(e.key);
        }
        return arr.join('/');
    }
}
