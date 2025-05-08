import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://koa-graphql.vercel.app/graphql',
  generates: {
    'src/generated/schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
