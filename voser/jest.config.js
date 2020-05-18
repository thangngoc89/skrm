module.exports = {
  moduleDirectories: ["node_modules"],
  roots: ["test"],
  testMatch: ["**/*__test.bs.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(bs-platform|reason-test-framework|reason-react|re-classnames)/)",
  ],
};
