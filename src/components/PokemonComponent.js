import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { pokemonInstance } from '../api/axios';
import { bindPokemonData, bindPokemonSpecies } from '../api/pokemonService';

const BackgroundDiv = styled.div`
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tw`text-white shadow rounded-2xl w-60 h-72`}
`;

const PokemonNameDiv = styled.div`
  color: ${(props) => props.color};
  background: white;
  text-align: center;
  ${tw`items-center justify-center w-48 p-1 mb-1 text-2xl font-bold shadow rounded-2xl`}
`;

const PokemonComponent = ({ urls, typeData }) => {
  const pokemonId = urls.dataUrl.split('/')[6];
  const { dataUrl, speciesUrl } = urls;
  const [pokemonData, setPokemonData] = React.useState({});
  const [pokemonSpecies, setPokemonSpecies] = React.useState({});
  const type = pokemonData.types?.[0].type.name;
  const typeInfo = typeData.find((item) => item.type === type);
  useEffect(() => {
    async function fetchPokemonData() {
      const boundPokemonSpecie = bindPokemonSpecies((await pokemonInstance.get(`${speciesUrl}`)).data);
      const boundPokemonData = await bindPokemonData((await pokemonInstance.get(`${dataUrl}`)).data);
      setPokemonData(boundPokemonData);
      setPokemonSpecies(boundPokemonSpecie);
    }
    fetchPokemonData();
  }, [urls, typeData]);

  return (
    <BackgroundDiv
      color={`#${type !== 'stellar' ? typeInfo?.hex.normal : `conic-gradient(#ceb344 8%, #d09949 8% 15%, #ce684c 15% 19%, #c9606e 19% 22%, #b975a9 22% 25%, #9f5b89 25% 28%, #694d94 28% 31%, #63537a 31% 35%, #596677 35% 42%, #5f708d 42% 50%, #4887be 50% 58%, #3d9cc4 58% 65%, #428dc4 65% 69%, #457cbb 69% 72%, #4095b9 72% 75%, #61b7c2 75% 78%, #56c267 78% 81%, #a5b65b 81% 85%, #aaaf80 85% 92%, #b69867 0);`}`}
      data-testid={`pokemon-card-${pokemonId}`}
    >
      <div className="flex justify-end w-full text-sm">
        <p className="mr-4">#{String(pokemonId).padStart(3, '0')}</p>
      </div>
      <div className="flex justify-center mb-1">
        <img
          role="figure"
          className="size-44"
          key={`pokemon-${pokemonId}-${pokemonSpecies.koreanName}`}
          src={pokemonData.image}
          alt="포켓몬 이미지"
        />
      </div>
      <PokemonNameDiv
        color={`#${type !== 'stellar' ? typeInfo?.hex.dark : `conic-gradient(#ceb344 8%, #d09949 8% 15%, #ce684c 15% 19%, #c9606e 19% 22%, #b975a9 22% 25%, #9f5b89 25% 28%, #694d94 28% 31%, #63537a 31% 35%, #596677 35% 42%, #5f708d 42% 50%, #4887be 50% 58%, #3d9cc4 58% 65%, #428dc4 65% 69%, #457cbb 69% 72%, #4095b9 72% 75%, #61b7c2 75% 78%, #56c267 78% 81%, #a5b65b 81% 85%, #aaaf80 85% 92%, #b69867 0);}`}`}
        aria-labelledby="heading"
      >
        <h1>{pokemonSpecies.koreanName}</h1>
        <h2 className="text-sm">{pokemonSpecies.name}</h2>
      </PokemonNameDiv>
    </BackgroundDiv>
  );
};

export default PokemonComponent;
