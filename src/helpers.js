function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}
function getElement(element, value) {
  return (document.getElementById(element).innerHTML = value);
}

export { createNode, append, getElement };
