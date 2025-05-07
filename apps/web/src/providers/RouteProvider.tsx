import { RouterProvider as Component, createRouter } from '@tanstack/react-router';
// Import the generated route tree
import { routeTree } from '../routeTree.gen';

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouteProvider = () => {
  return <Component router={router} />;
};

export default RouteProvider;
