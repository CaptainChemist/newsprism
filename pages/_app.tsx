import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../utils/apolloClient';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
