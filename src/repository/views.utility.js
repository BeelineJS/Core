module.exports = utility

function utility(id, doc) {
  return {
    encode,
    decode,
    textContent,
    show,
    el,
    find,
    findFirst,
    findLast,
    findNth,
    findAll
  }

  function encode(value) {
    const el = doc.createElement('div');
    el.textContent = value;
    return el.innerHTML;
  }

  function decode(value) {
    const el = doc.createElement('div');
    el.innerHTML = value;
    return el.textContent;
  }

  function textContent(path, value) {
    return el()
      .querySelector(path)
      .textContent = value;
  }

  function show(path, value) {
    const classList = el()
      .querySelector(path)
      .classList;

    if (value) {
      classList.remove('hidden');
      return;
    }

    classList.add('hidden')
  }

  function el() {
    return doc.querySelector(`[data-id="${id}"]`);
  }

  function find(path) {
    return findFirst(path);
  }

  function findFirst(path) {
    return el()
      .querySelector(path);
  }

  function findAll(path) {
    return [...el().querySelectorAll(path)];
  }

  function findLast(path) {
    const items = findAll(path);
    return items.length == 0
      ? null
      : items[items.length - 1];
  }

  function findNth(path, index) {
    const items = findAll(path);
    return items.length < index
      ? null
      : items[index];
  }
}