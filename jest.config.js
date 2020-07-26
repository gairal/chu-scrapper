module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['.d.ts'],
  errorOnDeprecated: true,
  logHeapUsage: true,
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    'Mocks(.*)$': '<rootDir>/test/__mocks__$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  testPathIgnorePatterns: ['./dist', './test'],
  verbose: false,
};
