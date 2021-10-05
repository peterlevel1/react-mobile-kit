import { canUseDom } from './can-use-dom'

let tester = null;

if (canUseDom) {
  tester = document.createElement('div');
  tester.className = 'rmk-one-px-tester';
  document.body.appendChild(tester);
}

export function convertPx(px) {
  const ratio = tester?.getBoundingClientRect().height || 1;

  return px * ratio;
}
