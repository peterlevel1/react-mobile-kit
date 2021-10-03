import React, { useEffect } from 'react'
import { ErrorBlock } from '@react-mobile-kit/h5'

export default () => {
  useEffect(() => {
    document.body.style.background = '#ffffff'
  }, [])
  return <ErrorBlock fullPage />
}
