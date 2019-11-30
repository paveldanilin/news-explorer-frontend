module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          edge: "15",
          firefox: "69",
          chrome: "78",
          safari: "11.1",
        },
        useBuiltIns: "usage",
        corejs: "3.4.5",
      },
    ],
  ],
};
