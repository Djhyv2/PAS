module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'brace-style': [1, 'allman'], //Newline {
        yoda: [1, 'always'], //Literal on left of comparison
        'max-len': [0], //No max line length
        'react/jsx-indent': [1, 4],
        indent: [1, 4], //Use 4 spaces for a tab
        'spaced-comment': [1, 'never'], //Makes comments adjacent to // or /*
        'no-continue': [0], //Allows continue statements
        'react/jsx-indent-props': [0],//Fixes issue with conflicting indent rules
    },
};
