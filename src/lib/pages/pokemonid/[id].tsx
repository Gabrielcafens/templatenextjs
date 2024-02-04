import { Box, Text, Image, Link as ChakraLink } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface IPokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: {
    name: string;
    url: string;
  }[];
  // Adicione outras propriedades conforme necessário
}

export const PokemonDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (id) {
          const pokemonId = Number(id);
          const response = await axios.get<IPokemonDetails>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
          );
          setPokemonDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return (
    <Box p={4} textAlign="center">
      {pokemonDetails ? (
        <>
          <Image
            src={pokemonDetails.sprites.front_default || ''}
            alt={pokemonDetails.name || ''}
            boxSize="200px"
            mx="auto"
          />
          <Text fontSize="2xl" fontWeight="semibold" mt={4}>
            {pokemonDetails.name || 'Loading...'}
          </Text>
          <Text fontSize="lg">ID: {pokemonDetails.id}</Text>
          <Text fontSize="lg" mt={2}>
            Abilities:
            {pokemonDetails.abilities.map((ability, index) => (
              <span key={index}>
                {index > 0 && ', '}
                <ChakraLink href={ability.ability.url} isExternal>
                  {ability.ability.name}
                </ChakraLink>
                {ability.is_hidden && ' (Hidden)'}
              </span>
            ))}
          </Text>
          <Text fontSize="lg" mt={2}>
            Base Experience: {pokemonDetails.base_experience}
          </Text>
          <Text fontSize="lg" mt={2}>
            Forms:
            {pokemonDetails.forms.map((form, index) => (
              <span key={index}>
                {index > 0 && ', '}
                <ChakraLink href={form.url} isExternal>
                  {form.name}
                </ChakraLink>
              </span>
            ))}
          </Text>
          <ChakraLink href="/" mt={4} fontSize="lg" color="teal.500">
            Voltar para a lista
          </ChakraLink>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};
