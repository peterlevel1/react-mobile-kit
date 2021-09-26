import { cloneElement, createElement, useCallback, useEffect, useState } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import PropTypes from 'prop-types';
import document from 'global/document';
import { v4 as uuidv4 } from 'uuid';
import LayerGeneral from '../layer-general';
import './index.less';

const prefix = 'rbk-LayerController';
const LAYER_TYPE_COMPONENT = {
  general: LayerGeneral
};

function LayerController({ active, controller, ...restProps }) {
  const { layerType, insertLayer, removeLayer, createLayer } = controller;
  const component = LAYER_TYPE_COMPONENT[layerType];

  // the identifier for the layer node
  const [ id ] = useState(() => uuidv4());
  // the node as the slot for layers
  const [ layer, setLayer ] = useState(null);
  // the element rendered as a cache for rendering
  const [ element, setElement ] = useState(null);
  // whether the layer is mounted into the body
  const [ mounted, setMounted ] = useState(false);

  // insert the layer into the view which would be document.body usually
  const insert = useCallback(() => {
    if (mounted) {
      return;
    }
    insertLayer(layer);
    render(cloneElement(element, { active, remove, ...restProps }), layer);
    setMounted(true);
  }, [active, mounted, layer, element, restProps]);

  // remove the layer from the view which would be document.body usually
  const remove = useCallback(() => {
    if (!mounted) {
      return;
    }
    unmountComponentAtNode(layer);
    removeLayer(layer);
    setMounted(false);
  }, [layer, mounted]);

  useEffect(() => {
    // prepare for later usage
    setElement(createElement(component));
    // create a layer node as a slot
    setLayer(createLayer(id, prefix));
    // clear render results
    return remove;
  }, []);

  useEffect(() => {
    if (active) {
      insert();
      return;
    }

    if (!mounted) {
      return;
    }

    render(cloneElement(element, { active, remove, ...restProps }), layer);
  }, [active, mounted, layer, element, restProps]);

  return null;
}

LayerController.propTypes = {
  active: PropTypes.bool,
  controller: PropTypes.shape({
    layerType: PropTypes.oneOf(['general']).isRequired,
    createLayer: PropTypes.func.isRequired,
    insertLayer: PropTypes.func.isRequired,
    removeLayer: PropTypes.func.isRequired,
  })
};

LayerController.defaultProps = {
  // the crucial prop to control layers
  active: false,

  // if ssr, as there is no document, so rbk provide a way for rendering
  controller: {
    layerType: 'general',

    /**
     * @param {String} id
     * @param {String} prefix
     * @returns {HTMLDivElement}
     */
    createLayer(id, prefix) {
      const layer = document.createElement('div');
      layer.setAttribute('id', id);
      layer.classList.add(prefix);
      return layer;
    },

    /**
     * @param {HTMLDivElement} layer
     */
    insertLayer(layer) {
      document.body.appendChild(layer);
    },

    /**
     * @param {HTMLDivElement} layer
     */
    removeLayer(layer) {
      if (typeof layer?.parentNode?.removeChild !== 'function') {
        return;
      }
      layer.parentNode.removeChild(layer);
    }
  }
};

export default LayerController;
