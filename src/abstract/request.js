module.exports = {
    create
}

const {
    Json,
    Page,
    File
} = require('core.types').request.types;

function create(onLoad, onError) {
    return {
        request
    }

    function request(params) {
        if (params.type == null) {

            return;
        }
        switch (params.type.toLowerCase()) {
            case Json:
                data(params)
                return;
            case Page:
                open(params);
                return;
            case File:
                download(params);
                return;
        }
    }

    function data(params) {
        onError('post not implemented', params);
    }

    function open(params) {
        onError('open not implemented', params);
    }

    function download(params) {
        onError('download not implemented', params);
    }
}