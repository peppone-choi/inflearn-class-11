import React from 'react';
import tw, { styled } from 'twin.macro';
import colors from '../config/pokemon-type-color.json';

const BackgroundDiv = styled.div`
  background: ${(props) => props.color};
  ${tw`block text-center text-white shadow-lg rounded-2xl w-60 h-72`}
`;

const PokemonComponent = ({ pokemonNameData, pokemonData }) => {
  const { koreanName, name } = pokemonNameData[0];
  const { id, image, types } = pokemonData;

  const typeName = types[0].type.name;
  const typeInfo = colors.color.find((color) => typeName === color.type);
  const typeKoreanName = typeInfo.name;
  const typeColor = typeName === 'stellar' ? typeInfo.tag : typeInfo.hex;

  return (
    <BackgroundDiv color={`#${typeColor.dark}`}>
      <div className="flex justify-end mx-2 mt-2 text-sm">
        <p>#{String(id).padStart(3, '0')}</p>
      </div>
      <div className="flex justify-center mb-4">
        <img role="figure" className="size-44" key={`pokemon-icon-${id}-${name}`} src={image} alt="pokemon-icon" />
      </div>
      <div className="">
        <h1>{koreanName}</h1>
      </div>
      <div>
        <h2>{typeKoreanName} 포켓몬</h2>
      </div>
    </BackgroundDiv>
  );
};

export default PokemonComponent;
