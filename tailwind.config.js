/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/renderer/**/*.{js,jsx,ts,tsx}',
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
    ],
    darkMode: false,
    daisyui: {
        themes: ["winter"], // Use only the light theme
        fontFamily: {
            roboto: ["vazir", "shabnam", "sahel", "sans-serif"],
        },
    },
}