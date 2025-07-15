import { useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useNavigationHistory = () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  useEffect(() => {
    // Check if we can go back based on navigation type and history
    setCanGoBack(navigationType !== 'REPLACE' && window.history.length > 1);
    
    // Forward navigation is limited in browsers for security reasons
    // We'll track this manually or disable it
    setCanGoForward(false);
  }, [navigationType]);

  const goBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      navigate(1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goBack();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          goForward();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoBack, canGoForward]);

  return {
    canGoBack,
    canGoForward,
    goBack,
    goForward
  };
};