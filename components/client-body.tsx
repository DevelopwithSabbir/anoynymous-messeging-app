'use client';

import { useEffect, useState } from 'react';

export function ClientBody({ children, className }: { children: React.ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a simpler body without extra attributes
  return (
    <body className={className} suppressHydrationWarning>
      {children}
    </body>
  );
}