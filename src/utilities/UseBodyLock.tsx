import { useEffect, useRef } from 'react';

const useBodyLock = (locked: boolean) => {
  // Store the original overflow value in a ref
  const originalOverflow = useRef<string>('');
  useEffect(() => {
    if (locked) {
      originalOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = originalOverflow.current;
      }

    // Clean up the effect by restoring the original overflow on unmount
    return () => {
        document.body.style.overflow = originalOverflow.current;
    };
  }, [locked]);
};

export default useBodyLock;