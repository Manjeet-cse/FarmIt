/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          container: '#2e7d32',
          fixedDim: '#88d982',
        },
        onPrimary: {
          DEFAULT: '#ffffff',
          container: '#cbffc2',
        },
        surface: {
          DEFAULT: '#F1F8F1',
          light: '#F1F8F1',
          containerLow: '#e5f9e2',
          container: '#dff3dc',
          containerHigh: '#daeed6',
          containerHighest: '#d4e8d1',
          containerLowest: '#ffffff',
          variant: '#d4e8d1',
        },
        onSurface: {
          DEFAULT: '#0f1f11',
          variant: '#40493d',
        },
        tertiary: {
          DEFAULT: '#F9A825',
          container: '#986200',
        },
        neutral: {
          dark: '#1B2B1C',
        },
        text: {
          muted: '#6B8F6E',
        },
        bg: {
          inner: '#FFFFFF',
        },
        error: '#D32F2F',
        border: {
          color: '#D0E8D0',
        },
        outline: {
          DEFAULT: '#707a6c',
          variant: '#bfcaba',
        }
      },
      fontFamily: {
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
        label: ['Be Vietnam Pro', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

