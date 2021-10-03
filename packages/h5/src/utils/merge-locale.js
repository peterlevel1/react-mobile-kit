import { cloneDeep, merge } from 'lodash';

export function mergeLocale(base, patch) {
  return merge(cloneDeep(base), patch);
}
