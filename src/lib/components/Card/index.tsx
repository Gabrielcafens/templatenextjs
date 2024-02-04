import { Box, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface IPokeCard {
  name: string;
  url: string;
}

interface IDataPoke {
  sprites: {
    front_default: string;
  };
}
const getIdFromUrl = (url: string) => {
  const segments = url.split('/');
  return segments[segments.length - 2];
};

export const PokeCard: React.FC<IPokeCard> = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState<IDataPoke | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, [url]);

  const handleCardClick = () => {
    const pokemonId = getIdFromUrl(url);
    router.push(`/pokemonid/${pokemonId}`);
  };

  if (!pokemonData || !pokemonData.sprites.front_default) {
    return null; // Evitar renderização sem dados
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
      boxShadow="md"
      bg="white"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.05)' }}
      onClick={handleCardClick}
      cursor="pointer"
    >
      <Image
        src={pokemonData.sprites.front_default}
        alt={name}
        borderRadius="full"
        boxSize="100px"
        mx="auto"
      />
      <Text mt={2} fontWeight="semibold">
        {name}
      </Text>
    </Box>
  );
};
