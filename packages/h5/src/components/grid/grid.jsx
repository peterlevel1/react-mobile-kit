import React from 'react'
import { withDefaultProps } from '../../utils/with-default-props';
import { withNativeProps } from '../../utils/native-props';

const classPrefix = `adm-grid`;
const defaultProps = {
  gap: 0,
};

export const Grid = withDefaultProps(defaultProps)(props => {
  let gapStyle;

  const { gap } = props;

  if (gap) {
    const [horizontalGap, verticalGap] = Array.isArray(gap) ? gap : [gap, gap];

    gapStyle = {
      ...gapStyle,
      '--vertical-gap':
        typeof verticalGap === 'number' ? `${verticalGap}px` : verticalGap,
      '--horizontal-gap':
        typeof horizontalGap === 'number'
          ? `${horizontalGap}px`
          : horizontalGap,
    }
  }

  return withNativeProps(
    props,
    <div
      className={classPrefix}
      style={{
        ...gapStyle,
        '--columns': props.columns,
      }}
    >
      {props.children}
    </div>
  );
});

export const GridItem = withDefaultProps({
  span: 1,
})(props => {
  const itemStyle = {
    '--item-span': props.span,
  };

  return withNativeProps(
    props,
    <div className={`${classPrefix}-item`} style={itemStyle}>
      {props.children}
    </div>
  );
});
