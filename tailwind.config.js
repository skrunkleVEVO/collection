import plugin from 'tailwindcss/plugin';

const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ground: token('ground'),
        surface: token('surface'),
        ink: token('ink'),
        soft: token('soft'),
        accent: token('accent'),
      },
    },
  },
  plugins: [
    // hover-fine: only where hover is real, so touch screens never get stuck hover states.
    plugin(({ addVariant }) => {
      addVariant('hover-fine', '@media (hover: hover) and (pointer: fine) { &:hover }');
      addVariant('group-hover-fine', '@media (hover: hover) and (pointer: fine) { .group:hover & }');
    }),
  ],
};
