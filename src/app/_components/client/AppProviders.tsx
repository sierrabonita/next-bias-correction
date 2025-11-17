"use client";

import { Provider as ChakraProvider } from "@/lib/chakra-ui/provider";
import { Provider as JotaiProvider } from "@/lib/jotai/provider";
import { Provider as QueryClientProvider } from "@/lib/react-query/provider";

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChakraProvider>
      <QueryClientProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
