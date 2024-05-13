import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import { getPokemonDataById, getPokemonSpeciesById, bindPokemonData, bindPokemonSpecies } from '../api/pokemonService';

const BackgroundDiv = styled.div`
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tw`items-center justify-center w-1/3 p-4 mb-10 text-white shadow rounded-2xl`}
`;

const PokemonNameDiv = styled.div`
  color: ${(props) => props.color};
  background: white;
  text-align: center;
  ${tw`items-center justify-center w-48 p-1 mb-1 text-2xl font-bold shadow rounded-2xl`}
`;

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
    <div className="flex justify-center">
      <BackgroundDiv
        color={`#${type !== 'stellar' ? typeInfo?.hex.normal : `conic-gradient(#ceb344 8%, #d09949 8% 15%, #ce684c 15% 19%, #c9606e 19% 22%, #b975a9 22% 25%, #9f5b89 25% 28%, #694d94 28% 31%, #63537a 31% 35%, #596677 35% 42%, #5f708d 42% 50%, #4887be 50% 58%, #3d9cc4 58% 65%, #428dc4 65% 69%, #457cbb 69% 72%, #4095b9 72% 75%, #61b7c2 75% 78%, #56c267 78% 81%, #a5b65b 81% 85%, #aaaf80 85% 92%, #b69867 0);`}`}
        data-testid={`pokemon-card-${id}`}
      >
        <div className="flex justify-center mb-1">
          <img
            role="figure"
            className="size-96"
            key={`pokemon-${id}-${speciesData.koreanName}`}
            src={pokemonData.image}
            alt="포켓몬 이미지"
          />
        </div>
        <PokemonNameDiv
          color={`#${type !== 'stellar' ? typeInfo?.hex.dark : `conic-gradient(#ceb344 8%, #d09949 8% 15%, #ce684c 15% 19%, #c9606e 19% 22%, #b975a9 22% 25%, #9f5b89 25% 28%, #694d94 28% 31%, #63537a 31% 35%, #596677 35% 42%, #5f708d 42% 50%, #4887be 50% 58%, #3d9cc4 58% 65%, #428dc4 65% 69%, #457cbb 69% 72%, #4095b9 72% 75%, #61b7c2 75% 78%, #56c267 78% 81%, #a5b65b 81% 85%, #aaaf80 85% 92%, #b69867 0);}`}`}
          aria-labelledby="heading"
        >
          <h1>{speciesData.koreanName}</h1>
          <h2 className="text-sm">{speciesData.name}</h2>
        </PokemonNameDiv>
        <div>
          <div className="flex items-center justify-between">
            <p>{pokemonData.height}m</p>
            <p>{pokemonData.weight}kg</p>
            <div>
              {pokemonData.abilityKoreanNames?.map((ability) => (
                <div key={ability} className="text-center">
                  {ability}
                </div>
              ))}
            </div>
          </div>
          <div />
          <div>
            {pokemonData.bindedStats?.map((stat) => (
              <div key={stat.name} className="font-semibold text-center">{`${stat.name}: ${stat.value}`}</div>
            ))}
          </div>
          <div className="m-5">
            <p>{speciesData.koreanFlavorText}</p>
          </div>
        </div>
      </BackgroundDiv>
    </div>
  );
};

export default InfoPage;
