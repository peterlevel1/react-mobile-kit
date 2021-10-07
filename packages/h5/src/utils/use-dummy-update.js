import { useCallback, useState } from 'react';

export function useDummyUpdate() {
  const [ , setN ] = useState(0);
  const update = useCallback(() => setN((n) => n + 1), []);

  return update;
}
