const util = require('core.util');
const types = require('core.types');

module.exports = {
    create,
    types,
    util
}

function create(boot) {
  
    const {components, layouts, request, doc, win, log} = require('./repository/init')(boot,onLoad);
    const repository = require('./repository/repository')(components, layouts, request, doc, log);
    const renderer = require('./render/renderer')(repository, doc, win, log);
    const events = require('./event/events')(repository, renderer, boot.events, doc, win, log);

    const api = {
        onLoad,
        destroy,
        _: {
            events,
            renderer,
            repository
        }
    }

    return api;

    function onLoad(data) {
        data = {
            models: data.models || [],
            viewModels: data.viewModels || [],
            views: data.views || [],
            layouts: data.layouts || [],
            events: data.events || []
        }

        const {load, sanitize, save } = repository;
        const {update} = renderer;

        util.pipe(
           load,
           update,
           sanitize,
           save
        )(data);

        return api;
    }


    function destroy() {
        observer.destroy();
        repository.destroy();
        events.destroy();
    }
}