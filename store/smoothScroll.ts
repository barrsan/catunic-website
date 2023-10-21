import Lenis from '@studio-freight/lenis';
import { create } from 'zustand';

type StateItemMap<T> = {
  [key: string]: T;
};

type State = {
  smoothScrollInstance: StateItemMap<Lenis | null>;
  smoothScrollViewport: StateItemMap<HTMLElement | null>;
  smoothScrollContent: StateItemMap<HTMLElement | null>;
  setSmoothScrollInstance: (key: string, scroll: Lenis | null) => void;
  setSmoothScrollViewport: (key: string, viewport: HTMLElement | null) => void;
  setSmoothScrollContent: (key: string, content: HTMLElement | null) => void;
};

export const useSmoothScroll = create<State>((set) => ({
  smoothScrollInstance: {},
  smoothScrollViewport: {},
  smoothScrollContent: {},

  setSmoothScrollInstance(key, value) {
    set((state) => ({
      ...state,
      smoothScrollInstance: { ...state.smoothScrollInstance, [key]: value },
    }));
  },

  setSmoothScrollViewport(key, value) {
    set((state) => ({
      ...state,
      smoothScrollViewport: { ...state.smoothScrollViewport, [key]: value },
    }));
  },

  setSmoothScrollContent(key, value) {
    set((state) => ({
      ...state,
      smoothScrollContent: { ...state.smoothScrollContent, [key]: value },
    }));
  },
}));
