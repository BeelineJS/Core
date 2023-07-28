module.exports = init;

function init(boot, onLoad) {
    const log = boot.log || safeLog;
    const values = ['components', 'layouts', 'request'];
    values.forEach(value => {
        if (boot[value] == null) {
            log(`${value} is missing`);

        }
    });

    return {
        log,
        components: boot.components || _components,
        layouts: boot.layouts || _layouts,
        request: (boot.request || _request).create(onLoad).request,
        doc: boot.doc || document,
        win: boot.win || window
    }
}


const _components = {
    get() {
        return null;
    }
};

const _layouts = {
    get() {
        return null;
    }
};

const _request = {
    create() {
        return {
            request() {
                return null;
            }
        }
    }
}

function safeLog() {
    if (console && console.log) {
        [...arguments].forEach(value => {
            console.log(value);
        });
    }
}