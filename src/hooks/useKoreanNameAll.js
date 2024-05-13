import { useState } from 'react';
import { pokemonInstance } from '../api/axios';

function useKoreanNameAll() {
  const [koreanNameAll, setKoreanNameAll] = useState([]);
  const getKoreanNames = async () => {
    const response = await pokemonInstance.get('pokemon-species?limit=1500');
    const koreanNames = response.data.results.map(async (url) => {
      const { names } = (await pokemonInstance.get(url)).data;
      return names.find((name) => name.language.name === 'ko')?.name;
    });
    setKoreanNameAll(koreanNames);
  };
  useState(() => {
    getKoreanNames();
  }, []);
  return koreanNameAll;
}

export default useKoreanNameAll;
