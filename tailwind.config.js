import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#393E46',
        tertiary: '#00ADB5',
        quaternary: '#EEEEEE',
        quinary: '#FFC100',
      },
    },
  },
  plugins: [daisyui],
}
