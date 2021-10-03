import { inBrowser } from './in-browser';

const overflowScrollReg = /scroll|auto/i
const defaultRoot = inBrowser ? window : undefined

function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;

  return (
    node.tagName !== 'HTML' &&
    node.tagName !== 'BODY' &&
    node.nodeType === ELEMENT_NODE_TYPE
  );
}

export function getScrollParent(el, root = defaultRoot) {
  let node = el

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowScrollReg.test(overflowY)) {
      return node;
    }

    node = node.parentNode;
  }

  return root;
}
