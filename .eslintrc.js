module.exports = {
    'env': {
      'node': true
    },
    'extends': 'eslint:recommended',
    'rules': {
        'indent': [
          'error',
          2,
          { ObjectExpression: 'off' }
        ],
        'linebreak-style': [
          'error',
          'unix'
        ],
        'quotes': [
          'error',
          'single'
        ],
        'semi': [
          'error',
          'always'
        ],
        'no-unused-vars': [
          'error',
          { 'argsIgnorePattern': '^_' }
        ]
    }
};
