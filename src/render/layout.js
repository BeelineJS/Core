module.exports = insert;

function insert(data, repository, doc) {
  data.layouts.forEach(layout => {
    const layoutHtml = repository.layouts(layout.name);
    const parentElement = doc.querySelector(layout.parentPath);
    if (parentElement == null) {
      console.log(`${view.parentPath} is missing`)
      return data;
    }
    parentElement.innerHTML = layoutHtml;
    parentElement.dataset.layout = layout.name;
    parentElement.dataset.path = layout.parentPath;
  })

  return data;
}
