import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },

            // Échelle typographique remontée : le bas de l'échelle (xs/sm) servait de
            // texte courant sur tout le site et plafonnait à 12-14px, trop petit à lire.
            // Les grandes tailles (xl et au-dessus) gardent les valeurs Tailwind.
            fontSize: {
                xs: ['0.875rem', { lineHeight: '1.25rem' }],      // 12 → 14px
                sm: ['0.9688rem', { lineHeight: '1.45rem' }],     // 14 → 15.5px
                base: ['1.0625rem', { lineHeight: '1.7rem' }],    // 16 → 17px
                lg: ['1.1875rem', { lineHeight: '1.85rem' }],     // 18 → 19px
            },
        },
    },

    plugins: [forms],
};
