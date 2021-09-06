module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          light: '#F15A60',
          DEFAULT: '#9D2235'
        },
        blue: {
          DEFAULT: '#57D3E3',
          dark: '#1C7BA3'
        },
        pink: '#FAF5F5',
        gray: {
          '1': '#333333',
          '2': '#4F4F4F',
          '3': '#828282',
          '4': '#BDBDBD',
          '5': '#E0E0E0',
          '6': '#F2F2F2'
        }
      },
      boxShadow: {
        sidebar: '15px 5px 20px rgba(157, 34, 53, 0.1)'
      },
      fontFamily: {
        sans:
          'Noto Sans TC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      fontSize: {
        sm: ['10px', '14px'],
        base: ['16px', '26px'],
        lg: ['21px', '34px'],
        xl: ['32px', '52px']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
