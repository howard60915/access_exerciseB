module.exports = {
	clearMocks: true,
	testEnvironment: "node",
	testMatch: ["**/tests/?(*.)(spec|test).js?(x)"],
	setupFilesAfterEnv: ["<rootDir>/__mocks__/index.js"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
	coveragePathIgnorePatterns: ["/node_modules/"],
};
