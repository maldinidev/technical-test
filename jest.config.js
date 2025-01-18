// export default {
//   transform: {
//     '^.+\\.vue$': '@vue/vue3-jest',
//     '^.+\\.js$': 'babel-jest',
//   },
//   moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
//   testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Archivos de prueba
//   collectCoverage: false, // Para recolectar métricas de cobertura
//   collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'], // Archivos a incluir en cobertura
//   testEnvironmentOptions: {
//     customExportConditions: [
//       "node",
//       "node-addons"
//     ]
//   },
// };

export default {
  testEnvironment: 'jsdom', // Simula un navegador
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Transforma archivos .vue
    '^.+\\.js$': 'babel-jest', // Transforma archivos .js con Babel
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx'], // Extensiones soportadas

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Archivos de prueba
  collectCoverage: false, // Para recolectar métricas de cobertura
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js'], // Archivos a incluir en cobertura
  testEnvironmentOptions: {
    customExportConditions: [
      "node",
      "node-addons"
    ]
  },
};
