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
      img: path.resolve('demo/src/images')
    }
  }
}
