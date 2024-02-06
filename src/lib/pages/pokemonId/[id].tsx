import {
  Box,
  Image,
  Text,
  Stack,
  Badge,
  Link as ChakraLink,
  Progress,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const typeColors = {
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
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
}

export const PokemonDetails: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
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
        toast({
          title: 'Error fetching Pokemon details',
          description:
            'There was an error fetching the details for this Pokemon.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchPokemonDetails();
  }, [id, toast]);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <Box p={4} rounded="md" boxShadow="2xl" textAlign="center">
      {pokemonDetails ? (
        <>
          <Box
            bg={typeColors[pokemonDetails.types[0].type.name] || 'teal.500'}
            p={5}
            rounded="lg"
            boxShadow="md"
            mb={4}
            mx="auto"
          >
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonDetails.id}.gif`}
              alt={pokemonDetails.name || ''}
              width="100"
              height="100"
              style={{ display: 'block', margin: 'auto' }}
            />
          </Box>
          <Stack align="center">
            <Text fontSize="2xl" fontWeight="bold">
              {pokemonDetails.name || 'Loading...'}
            </Text>
            <Text>ID: {pokemonDetails.id}</Text>
            <Stack direction="row" mt={2}>
              {pokemonDetails.types.map((type) => (
                <Badge
                  key={type.type.name}
                  colorScheme="teal"
                  mr={2}
                  fontSize="lg"
                  borderRadius="full"
                  paddingX={3}
                  paddingY={1}
                  backgroundColor={typeColors[type.type.name] || 'black'}
                >
                  <ChakraLink
                    href={type.type.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="white"
                  >
                    {type.type.name}
                  </ChakraLink>
                </Badge>
              ))}
            </Stack>
            <Text fontSize="lg" mt={4}>
              Abilities:{' '}
              {pokemonDetails.abilities.map((ability, index) => (
                <span key={index}>
                  {index > 0 && ', '}
                  <ChakraLink
                    href={ability.ability.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="teal.500"
                  >
                    {ability.ability.name}
                  </ChakraLink>
                  {ability.is_hidden && ' (Hidden)'}
                </span>
              ))}
            </Text>
            <Text fontSize="lg" mt={4}>
              Base Experience:{' '}
              <Progress
                colorScheme="teal"
                value={pokemonDetails.base_experience}
                max={300}
                size="sm"
                mt={2}
              />
              <Text mt={1}>{pokemonDetails.base_experience}</Text>
            </Text>
            <Text fontSize="lg" mt={4}>
              Forms:{' '}
              {pokemonDetails.forms.map((form, index) => (
                <span key={index}>
                  {index > 0 && ', '}
                  <ChakraLink
                    href={form.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="teal.500"
                  >
                    {form.name}
                  </ChakraLink>
                </span>
              ))}
            </Text>
            <Button onClick={handleBackClick} mt={8} colorScheme="teal">
              Voltar para a lista
            </Button>
          </Stack>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};
