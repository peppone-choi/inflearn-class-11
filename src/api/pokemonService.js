import { pokemonInstance } from './axios';

export const findPokemonSpice = async (pokemonNumber) => {
  const {
    id, name, names, flavor_text_entries,
  } = (await pokemonInstance.get(`/pokemon-species/${pokemonNumber}`)).data;
  const koreanFlavorText = flavor_text_entries.find((langs) => langs.language.name === 'ko' && langs.version.name === 'x')?.flavor_text;
  const koreanName = names.find((langs) => langs.language.name === 'ko')?.name;
  const nameData = {
    id, name, koreanName, koreanFlavorText,
  };
  return nameData;
};

export const findPokemonByNumber = async (pokemonNumber) => {
  // id, pic, color, types, weight, height, officialArtwork, stats 등
  // TODO: 데이터 바인딩
  const data = await pokemonInstance.get(`/pokemon/${pokemonNumber}`);
  console.log(data);
  return data;
};
