import { pokemonInstance } from './axios';

export const findPokemonSpice = async (pokemonNumber) => {
  try {
    const {
      id,
      name,
      names,
      flavor_text_entries: flavorTexts,
    } = (await pokemonInstance.get(`/pokemon-species/${pokemonNumber}`)).data;
    const koreanFlavorText = flavorTexts
      .find((langs) => langs.language.name === 'ko' && langs.version.name === 'y')
      ?.flavor_text.replaceAll('\n', ' ');
    const koreanName = names.find((langs) => langs.language.name === 'ko')?.name;
    const nameData = {
      id,
      name,
      koreanName,
      koreanFlavorText,
    };
    return nameData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const findPokemonByNumber = async (pokemonNumber) => {
  try {
    const { data } = await pokemonInstance.get(`/pokemon/${pokemonNumber}/`);
    const {
      id,
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
    const pokemonData = {
      id,
      abilityNames,
      image,
      height,
      bindedStats,
      types,
      weight,
    };
    return pokemonData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPokemonNameList = async (offset, limit) => {
  try {
    const { results } = (await pokemonInstance.get(`/pokemon-species/?offset=${offset - 1}&limit=${limit}`)).data;
    const promises = [];
    results.forEach((result) => {
      const number = result.url.split('/')[6];
      promises.push(findPokemonSpice(number));
    });
    const pokemonNameDataList = await Promise.all(promises);
    return pokemonNameDataList;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPokemonDataList = async (start, end) => {
  try {
    const promises = [];
    for (let i = start; i <= end; i += 1) {
      const data = findPokemonByNumber(i);
      promises.push(data);
    }
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
