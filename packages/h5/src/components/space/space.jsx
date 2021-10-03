import React from 'react';
import classNames from 'classnames';
import { withNativeProps } from '../../utils/native-props';
import { withDefaultProps } from '../../utils/with-default-props';

const classPrefix = `adm-space`;

export const Space = withDefaultProps({ direction: 'horizontal' })(props => {
    const { size, direction } = props;
    let sizeStyle = {};

    if (size) {
      const [horizontalSize, verticalSize] = Array.isArray(size)
        ? size
        : [size, size];

      sizeStyle = {
        '--vertical-size':
          typeof verticalSize === 'number' ? `${verticalSize}px` : verticalSize,
        '--horizontal-size':
          typeof horizontalSize === 'number'
            ? `${horizontalSize}px`
            : horizontalSize,
      };
    }

    return withNativeProps(
      props,
      <div
        className={classNames(classPrefix, {
          [`${classPrefix}-wrap`]: props.wrap,
          [`${classPrefix}-block`]: props.block,
          [`${classPrefix}-${direction}`]: true,
          [`${classPrefix}-align-${props.align}`]: !!props.align,
          [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
        })}
        style={sizeStyle}
      >
        {React.Children.map(props.children, child => {
          return (
            child !== null &&
            child !== undefined && (
              <div className={`${classPrefix}-item`}>{child}</div>
            )
          )
        })}
      </div>
    );
  }
)
