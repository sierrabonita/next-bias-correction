"use client";

import { Provider as JotaiProvider } from "jotai";

type Props = {
  children: React.ReactNode;
};

export function Provider(props: Props) {
  const { children } = props;

  return <JotaiProvider>{children}</JotaiProvider>;
}
