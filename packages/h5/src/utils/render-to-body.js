import ReactDOM from 'react-dom';

export function renderToBody(element) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  function unmount() {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);
    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  ReactDOM.render(element, container);

  return unmount;
}
