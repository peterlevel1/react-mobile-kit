import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LayerController from './layer-controller';
import LayerGeneral from '../layer-general';
import './index.less';

const prefix = 'rmk-Layer';

function Layer({ active, component, ...restProps }) {
  const [ , setTime ] = useState(0);
  const sync = useCallback(() => setTime((n) => (n + 1)), []);

  const [ controller ] = useState(() => new LayerController({
    component: component || LayerGeneral,
    className: prefix
  }));

  if (controller) {
    controller.sync = sync;
  }

  useEffect(() => {
    return () => {
      controller.destroy();
    };
  }, [controller]);

  useEffect(() => {
    if (!controller) {
      return;
    }

    if (active) {
      controller.insert({ active, ...restProps });
      return;
    }

    controller.render({ active, ...restProps });
  }, [active, controller, restProps]);

  return null;
}

Layer.propTypes = {
  active: PropTypes.bool,
  component: PropTypes.element,
};

Layer.defaultProps = {
  active: false,
  component: null,
};

export default Layer;
