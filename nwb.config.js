var path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ACForms',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    aliases: {
      react: path.resolve('node_modules/react'),
      img: path.resolve('demo/src/images')
    }
  }
}
