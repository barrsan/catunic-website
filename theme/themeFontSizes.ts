export function themeFontSizes() {
  return {
    'title-hero': [
      'clamp(2.75rem, 12.1vw - 0.9rem, 10rem)',
      {
        lineHeight: 'clamp(3.875rem, 16.9vw - 1.2rem, 14rem)',
      },
    ],
    'title-big': [
      'clamp(2.625rem, 10.2vw - 0.4rem, 8.75rem)',
      {
        lineHeight: 'clamp(3.125rem, 12.3vw - 0.6rem, 10.5rem)',
      },
    ],
    'title-1': [
      'clamp(2.25rem, 6.7vw + 0.3rem, 6.25rem)',
      {
        lineHeight: 'normal',
      },
    ],
    'title-2': [
      'clamp(2rem, 5vw + 0.5rem, 5rem)',
      {
        lineHeight: 'normal',
      },
    ],
    'title-3': [
      'clamp(1.75rem, 2.1vw + 1.1rem, 3rem)',
      {
        lineHeight: 'normal',
      },
    ],
    'title-4': [
      'clamp(1.5rem, 1.7vw + 1rem, 2.5rem)',
      {
        lineHeight: 'normal',
      },
    ],
    'title-5': [
      'clamp(1.25rem, 1.3vw + 0.9rem, 2rem)',
      {
        lineHeight: 'normal',
      },
    ],
    'title-6': [
      'clamp(1.05rem, 0.3vw + 1rem, 1.25rem)',
      {
        lineHeight: 'normal',
      },
    ],
    base: [
      '1rem',
      {
        lineHeight: '1.5rem',
      },
    ],
    'base-sm': [
      '0.75rem',
      {
        lineHeight: '1.5rem',
      },
    ],
    'base-lg': [
      '1.125rem',
      {
        lineHeight: '1.6875rem',
      },
    ],
    primary: [
      'clamp(1rem, 0.4vw + 0.9rem, 1.25rem)',
      {
        lineHeight: 'clamp(1.625rem, 0.6vw + 1.4rem, 2rem)',
      },
    ],
    'primary-lg': [
      'clamp(1.375rem, 0.4vw + 1.3rem, 1.625rem)',
      {
        lineHeight: 'clamp(2.25rem, 0.6vw + 2.1rem, 2.625rem)',
      },
    ],
    secondary: [
      'clamp(0.875rem, 0.2vw + 0.8rem, 1rem)',
      {
        lineHeight: 'clamp(1.3125rem, 0.5vw + 1.2rem, 1.625rem)',
      },
    ],
    'secondary-sm': [
      '0.875rem',
      {
        lineHeight: '1.3125rem',
      },
    ],
    'secondary-xs': [
      '0.75rem',
      {
        lineHeight: '1.25rem',
      },
    ],
    adaptive: '.625vw',
  };
}
