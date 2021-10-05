import './layer.less';
import { Layer } from './layer';
import { LayerController } from './layer-controller';
import { LayerGeneral } from './layer-general';
import { LayerMask } from './layer-mask';
import { LAYER_STATUS } from './constants';

Layer.LayerController = LayerController;
Layer.LayerGeneral = LayerGeneral;
Layer.LayerMask = LayerMask;
Layer.LAYER_STATUS = LAYER_STATUS;

export default Object.freeze(Layer);
