module.exports = {
  load,
  get,
  list,
  sanitize,
  destroy
}

const {
  clone
} = require('../shared/util');

const _viewModels = {};

function get(key) {
  return clone(_viewModels[key])
}

function load(data) {
  data.viewModels.forEach(m => {
    _viewModels[m.key] = m;
  })

  return data;
}

function list() {
  return clone(Object.values(_viewModels))
}

function sanitize(keys) {
  const unusedModelKeys = Object.values(_viewModels)
    .filter(m => !keys.includes(m.key))
    .map(m => m.key);

  unusedModelKeys.forEach(key => delete _viewModels[key]);
}

function destroy() {

}