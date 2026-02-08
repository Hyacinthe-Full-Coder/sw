declare module '@prisma/internals' {
  export function defineConfig<T = any>(config: T): T;
  const internals: { defineConfig: typeof defineConfig };
  export default internals;
}
