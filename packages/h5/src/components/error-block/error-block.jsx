import React, { ReactNode } from 'react'
import classNames from 'classnames'
import { iconRecord } from './error'
import { withDefaultProps } from '../../utils/with-default-props'
import { withNativeProps } from '../../utils/native-props'
import { useConfig } from '../config-provider'

const classPrefix = `rmk-error-block`;

const defaultProps = {
  status: 'default',
};

export const ErrorBlock = withDefaultProps(defaultProps)(props => {
    const icon = iconRecord[props.status]
    const { locale } = useConfig()
    const contentPack = locale.ErrorBlock[props.status]
    const des =
      'description' in props ? props.description : contentPack.description
    const title = 'title' in props ? props.title : contentPack.title
    let imageNode = <img src={icon} />

    if (props.image) {
      if (typeof props.image === 'string') {
        imageNode = <img src={props.image} />
      } else {
        imageNode = props.image
      }
    }

    return withNativeProps(
      props,
      <div
        className={classNames(classPrefix, {
          [`${classPrefix}-full-page`]: props.fullPage,
        })}
      >
        <div className={`${classPrefix}-image`}>{imageNode}</div>
        <div className={`${classPrefix}-description`}>
          {title && (
            <div className={`${classPrefix}-description-title`}>{title}</div>
          )}
          {des && (
            <div className={`${classPrefix}-description-subtitle`}>{des}</div>
          )}
        </div>

        {props.children && (
          <div className={`${classPrefix}-content`}>{props.children}</div>
        )}
      </div>
    )
  }
)
