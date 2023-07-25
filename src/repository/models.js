module.exports = {
  load,
  get,
  getFormData,
  set,
  list,
  sanitize,
  destroy
}

const {
  clone,
  areEqual
} = require('core.util');

const _models = {};

function get(key) {
  return clone(_models[key])
}

function getFormData(formKey) {
  return Object.values(_models)
    .filter(m => formKey === m.form)
    .map(m => clone(m))
    .reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
}

function set(key, value) {
  var model = _models[key];
  model.value = value
  model.isDirty = model.value != model.dbValue;

  return clone(_models[key]);
}

function list() {
  return clone(Object.values(_models))
}

function load(data) {
  data.models.forEach(m => {
    var model = _models[m.key];
    if (model == null) {
      _models[m.key] = _create(m)
      return;
    }
    model.value = m.value;
    model.isDirty = !areEqual(model.value, m.value);
  })

  return data;
}

function _create(model) {
  const m = clone(model);
  return {
    value: m.value,
    dbValue: m.value,
    form: m.form || null,
    key: m.key,
    isDirty: false
  }
}

function sanitize(keys) {
  const unusedModelKeys = list()
    .filter(m => !keys.includes(m.key))
    .map(m => m.key);

  unusedModelKeys.forEach(key => delete _models[key]);
}

function destroy() {

}
