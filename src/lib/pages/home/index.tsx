import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { PokeCard } from '~/lib/components/Card';
import { Layout } from '~/lib/layout';

interface IPokemon {
  name: string;
  url: string;
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?limit=20'
        );
        setPokemons(response.data.results);
      } catch (error) {
        // console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <Layout>
      <Flex justify="flex-start" align="flex-start" w="100vw" h="100vh">
        <Wrap spacing={4}>
          {/* Displaying list of Pokémon */}
          {pokemons.map((pokemon: IPokemon) => (
            <WrapItem key={pokemon.name}>
              <PokeCard name={pokemon.name} url={pokemon.url} />
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Layout>
  );
};
