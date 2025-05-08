import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/generated/schema.json',
  documents: ['src/graphql/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        skipTypename: true,
        dedupeFragments: true,
        preResolveTypes: true,
        // Generate raw strings instead of using graphql-tag
        documentMode: 'string',
      },
    },
  },
};

export default config;
