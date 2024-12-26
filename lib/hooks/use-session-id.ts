'use client';

import { useEffect, useState } from 'react';

export function useSessionId() {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    let id = localStorage.getItem('anonymous_session_id');
    if (!id) {
      id = `anon_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      localStorage.setItem('anonymous_session_id', id);
    }
    setSessionId(id);
  }, []);

  return sessionId;
}