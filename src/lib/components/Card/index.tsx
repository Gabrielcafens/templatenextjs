import { Box, Text, Image, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface IPokeCard {
  name: string;
  url: string;
}

interface IPokemonDetails {
  id: number;
  weight: number;
  height: number;
  types: { type: { name: string } }[];
  sprites: {
    front_default: string;
  };
}

const typeColors: { [key: string]: string } = {
  water: '#6890f0',
  fire: '#f05030',
  grass: '#78c850',
  electric: '#f8d030',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  normal: '#a8a878',
  fighting: '#903028',
  flying: '#a890f0',
  poison: '#a040a0',
  ground: '#e0c068',
  rock: '#b8a038',
  bug: '#a8b820',
  ghost: '#705898',
  steel: '#b8b8d0',
  unknown: '#68a090',
};

export const PokeCard: React.FC<IPokeCard> = ({ name, url }: IPokeCard) => {
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(url);
        setPokemonDetails({
          id: response.data.id,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types,
          sprites: {
            front_default: response.data.sprites.front_default,
          },
        });
      } catch (error) {
        console.error(
          'Error fetching Pokémon details in fetchPokemonDetails:',
          error
        );
      }
    };

    fetchPokemonDetails();
  }, [url]);

  const handleCardClick = () => {
    router.push(`/pokemonId/${pokemonDetails.id}`);
  };

  if (
    !pokemonDetails ||
    !pokemonDetails.types ||
    !pokemonDetails.types.length
  ) {
    return null;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
      bg="white"
      boxShadow="md"
      onClick={handleCardClick}
    >
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
        alt={pokemonDetails.name || ''}
        boxSize="200px"
        mx="auto"
        mb={4}
      />
      <Text
        mt={4}
        fontWeight="semibold"
        fontSize="lg"
        textTransform="capitalize"
      >
        {name}
      </Text>
      <Text>ID: {pokemonDetails.id}</Text>
      <Text>Weight: {pokemonDetails.weight}</Text>
      <Text>Height: {pokemonDetails.height}</Text>
      <Flex mt={2} justifyContent="center">
        {pokemonDetails.types.map((type) => (
          <Box
            key={type.type.name}
            bg={typeColors[type.type.name] || 'gray.500'}
            color="white"
            px={2}
            py={1}
            borderRadius="md"
            mr={2}
            fontSize="sm"
          >
            {type.type.name}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
