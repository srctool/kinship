import { GraphQLClient, RequestOptions } from 'graphql-request';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Mutation = {
  _empty?: Maybe<Scalars['String']['output']>;
  createPost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Post = {
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  _empty?: Maybe<Scalars['String']['output']>;
  getPost?: Maybe<Post>;
  getUser?: Maybe<User>;
};

export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPostQuery = { getPost?: { id: string; title: string; content: string } | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetUserQuery = { getUser?: { id: string; name: string } | null };

export const GetPostDocument = `
    query getPost($id: ID!) {
  getPost(id: $id) {
    id
    title
    content
  }
}
    `;
export const GetUserDocument = `
    query getUser($id: ID!) {
  getUser(id: $id) {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) =>
  action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getPost(
      variables: GetPostQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetPostQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPostQuery>(GetPostDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getPost',
        'query',
        variables
      );
    },
    getUser(
      variables: GetUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getUser',
        'query',
        variables
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
