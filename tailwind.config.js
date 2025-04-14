/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/renderer/**/*.{js,jsx,ts,tsx}',
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            animation: {
                shake: 'shake 0.3s ease-in-out infinite',
              },
              keyframes: {
                shake: {
                  '0%': { transform: 'rotate(0deg)' },
                  '25%': { transform: 'rotate(5deg)' },
                  '50%': { transform: 'rotate(0deg)' },
                  '75%': { transform: 'rotate(-5deg)' },
                  '100%': { transform: 'rotate(0deg)' },
                }
              }
        },
    },
    plugins: [
        // require('flowbite/plugin'),
        require('daisyui'),
        require('tailwindcss-animated')
    ],
    darkMode: false,
    daisyui: {
        themes: ["light"], // Use only the light theme
        fontFamily: {
            roboto: ["vazir", "shabnam", "sahel", "sans-serif"],
        },
    },
}