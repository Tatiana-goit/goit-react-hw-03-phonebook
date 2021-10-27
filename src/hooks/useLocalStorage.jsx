import { useState, useEffect} from 'react';

export default function useLocalStorage (key, initValue) {
    const [state, setState] = useState(
      () => JSON.parse(localStorage.getItem(key)) ?? initValue,
    );

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    return [state, setState];
  };