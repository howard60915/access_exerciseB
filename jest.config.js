module.exports = {
	clearMocks: true,
	testEnvironment: "node",
	testMatch: ["**/tests/?(*.)(spec|test).js?(x)"],
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
	coveragePathIgnorePatterns: ["/node_modules/"],
};
