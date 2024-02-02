import {
  Button,
  Flex,
  Input,
  InputGroup,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { PokeCard } from '~/lib/components/Card';

interface IPokemon {
  name: string;
  url: string;
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [countPokemons, setCountPokemons] = useState(20);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?limit=${countPokemons}`
        );
        setPokemons(response.data.results);
      } catch (error) {
        // console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, [countPokemons]);

  //console.log(pokemons);

  return (
    <Flex justify="flex-start" align="flex-start" w="100vw" h="100vh">
      <InputGroup size="lg">
        <Input
          placeholder="Pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <Wrap spacing={4}>
        {pokemons
          .filter((pokemon: IPokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((pokemon: IPokemon) => (
            <WrapItem key={pokemon.name}>
              <PokeCard name={pokemon.name} url={pokemon.url} />
            </WrapItem>
          ))}
      </Wrap>
      <Button onClick={() => setCountPokemons(countPokemons + 5)}>+++</Button>
    </Flex>
  );
};
