// components/SessionWatcher.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function SessionObserver({ interval = 600000 }: { interval?: number }) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/session-check");
      const data = await res.json();

      if (!data.valid) {
        console.log("masuk");
        window.location.href = "/auth/login";
      }
    };

    const id = setInterval(checkSession, interval);
    return () => clearInterval(id);
  }, [router, interval]);

  return null;
}
