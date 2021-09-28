import { createElement, cloneElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import document from 'global/document';
import { v4 as uuidv4 } from 'uuid';

class LayerController {
  constructor({ component, className }) {
    this.component = component;
    this.layer = null;
    this.element = null;
    this.id = uuidv4();
    this.className = className;
    this.created = false;
    this.mounted = false;
    this.sync = null;

    this.create();
  }

  create() {
    if (this.created) {
      return;
    }

    const layer = document.createElement('div');
    layer.setAttribute('id', this.id);
    layer.classList.add(this.className);

    this.layer = layer;
    this.element = createElement(this.component);
    this.created = true;
  }

  insert(props) {
    if (!this.created) {
      return;
    }

    if (this.mounted) {
      return;
    }

    document.body.appendChild(this.layer);
    this.mounted = true;

    this.render(props);

    if (this.sync) {
      this.sync();
    }
  }

  remove = () => {
    if (!this.mounted) {
      return;
    }

    const retUnmount = unmountComponentAtNode(this.layer);
    if (!retUnmount) {
      return;
    }

    const retRemoved = this.layer?.parentNode?.removeChild(this.layer);
    if (!retRemoved) {
      return;
    }

    this.mounted = false;

    if (this.sync) {
      this.sync();
    }
  }

  destroy() {
    this.sync = null;

    if (this.mounted) {
      this.remove();
    }

    this.layer = null;
    this.component = null;
    this.element = null;
    this.created = false;
    this.mounted = false;
  }

  render(props) {
    if (!this.mounted) {
      return;
    }

    render(cloneElement(this.element, { ...props, remove: this.remove }), this.layer);
  }
}

export default LayerController;
