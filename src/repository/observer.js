module.exports = {
  create
};

function create() {
  const _subscriptions = {};
  const _viewSubscriptions = {};
  const _subscriptionsById = {};
  let _id = 1;

  return {
    notify,
    subscribeFn,
    unsubscribeFn,
    destroy
  };

  function unsubscribeFn(viewId) {

    return function unsubscribe(id) {
      if (viewId) {
        _viewSubscriptions[viewId].array.forEach(id => {
          _clear(id)
        });
        return;
      }

      _clear(id);
    }
  }

  function _clear(id) {
    var item = _subscriptionsById[id];
    if (item == null) {
      return;
    }

    delete _subscriptions[item.event][item.id];
  }

  function notify(event, data) {

    if (_subscriptions[event] == null) {
      return;
    }

    for (var id in _subscriptions[event]) {
      _subscriptions[event][id](data);
    };
  }

  function subscribeFn(viewId) {

    return function subscribe(event, callback) {
      if (_subscriptions[event] == null) {
        _subscriptions[event] = {};
      }

      _subscriptions[event][_id] = callback;
      _subscriptionsById[_id] = {
        event: event,
        id: _id,
        viewId: viewId
      };

      if (_viewSubscriptions[viewId] == null) {
        _viewSubscriptions[viewId] = [];
      }

      _viewSubscriptions[viewId].push(_id);

      return _id++;
    }
  }

  function destroy() {
    _subscriptions.clear();
    _viewSubscriptions.clear();
    _subscriptionsById.clear();
  }

}
