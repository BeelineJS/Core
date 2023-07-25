module.exports = {
  create
}

function create(id, doc) {
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
    findAll,
    serializeEvent
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

    if(value){
      classList.remove('hidden');
      return;
    }

    classList.add('hidden')
  }
   
  function el() {
     return doc.getElementById(id);
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
      : items[items.length-1];
  }

   function findNth(path, index) {
    const items = findAll(path);
    return items.length < index 
      ? null
      : items[index];
  }

  function serializeEvent(e){
    const arr = [e.type];
    if(e.target && e.target.dataset){
      arr.push(e.target.dataset.key);
    }
    if(e.key != null){
      arr.push(e.key);
    }
    return arr.join('/');
  }
}
