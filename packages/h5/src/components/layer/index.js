import './layer.less';
import { Layer } from './layer';
import { LayerController } from './layer-controller';
import { LayerGeneral } from './layer-general';
import { LayerMask } from './layer-mask';
import { LAYER_STATUS } from './constants';

Object.assign(Layer, {
  Controller: LayerController,
  General: LayerGeneral,
  Mask: LayerMask,
  STATUS: LAYER_STATUS
});

export default Layer;
