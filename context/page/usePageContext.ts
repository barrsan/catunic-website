import { useContext } from 'react';

import { PageContext } from './PageContext';

export const usePageContext = () => {
  const contextValue = useContext(PageContext);
  return contextValue;
};
