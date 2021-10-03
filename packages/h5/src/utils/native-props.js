import React from 'react';
import classNames from 'classnames';

export function withNativeProps(props, element) {
  const p = {
    ...element.props,
  };

  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }

  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }

  for (const key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }

    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }

  return React.cloneElement(element, p);
}
