import {useEffect} from 'react';
import {AppState} from 'react-native';

export function useRetryAfterSettings(retryAction) {
  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active' && retryAction) {
        retryAction();
      }
    });

    return () => sub.remove();
  }, [retryAction]);
}
