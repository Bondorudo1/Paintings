import { useCallback, useRef } from 'react';

/**
 * Custom hook for creating a throttled callback function
 * @param callback The function to throttle
 * @param delay The minimum time between callback executions in ms
 * @returns A throttled version of the callback function
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastCall = useRef(0);
  const lastArgs = useRef<Parameters<T> | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeUntilNextCall = delay - (now - lastCall.current);
      
      lastArgs.current = args;
      
      const executeCallback = () => {
        lastCall.current = Date.now();
        if (lastArgs.current) {
          callback(...lastArgs.current);
        }
        timeoutRef.current = null;
      };
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (timeUntilNextCall <= 0) {
        executeCallback();
      } else {
        timeoutRef.current = setTimeout(executeCallback, timeUntilNextCall);
      }
    },
    [callback, delay]
  );
}