export const themeBaseTypography = (theme: any) => ({
  ...theme('fontSize.primary')[1],
  color: theme('colors.ds.grey.900'),
  fontSize: theme('fontSize.primary')[0],

  'h1, h2, h3, h4, h5, h6': {
    marginTop: 'clamp(3rem, 2.2vw + 2.3rem, 5rem)',
    marginBottom: 'clamp(1.5rem, 1.1vw + 1.2rem, 2.5rem)',
    fontWeight: 700,
    lineHeight: 'normal',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  'p, ul, ol': {
    marginTop: 'clamp(1.5rem, 1.1vw + 1.2rem, 2.5rem)',
    marginBottom: 'clamp(1.5rem, 1.1vw + 1.2rem, 2.5rem)',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  'ul, ol': {
    paddingLeft: theme('spacing.6'),
  },
  h1: {
    fontSize: theme('fontSize.title-1.0'),
  },
  h2: {
    fontSize: theme('fontSize.title-2.0'),
  },
  h3: {
    fontSize: theme('fontSize.title-3.0'),
  },
  h4: {
    fontSize: theme('fontSize.title-4.0'),
  },
  h5: {
    fontSize: theme('fontSize.title-5.0'),
  },
  h6: {
    fontSize: theme('fontSize.title-6.0'),
  },
  ul: {
    listStyleType: 'disc',
  },
  li: {
    '&::marker': {
      color: theme('colors.ds.grey.900'),
    },
  },
  ol: {
    listStyleType: 'decimal',
  },
  a: {
    fontWeight: 400,
    fontStyle: 'normal',
    color: theme('colors.ds.orchid'),
    transition: 'color 0.3s ease',
    textDecoration: 'underline',
    '&:hover': {
      color: theme('colors.ds.grey.900'),
      transition: 'color 0.3s ease',
    },
  },
  blockquote: {
    position: 'relative',
    display: 'block',
    paddingTop: theme('spacing.4'),
    paddingBottom: theme('spacing.4'),
    paddingLeft: theme('spacing.5'),
    paddingRight: theme('spacing.5'),
    fontStyle: 'normal',
    fontWeight: 400,
    borderLeft: 'none',
    '&::before': {
      content: '"`"',
      position: 'absolute',
      display: 'block',
      top: 0,
      left: 0,
      width: theme('width.1'),
      height: theme('height.full'),
      backgroundColor: theme('colors.ds.grey.900'),
      borderRadius: theme('borderRadius.2xl'),
    },
    '& > footer': {
      paddingTop: theme('spacing.4'),
      fontSize: theme('fontSize.secondary.0'),
    },
    '& > footer > cite': {
      fontStyle: 'normal',
      color: theme('colors.ds.grey.700'),
    },
  },
});
