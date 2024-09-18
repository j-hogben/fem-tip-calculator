/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    screens: {
      sm: '640px',
      tablet: '640px',
      md: '768px',
      'landscape-app': '840px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'hover-fine': { raw: '(hover: hover) and (pointer: fine)' },
    },
    extend: {
      screens: {},
      fontFamily: {
        SpaceMono: 'Space Mono',
      },
      fontSize: {
        13: '0.8125rem',
        32: '2rem',
      },
      letterSpacing: {
        resultMob: '-0.67px',
        result: '-1px',
      },
      colors: {
        page: '#C5E4E7',
        input: '#F3F9FA',
        label: '#5E7A7D',
        'custom-label': '#547878',
        'green-dark': '#00474B',
        'green-vivid': '#26C2AE',
        'green-pale': '#9FE8DF',
        person: '#7F9D9F',
        'error-text': '#E17457',
        'error-container': '#E17052',
      },
      maxWidth: {
        calculatorMob: '40rem',
        calculator: '57.5rem',
      },
      padding: {
        'input-x': '1rem',
        'input-y': '0.5rem',
      },
      boxShadow: {
        calculator: '0 32px 43px 0 rgba(76, 166, 175, 20.07%)',
      },
      borderRadius: {
        card: '1.5625rem',
        results: '0.9375rem',
        input: '0.3125rem',
      },
    },
  },
  plugins: [],
};
