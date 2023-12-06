module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{ts,tsx}",
        "./public/**/*.html",
    ],
    theme: {
        extend: {
            backgroundColor: {
                page: "#D9D9D9",
            },
            textColor: {
                uibGreen: "#00664F",
            },
        },
    },
    plugins: [],
};
