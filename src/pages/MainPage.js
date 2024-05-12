import React, { useEffect } from 'react';
import SearchInput from '../components/SearchInput';
import { getPokemonDataList, getPokemonNameList } from '../api/pokemonService';
import pokemonInitConfig from '../config/pokemon-init.json';
import PokemonComponent from '../components/PokemonComponent';

const MainPage = () => {
  const [search, setSearch] = React.useState('');
  const [pokemonData, setPokemonData] = React.useState([]);
  const [pokemonNameData, setPokemonNameData] = React.useState([]);
  const getPokemonNameListInit = async () => {
    const pokemonNameList = await getPokemonNameList(
      pokemonInitConfig.pokemonInitStart,
      pokemonInitConfig.pokemonInitEnd,
    );
    setPokemonNameData(pokemonNameList);
  };

  const getPokemonDataListInit = async () => {
    const pokemonDataList = await getPokemonDataList(
      pokemonInitConfig.pokemonInitStart,
      pokemonInitConfig.pokemonInitEnd,
    );
    setPokemonData(pokemonDataList);
  };

  useEffect(() => {
    getPokemonNameListInit();
    getPokemonDataListInit();
  }, []);

  return (
    <div className="block">
      <main className="flex justify-center">
        <SearchInput search={search} setSearch={setSearch} />
      </main>
      <div className="flex justify-center m-5">
        <div className="grid grid-cols-5 gap-4 p-4">
          {pokemonData.map((data) => {
            return (
              <PokemonComponent
                key={data.id}
                pokemonNameData={pokemonNameData.filter((nameData) => nameData.id === data.id)}
                pokemonData={data}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
