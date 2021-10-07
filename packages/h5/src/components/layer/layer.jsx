import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LayerController } from './layer-controller';
import { LayerGeneral } from './layer-general';
import { useDummyUpdate } from '../../utils/use-dummy-update';

const prefix = 'rmk-Layer';

export function Layer({ controllerId, active, component, ...restProps }) {
  const [ controller ] = useState(() => new LayerController({
    id: controllerId,
    component: component || LayerGeneral,
    className: prefix
  }));
  controller.sync = useDummyUpdate();

  useEffect(() => {
    if (!controller || controller.destroyed) {
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
