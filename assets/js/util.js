
export function select(selector, scope=document) {
  return scope.querySelector(selector);
}

export function selectAll(selector, scope=document) {
  return [...scope.querySelectorAll(selector)];
}

export function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

export function create(element) {
  return document.createElement(element);
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep(length) {
  return new Promise(resolve => {
    setTimeout(resolve, length);
  });
}