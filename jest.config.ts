module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/test"],
  setupFilesAfterEnv: ["./src/lib/util.ts"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};
