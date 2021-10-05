import React from 'react'
import classNames from 'classnames'
import Loading from '../loading'
import { mergeProps } from '../../utils/with-default-props'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = `rmk-button`

const defaultProps = {
  color: 'default',
  fill: 'solid',
  block: false,
  loading: false,
  type: 'button',
}

export const Button = p => {
  const props = mergeProps(defaultProps, p)
  const disabled = props.disabled || props.loading
  return withNativeProps(
    props,
    <button
      type={props.type}
      onClick={props.onClick}
      className={classNames(
        classPrefix,
        props.color ? `${classPrefix}-${props.color}` : null,
        {
          [`${classPrefix}-block`]: props.block,
          [`${classPrefix}-disabled`]: disabled,
          [`${classPrefix}-fill-outline`]: props.fill === 'outline',
          [`${classPrefix}-fill-none`]: props.fill === 'none',
          [`${classPrefix}-mini`]: props.size === 'mini',
          [`${classPrefix}-small`]: props.size === 'small',
          [`${classPrefix}-large`]: props.size === 'large',
          [`${classPrefix}-loading`]: props.loading,
        }
      )}
      disabled={disabled}
    >
      {props.loading ? (
        <>
          <div className={`${classPrefix}-loading-wrapper`}>
            <Loading color='currentColor' />
            {props.loadingText}
          </div>
        </>
      ) : (
        props.children
      )}
    </button>
  )
}
