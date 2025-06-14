// craco.config.cjs
// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       // Allow imports without extensions
//       webpackConfig.resolve.extensions = [".js", ".jsx", ".json"];

//       // Prioritize ES modules from dependencies (like React)
//       webpackConfig.resolve.mainFields = ["module", "main"];
      
//       return webpackConfig;
//     },
//   },
// };


module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.mainFields = ["module", "main"];
      config.resolve.extensions = [".js", ".jsx", ".json"];
      return config;
    },
  },
};