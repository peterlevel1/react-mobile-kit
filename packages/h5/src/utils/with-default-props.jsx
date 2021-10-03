import assign from 'lodash/assign'
import assignWith from 'lodash/assignWith'
import isUndefined from 'lodash/isUndefined'

// TODO: deprecated
export function withDefaultProps(defaultProps) {
  return function(C) {
    C.defaultProps = defaultProps
    return C;
  }
}

export function mergeProps(defaultProps, props) {
  function customizer(objValue, srcValue) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }

  return assignWith(assign({}, defaultProps), props, customizer);
}
