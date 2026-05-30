"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

// SessionProvider の子コンポーネントでないと useSession() が使えないため, SessionErrorWatcherとして切り出す
const SessionErrorWatcher = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/" });
    }
  }, [session]);

  return <>{children}</>;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SessionErrorWatcher>{children}</SessionErrorWatcher>
    </SessionProvider>
  );
};

export default AuthProvider;
