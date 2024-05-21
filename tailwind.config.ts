import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.5rem',
              fontWeight: '700',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: 'white',
              margin: 0,
            },
            h2: {
              fontSize: '1.938rem',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: 'white',
              margin: 0,
            },
            h3: {
              fontSize: '1.563rem',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: 'white',
              margin: 0,
            },
            h4: {
              fontSize: '1.125rem',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: 'white',
              margin: 0,
            },
            p: {
              fontSize: '0.875rem',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: '#C1C1CD',
              margin: 0,
            },
            a: {
              fontSize: '0.875rem',
              fontStyle: 'normal',
              lineHeight: 'normal',
              color: '#C1C1CD',
              margin: 0,
            },
            strong: {
              fontSize: '0.875rem',
              fontStyle: 'normal',
              lineHeight: 'bold',
              color: '#C1C1CD',
              margin: 0,
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl'),
  ],
}

export default config
