// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/.jest/setEnvVars.ts"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
