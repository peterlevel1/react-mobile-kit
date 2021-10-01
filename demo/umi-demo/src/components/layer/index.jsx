import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LayerController from './layer-controller';
import LayerGeneral from '../layer-general';

const prefix = 'rmk-Layer';

function Layer({ controllerId, active, component, ...restProps }) {
  const [ , update ] = useState(0);
  const sync = useCallback(() => update((n) => (n + 1)), []);

  const [ controller ] = useState(() => new LayerController({
    id: controllerId,
    component: component || LayerGeneral,
    className: prefix
  }));
  controller.sync = sync;

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
  controllerId: PropTypes.string,
  active: PropTypes.bool,
  component: PropTypes.element,
};

Layer.defaultProps = {
  controllerId: '',
  active: false,
  component: null,
};

export default Layer;

