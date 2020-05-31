module.exports = {
  components: 'mui-primitives',
  outputPath: './playroom-out',
  title: 'Next Template',
  widths: [320, 600, 960, 1280, 1920],
  port: 9000,
  snippets: './playroom/snippets.tsx',
  frameComponent: './playroom/Frame.tsx',
  openBrowser: false,
  staticTypes: require('mui-primitives/static-types.json'),
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              require.resolve('@babel/plugin-proposal-export-default-from'),
            ],
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('next/babel'),
            ],
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
  }),
}
