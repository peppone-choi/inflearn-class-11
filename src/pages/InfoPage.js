import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDataById, getPokemonSpeciesById, bindPokemonData, bindPokemonSpecies } from '../api/pokemonService';

const InfoPage = ({ typeData }) => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState([]);
  const [speciesData, setSpeciesData] = useState({});
  const type = pokemonData.types?.[0].type.name;
  const typeInfo = typeData.pokemonTypes.find((item) => item.type === type);
  useEffect(() => {
    async function petchPokemonData() {
      const boundPokemonSpecie = bindPokemonSpecies(await getPokemonSpeciesById(id));
      const boundPokemonData = await bindPokemonData(await getPokemonDataById(id));
      setSpeciesData(boundPokemonSpecie);
      setPokemonData(boundPokemonData);
    }
    petchPokemonData();
  }, [id]);
  return (
    <div className="flex-col">
      <div className="flex">
        <div>{pokemonData.id}</div>
        <div>{pokemonData.weight}Kg</div>
        <div>{pokemonData.height}M</div>
      </div>
      <div>{`${typeInfo?.name} 포켓몬`}</div>
      <div>{`${speciesData.koreanName} (${speciesData.name})`}</div>

      <div>
        {pokemonData.abilityKoreanNames?.map((ability) => (
          <div key={ability}>{ability}</div>
        ))}
      </div>
      <div>
        <img src={pokemonData.image} alt="" />
      </div>
      <div>
        {pokemonData.bindedStats?.map((stat) => (
          <div key={stat.name}>{`${stat.name}: ${stat.value}`}</div>
        ))}
      </div>
      <div>{speciesData.koreanFlavorText}</div>
    </div>
  );
};

export default InfoPage;
