import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Wrap,
  WrapItem,
  Button,
  Center,
  ChakraProvider,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { PokeCard } from '~/lib/components/Card';
import { LoadingProgressBar } from '~/lib/components/LoadingProgressBar';
import { Navbar } from '~/lib/components/Navbar';

interface IPokemon {
  name: string;
  url: string;
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [countPokemons, setCountPokemons] = useState(20);
  const [loading, setLoading] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${countPokemons}&offset=${
          (currentPage - 1) * countPokemons
        }`
      );
      setPokemons(response.data.results);
      setTotalPages(Math.ceil(response.data.count / countPokemons));
    } catch (error) {
      console.error('Error fetching Pokémon data in fetchPokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, countPokemons]);

  const handleLoadMore = async () => {
    try {
      setLoading(true);
      setCountPokemons((prevCount) => prevCount + 5);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=241`
      );
      const filteredPokemons = response.data.results.filter(
        (pokemon: IPokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPokemons(filteredPokemons);
      setTotalPages(Math.ceil(filteredPokemons.length / countPokemons));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching Pokémon data in handleSearch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (term: string) => {
    setSearchTerm(term);
    await handleSearch();
  };

  const handleHomeClick = async () => {
    try {
      setLoading(true);
      setCurrentPage(1);
      setCountPokemons(20);
      setSearchTerm('');
      fetchPokemons();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex direction="column" w="100vw" h="100vh">
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={handleInputChange}
          onHomeClick={handleHomeClick}
        />
        <Wrap spacing={4} justify="center" mt={20}>
        {pokemons.map((pokemon: IPokemon) => (
            <WrapItem key={pokemon.name}>
              <Link href={`/pokemonid/${pokemon.name}`}>
                <PokeCard name={pokemon.name} url={pokemon.url} />
              </Link>
            </WrapItem>
          ))}
        </Wrap>
        <Center mt={4}>
          <Button
            onClick={handleLoadMore}
            disabled={currentPage >= totalPages}
            size="lg"
            colorScheme="teal"
            leftIcon={<TriangleDownIcon />}
          >
            Carregar Mais
          </Button>
        </Center>
        {loading && (
          <Center mt={4}>
            <LoadingProgressBar loading={false} />
          </Center>
        )}
      </Flex>
    </ChakraProvider>
  );
};
