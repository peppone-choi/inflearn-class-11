import React, { useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import { getPokemonDataList, getPokemonSpeciesList } from '../api/pokemonService';
import pokemonInitConfig from '../config/pokemon-init.json';
import PokemonComponent from '../components/PokemonComponent';

const MainPage = () => {
  const [search, setSearch] = React.useState('');
  const [pokemonData, setPokemonData] = React.useState([]);
  const getPokemonUrlListInit = async () => {
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
  };
  useEffect(() => {
    getPokemonUrlListInit();
  }, []);

  return (
    <div className="block">
      <main className="flex justify-center">
        <SearchInput search={search} setSearch={setSearch} />
      </main>
      <div className="flex justify-center m-5">
        <div className="grid grid-cols-5 gap-4 p-4">
          {pokemonData.map((data) => {
            return <PokemonComponent urls={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
