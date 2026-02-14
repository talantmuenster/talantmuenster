// Hook for tracking user inactivity and auto-logout

'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseIdleTimerOptions {
  timeout: number; // timeout in milliseconds
  onIdle: () => void;
  enabled?: boolean;
}

/**
 * Hook to track user activity and trigger callback after inactivity
 * @param timeout - Time in milliseconds before considering user idle
 * @param onIdle - Callback to execute when user becomes idle
 * @param enabled - Whether the timer is enabled (default: true)
 */
export function useIdleTimer({ timeout, onIdle, enabled = true }: UseIdleTimerOptions) {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const onIdleRef = useRef(onIdle);

  // Keep onIdle callback up to date
  useEffect(() => {
    onIdleRef.current = onIdle;
  }, [onIdle]);

  const resetTimer = useCallback(() => {
    // Clear existing timer
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Set new timer
    if (enabled) {
      timeoutId.current = setTimeout(() => {
        onIdleRef.current();
      }, timeout);
    }
  }, [timeout, enabled]);

  useEffect(() => {
    if (!enabled) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
      return;
    }

    // Events to track user activity
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start initial timer
    resetTimer();

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [resetTimer, enabled]);
}
