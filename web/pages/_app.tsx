/**
 * Entry point for the Next application. All components that
 * are rendered by Next are rendered through this file, taking
 * place of the <Component> tag in the return statement.
 */

import DarkModeToggle from '@/components/DarkModeToggle';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from 'next/app';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeToggle />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
