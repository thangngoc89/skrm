declare module "*.css" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "preact-portal" {
  export default any;
}
