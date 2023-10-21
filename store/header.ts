import { create } from 'zustand';

export const enum HeaderTheme {
  DARK = 'dark',
  LIGHT = 'light',
}

type State = {
  headerTheme: HeaderTheme;
  setHeaderTheme: (headerTheme: HeaderTheme) => void;
};

export const useHeaderTheme = create<State>((set) => ({
  headerTheme: HeaderTheme.LIGHT,
  setHeaderTheme: (headerTheme) => {
    set({ headerTheme });
  },
}));
