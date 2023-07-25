module.exports = {
  clone,
  compare,
  areEqual,
  htmlToElement,
  pipe,
  toArray,
  distinct,
  intersection,
  areIntersected,
  getId
}

function clone(obj) {
  if (obj == null) {
    return null;
  }
  return JSON.parse(JSON.stringify(obj));
}

function compare(a, b) {
  if (a == null && b == null) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  return JSON.stringify(a) === JSON.stringify(b);
}

function areEqual(a, b) {
  switch (true) {
    case a !== Object(a) || a != Object(a):
      return a === b;
    case a === b:
      return true;
    case aKeys.length !== bKeys.length:
      return false;
  }

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  aKeys.forEach(key => {
    if (a[key] !== b[key]) {
      if (typeof a[key] === 'object' && typeof b[key] === 'object') {
        return !areEqual(a[key], b[key]);
      }
      return false;
    }
  })

  return true;
}

function htmlToElement(html, doc) {
  const div = doc.createElement('div');
  div.innerHTML = html.trim();

  return div.firstChild;
}

function pipe(...fns) {
  return function(value) {
    fns.reduce((v, f) => {
      return f(v)
    }, value);
  }
}

function toArray(obj) {
  var copy = clone(obj)
  return Object.values(copy);
}

function areIntersected(a, b) {
  return intersection(a, b)
    .length > 0;
}

function intersection(a, b) {
  const setA = new Set(a);
  return b.filter(value => setA.has(value));
}

function distinct(arr) {
  return arr.filter((x, i, a) => a.indexOf(x) == i)
}

function getId(e) {
  var el = e.srcElement || e.target;
  while (el != null && (el.id == null || el.id.indexOf('H') < 0)) {
    el = el.parentElement;
  }
  if (el == null) {
    return null;
  }
  return el.id;
}
