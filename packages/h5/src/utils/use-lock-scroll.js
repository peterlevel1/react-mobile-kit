import { useTouch } from './use-touch';
import { useEffect, RefObject } from 'react';
import { getScrollParent } from './get-scroll-parent';
import { supportsPassive } from './supports-passive';

let totalLockCount = 0;

const BODY_LOCK_CLASS = 'rmk-overflow-hidden';

// 移植自vant：https://github.com/youzan/vant/blob/HEAD/src/composables/use-lock-scroll.ts
export function useLockScroll(rootRef, shouldLock) {
  const touch = useTouch();

  const onTouchMove = (event) => {
    touch.move(event);

    const direction = touch.deltaY.current > 0 ? '10' : '01';

    const el = getScrollParent(
      event.target,
      rootRef.current
    );

    const { scrollHeight, offsetHeight, scrollTop } = el;
    let status = '11';

    if (scrollTop === 0) {
      status = offsetHeight >= scrollHeight ? '00' : '01';
    } else if (scrollTop + offsetHeight >= scrollHeight) {
      status = '10';
    }

    if (
      status !== '11' &&
      touch.isVertical() &&
      !(parseInt(status, 2) & parseInt(direction, 2))
    ) {
      if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault();
      }

      event.stopPropagation();
    }
  }

  const lock = () => {
    document.addEventListener('touchstart', touch.start);
    document.addEventListener(
      'touchmove',
      onTouchMove,
      supportsPassive ? { passive: false } : false
    );

    if (!totalLockCount) {
      document.body.classList.add(BODY_LOCK_CLASS);
    }

    totalLockCount++;
  }

  const unlock = () => {
    if (totalLockCount) {
      document.removeEventListener('touchstart', touch.start);
      document.removeEventListener('touchmove', onTouchMove);

      totalLockCount--;

      if (!totalLockCount) {
        document.body.classList.remove(BODY_LOCK_CLASS);
      }
    }
  }

  useEffect(() => {
    if (shouldLock) {
      lock();
      return () => {
        unlock();
      };
    }
  }, [shouldLock]);
}
