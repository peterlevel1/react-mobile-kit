import { useCallback, useRef } from 'react'
import { useUpdate } from 'ahooks';

export function useNewControllableValue(options) {
  const { value, defaultValue, onChange } = options;

  const update = useUpdate();

  const stateRef = useRef<T>(value !== undefined ? value : defaultValue);

  if (value !== undefined) {
    stateRef.current = value
  }

  const setState = useCallback(
    (v) => {
      if (value === undefined) {
        stateRef.current = v;
        update();
      }

      onChange?.(v);
    },
    [value, update, onChange]
  );

  return [stateRef.current, setState];
}
