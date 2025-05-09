import { getSdk, GraphQLClient } from '@kinship/graphql-sdk';
import { useQuery } from '@tanstack/react-query';

const client = new GraphQLClient('https://koa-graphql.vercel.app/graphql');
const sdk = getSdk(client);

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => sdk.getUser({ id }),
  });
};

export const useGetPost = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => sdk.getPost({ id }),
  });
};
