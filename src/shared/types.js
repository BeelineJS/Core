const event = {
    application: {
        Create: 'create',
        Init: 'init',
        Refresh: 'refresh',
        Update: 'update'
    },

}
Object.freeze(event);

const request = {
    types: {
        Json: 'json',
        Page: 'page',
        File: 'file'
    },
    method: {
        Post: 'post',
        Get: 'get'
    }
}
Object.freeze(request);


module.exports = {
    event,
    request
}