module.exports = {
  // preset: '',
  // 自定义转换形式，转换jsx、tsx文件
  transform: {
    '\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx'],
  modulePathIgnorePatterns: ['\/node_modules\/'],
  moduleDirectories: ['node_modules', 'src/tests'],
  // 在每个测试文件执行之前，运行一些代码以配置或设置测试框架。
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: {},
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/tests/mocks/style-mock.js',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
