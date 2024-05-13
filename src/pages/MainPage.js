import React, { useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import { getPokemonDataList, getPokemonSpeciesList } from '../api/pokemonService';
import pokemonInitConfig from '../config/pokemon-init.json';
import PokemonComponent from '../components/PokemonComponent';
import pokemonTypes from '../assets/pokemon-type.json';

const MainPage = () => {
  const [search, setSearch] = React.useState('');
  const [pokemonData, setPokemonData] = React.useState([]);
  const [renderedPokemonNumber, setRenderedPokemonNumber] = React.useState(0);
  let inited = false;
  const getPokemonUrlListInit = async () => {
    setRenderedPokemonNumber(0);
    setPokemonData([]);
    const pokemonSpeciesList = await getPokemonSpeciesList(
      pokemonInitConfig.pokemonInitStart,
      pokemonInitConfig.pokemonInitEnd,
    );
    const pokemonDataList = await getPokemonDataList(
      pokemonInitConfig.pokemonInitStart,
      pokemonInitConfig.pokemonInitEnd,
    );
    const urlList = pokemonDataList.map((object, index) => {
      return {
        name: object.name,
        speciesUrl: pokemonSpeciesList[index].url,
        dataUrl: pokemonDataList[index].url,
      };
    });
    setPokemonData(urlList);
    setRenderedPokemonNumber(pokemonInitConfig.pokemonInitEnd);
    inited = true;
  };

  const morePokemon = async () => {
    const pokemonSpeciesList = await getPokemonSpeciesList(renderedPokemonNumber + 1, pokemonInitConfig.perPage);
    const pokemonDataList = await getPokemonDataList(renderedPokemonNumber + 1, pokemonInitConfig.perPage);
    const urlList = pokemonDataList.map((object, index) => {
      return {
        name: object.name,
        speciesUrl: pokemonSpeciesList[index].url,
        dataUrl: pokemonDataList[index].url,
      };
    });
    setPokemonData([...pokemonData, ...urlList]);
    setRenderedPokemonNumber(renderedPokemonNumber + pokemonInitConfig.perPage);
  };

  useEffect(() => {
    if (!inited) {
      getPokemonUrlListInit();
    }
  }, []);

  const onSearchingHandler = (name) => {
    if (name === '') {
      getPokemonUrlListInit();
    } else {
      setPokemonData([]);
      const filteredPokemonData = pokemonData.filter((data) => {
        return data.name.toString().includes(name);
      });
      setPokemonData(filteredPokemonData);
      console.log(pokemonData);
    }
  };

  useEffect(() => {
    onSearchingHandler(search);
  }, [search]);

  return (
    <div className="block">
      <main className="flex justify-center">
        <SearchInput search={search} setSearch={setSearch} />
      </main>
      <div className="flex justify-center m-5">
        <div className="grid grid-cols-5 gap-4 p-4">
          {pokemonData.map((data) => {
            return <PokemonComponent urls={data} typeData={pokemonTypes.pokemonTypes} />;
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => morePokemon()}
          type="button"
          className="p-4 mb-4 text-xl font-semibold text-white rounded-full w-80 bg-sky-800"
        >
          More Pokemons! Pika!
        </button>
      </div>
    </div>
  );
};

export default MainPage;
