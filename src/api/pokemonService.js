import { pokemonInstance } from './axios';

export const getPokemonDataById = async (id) => {
  try {
    const { data } = await pokemonInstance.get(`/pokemon/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPokemonSpeciesById = async (id) => {
  try {
    const { data } = await pokemonInstance.get(`/pokemon-species/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const bindPokemonSpecies = (data) => {
  try {
    const { id, name, names, flavor_text_entries: flavorTexts } = data;
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

export const bindPokemonData = async (data) => {
  try {
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
    const urls = abilities.map((ability) => {
      return ability.ability.url;
    });
    const abilityKoreanNamesPromise = Promise.all(
      urls.map(async (url) => {
        const { names } = (await pokemonInstance.get(url)).data;
        return names.find((name) => name.language.name === 'ko')?.name;
      }),
    );
    const abilityKoreanNames = await abilityKoreanNamesPromise;
    const bindedStats = stats.map((stat) => {
      return {
        name: stat.stat.name,
        value: stat.base_stat,
      };
    });
    const pokemonData = {
      id,
      abilityKoreanNames,
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

export const getPokemonSpeciesList = async (start, limit) => {
  try {
    const { results } = (await pokemonInstance.get(`/pokemon-species/?offset=${start - 1}&limit=${limit}`)).data;
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPokemonDataList = async (start, end) => {
  try {
    const { results } = (await pokemonInstance.get(`/pokemon/?offset=${start - 1}&limit=${end}`)).data;
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
