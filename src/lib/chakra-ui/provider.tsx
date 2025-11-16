"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// import {
//   ColorModeProvider,
//   type ColorModeProviderProps,
// } from "@/lib/chakra-ui/components/ui/color-mode";

type Props = {
  children: React.ReactNode;
};

export function Provider(props: Props) {
  const { children } = props;
  return (
    <ChakraProvider value={defaultSystem}>
      {children}
      {/* <ColorModeProvider {...props} /> */}
    </ChakraProvider>
  );
}
