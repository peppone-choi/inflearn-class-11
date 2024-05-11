import { pokemonInstance } from './axios';

export const getPokemonNameList = async (offset, limit) => {
  const { results } = (await pokemonInstance.get(`/pokemon-species/?offset=${offset}&limit=${limit}`)).data;
  let pokemonNameDatas = [];
  for (const result of results) {
    const number = result.url.split('/')[6];
    const data = await findPokemonSpice(number);
    pokemonNameDatas.push(data);
  }
  return pokemonNameDatas;
};

export const findPokemonSpice = async (pokemonNumber) => {
  const {
    id,
    name,
    names,
    flavor_text_entries,
    color: { name: colorName },
  } = (await pokemonInstance.get(`/pokemon-species/${pokemonNumber}`)).data;
  const koreanFlavorText = flavor_text_entries
    .find((langs) => langs.language.name === 'ko' && langs.version.name === 'y')
    ?.flavor_text.replaceAll('\n', ' ');
  const koreanName = names.find((langs) => langs.language.name === 'ko')?.name;
  const nameData = {
    id,
    name,
    koreanName,
    koreanFlavorText,
    colorName,
  };
  return nameData;
};

export const findPokemonByNumber = async (pokemonNumber) => {
  const { data } = await pokemonInstance.get(`/pokemon/${pokemonNumber}/`);
  const {
    abilities,
    height,
    sprites: {
      other: {
        dream_world: { front_default: image },
      },
    },
    stats,
    types,
    weight,
  } = data;
  const abilityNames = abilities.map((ability) => ability.ability.name);
  const bindedStats = stats.map((stat) => {
    return {
      name: stat.stat.name,
      value: stat.base_stat,
    };
  });
  const bindedTypes = types.map((type) => type.type.name);
  const pokemonData = {
    abilityNames,
    image,
    height,
    bindedStats,
    bindedTypes,
    weight,
  };
  return pokemonData;
};
