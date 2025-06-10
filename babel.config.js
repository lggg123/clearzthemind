module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-transform-exports', 
      { transform: 'named' }
    ]
  ],
};