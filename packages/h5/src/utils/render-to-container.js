import { createPortal } from 'react-dom'
import { ReactElement } from 'react'
import { resolveContainer } from './get-container'

export function renderToContainer(getContainer, node) {
  if (getContainer) {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
  }

  return node;
}
