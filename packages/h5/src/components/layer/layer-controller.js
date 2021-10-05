import { createElement, cloneElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import document from 'global/document';

let controllerId = 0;
const prefix = 'rmk-LayerController';
const controllerMap = new Map();

export class LayerController {
  static getControllerById(id) {
    return controllerMap.get(id);
  }

  constructor({ id, component, className }) {
    this.id = id && typeof id === 'string' ? id : controllerId++;

    if (controllerMap.get(this.id)) {
      throw new Error(`LayerController: id:${this.id} is existed`);
    }

    controllerMap.set(this.id, this);

    this.component = component;
    this.layer = null;
    this.element = null;
    this.className = className;
    this.created = false;
    this.mounted = false;
    this.destroyed = false;
    this.sync = null;

    this.create();
  }

  create() {
    if (this.created) {
      return;
    }

    const layer = document.createElement('div');
    layer.setAttribute('id', `${prefix}-${this.id}`);
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
    if (this.destroyed) {
      return;
    }

    this.sync = null;

    if (this.mounted) {
      this.remove();
    }

    this.layer = null;
    this.component = null;
    this.element = null;
    this.created = false;
    this.mounted = false;

    controllerMap.set(this.id, null);
    this.destroyed = true;
  }

  render(props) {
    if (!this.mounted) {
      return;
    }

    render(cloneElement(this.element, { ...props, remove: this.remove }), this.layer);
  }
}
