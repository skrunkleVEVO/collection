import { useLayoutEffect, useRef, useState } from 'react';

// Scale that fits content of a fixed logical width into the element holding the ref.
export function useFitScale(logicalWidth) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      // A page hidden by the tabs measures 0; keep the last real size.
      if (entry.contentRect.width > 0) setWidth(entry.contentRect.width);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, width / logicalWidth];
}
