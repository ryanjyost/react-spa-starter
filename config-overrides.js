/*
Gives react-app-rewired the ability to add custom webpack configurations
Learn more --> https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project
 */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
   fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
   }),
   addLessLoader({
      javascriptEnabled: true,
      // Override antd less variables here
      // https://ant.design/docs/react/customize-theme
      modifyVars: { '@primary-color': '#0bacd3' }
   })
);
