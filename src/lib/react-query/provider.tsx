"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function Provider(props: Props) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ColorModeProvider {...props} /> */}
    </QueryClientProvider>
  );
}
