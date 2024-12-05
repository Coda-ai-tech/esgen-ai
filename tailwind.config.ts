import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#29c363',
        'primary-dark': '#007ba6',
        secondary: '#fee02f',
        error: '#ff3600',
      },
      screens: {
        xxs: '300px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        hd: '1440px',
        xxl: '1920px',
      },
      maxWidth: {
        content: '1340px',
        hd: '1440px',
        wrapper: '1920px',
      },
      padding: {
        'main-spacing-x-sm': 'var(--main-spacing-x-sm)',
        'main-spacing-x': 'var(--main-spacing-x)',
        'main-spacing-x-lg': 'calc(var(--main-spacing-x)*2)',
        'content-spacing-x-lg': 'calc(var(--main-spacing-x)*3)',
      },
      margin: {
        'main-spacing-x-sm': 'var(--main-spacing-x-sm)',
        'main-spacing-x': 'var(--main-spacing-x)',
        'main-spacing-x-lg': 'calc(var(--main-spacing-x)*2)',
      },
      zIndex: {
        headerWrap: '100',
        popupMask: '98',
        main: '91',
        footer: '90',
        navMobBtn: '90',
        navMobList: '88',
        navContainer: '88',
        headerLogo: '87',
        headerLogoMd: '90',
        progressBar: '97',
      },
    },
  },
  plugins: [],
} satisfies Config;
