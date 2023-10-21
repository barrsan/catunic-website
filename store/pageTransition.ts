import { create } from 'zustand';

import { StaticPageAlias } from '@/types';

type State = {
  isPageTransition: boolean;
  currentPageKey: StaticPageAlias | string;
  outboundPageKey: StaticPageAlias | string;
  setPageTransition: (status: boolean) => void;
  setCurrentPageKey: (key: StaticPageAlias | string) => void;
  setOutboundPageKey: (key: StaticPageAlias | string) => void;
};

export const usePageTransition = create<State>((set) => ({
  isPageTransition: false,
  currentPageKey: '',
  outboundPageKey: '',

  setPageTransition: (status: boolean) => {
    set({ isPageTransition: status });
  },

  setCurrentPageKey: (key: StaticPageAlias | string) => {
    set({ currentPageKey: key });
  },

  setOutboundPageKey: (key: StaticPageAlias | string) => {
    set({ outboundPageKey: key });
  },
}));
