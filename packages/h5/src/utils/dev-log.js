import { isDev } from './is-dev'

export function devWarning(component, message) {
  if (isDev) {
    console.warn(`[antd-mobile: ${component}] ${message}`);
  }
}
