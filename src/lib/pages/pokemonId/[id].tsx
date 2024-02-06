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
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface IStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

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
  stats: IStat[];
}

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
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="center"
          align="center"
        >
          <Box
            width={{ base: '100%', md: '210px' }}
            mb={{ base: '4', md: '0' }}
          >
            <Box
              bg={typeColors[pokemonDetails.types[0].type.name] || 'teal.500'}
              p={5}
              rounded="md"
              boxShadow="md"
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonDetails.id}.png`}
                alt={pokemonDetails.name || ''}
                boxSize="200px"
                mx="auto"
                mb={4}
              />
            </Box>
          </Box>
          <Box flex="1" textAlign="left" ml={{ base: '0', md: '4' }}>
            <Text fontSize="2xl" fontWeight="bold" mt={2}>
              {pokemonDetails.name || 'Loading...'}
            </Text>
            <Text>ID: {pokemonDetails.id}</Text>
            <Stack direction="row" mt={2}>
              {pokemonDetails.types.map((type) => (
                <Badge
                  key={type.type.name}
                  colorScheme="teal"
                  mr={2}
                  fontSize="md"
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
            <Text fontSize="md" mt={4}>
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
            <Text fontSize="" mt={4}>
              Stats:
              <Stack mt={2} spacing={3}>
                {pokemonDetails.stats.map((stat, index) => (
                  <Box key={index}>
                    <Text>{`${stat.stat.name}: ${stat.base_stat}`}</Text>
                    <Progress
                      color={
                        typeColors[pokemonDetails.types[0].type.name] || 'teal'
                      }
                      value={stat.base_stat}
                      max={100}
                      size="md"
                      mt={2}
                      rounded="full"
                    />
                  </Box>
                ))}
              </Stack>
            </Text>
            <Text fontSize="lg" mt={4}>
              Base Experience:{' '}
              <Progress
                color={typeColors[pokemonDetails.types[0].type.name] || 'teal'}
                value={pokemonDetails.base_experience}
                max={300}
                size="sm"
                mt={2}
                rounded="full"
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
          </Box>
        </Flex>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};
