import QueryProvider from './QueryProvider';
import RouteProvider from './RouteProvider';
import ThemeProvider from './ThemeProvider';

const Provider = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouteProvider />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Provider;
