/*  ─────────────────────────────────────────────────────────
    useNavigationHistory.js
    ‣ Provides goBack / goForward helpers
    ‣ Exposes canGoBack / canGoForward booleans
    ‣ Works with React‑Router v6
    ‣ Exports BOTH named *and* default so you can import either way
   ───────────────────────────────────────────────────────── */

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useNavigationHistory() {
  const navigate = useNavigate();
  const location = useLocation();          // fires on every route change
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false); // browsers don’t expose this ☹️

  /* -------------------------------------------------------
     Update “canGoBack / canGoForward” whenever location changes
  -------------------------------------------------------- */
  useEffect(() => {
    // If the history stack length is > 1, we have something to go back to
    setCanGoBack(window.history.length > 1);

    /* Browsers do not give us forward‑stack length for security.
       If you later add your own custom history array, update here. */
    setCanGoForward(false);
  }, [location.key]);

  /* -------------------------------------------------------
     Helper functions for UI buttons & keyboard shortcuts
  -------------------------------------------------------- */
  const goBack = () => {
    if (canGoBack) navigate(-1);
  };

  const goForward = () => {
    if (canGoForward) navigate(1);
  };

  /* Alt + ← / Alt + → keyboard shortcuts */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.altKey) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoForward]);

  return { canGoBack, canGoForward, goBack, goForward };
}

/* Default export included so either import style works:
   import useNavigationHistory from '…';
   OR
   import { useNavigationHistory } from '…';
*/
export default useNavigationHistory;
