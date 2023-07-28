module.exports = create;

function create(components, layouts, request, doc, log) {
    const viewModels = require('./viewModels');
    const models = require('./models');
    const views = require('./views').create(request, viewModels.get, doc);

    return {
        load,
        sanitize,
        save,
        components,
        viewModels,
        models,
        views,
        layouts,
        destroy
    }

    function load(data) {
        data = viewModels.load(data);
        data = models.load(data);
        data = views.load(data);

        return data;
    }

    function sanitize() {
        views.sanitize();

        const modelKeys = views
            .list()
            .map(v => v.mKey);

        models.sanitize(modelKeys);

        const viewModelKeys = views
            .list()
            .map(v => v.vmKey);

        viewModels.sanitize(viewModelKeys);
    }

    function save() {
        var state = {
            //TODO set hierarchy for layout child/parent 
            layouts: [...doc.querySelectorAll('[data-layout][data-path]')]
                .map(el => {
                    return {
                        name: el.dataset.layout,
                        parentPath: el.dataset.path
                    }
                }),
            models: models.list().map(m => {
                return {
                    key: m.key,
                    value: m.value
                }
            }),
            viewModels: viewModels.list().map(vm => {
                return {
                    key: vm.key,
                    value: vm.value
                }
            }),
            views: views.list().map(v => {
                return {
                    mKey: v.mKey,
                    vmKey: v.vmKey,
                    component: v.component,
                    parentPath: v.parentPath,
                    requestEvents: v.parentPath,
                    bindings: v.bindings || [],
                    dispatch: v.dispatch || [],
                    requestEvents: v.requestEvents || [],
                }
            })
        }
        // limited to 10mb.
        localStorage.setItem('state', JSON.stringify(state));
    }

    function destroy() {
        models.destroy();
        viewModels.destroy();
        views.destroy();
    }
}