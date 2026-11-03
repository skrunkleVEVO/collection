import { createContext, useContext } from 'react';

// Every tab stays mounted, so only the visible one may own the document's h1.
export const PageActive = createContext(true);

export function usePageHeading(as = 'h1') {
  return useContext(PageActive) || as !== 'h1' ? as : 'h2';
}
