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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // const handlePrevClick = async () => {
  //   try {
  //     setLoading(true);
  //     if (currentPage > 1) {
  //       setCountPokemons((prevCount) => prevCount - 20);
  //       const response = await axios.get(
  //         `https://pokeapi.co/api/v2/pokemon/?limit=${countPokemons}&offset=${
  //           currentPage - 20
  //         }`
  //       );
  //       setPokemons(response.data.results);
  //       setCurrentPage(currentPage - 1);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching Pokémon data in handlePrevClick:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleNextClick = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/?limit=${countPokemons}&offset=${currentPage}`
  //     );
  //     setPokemons(response.data.results);
  //     setCurrentPage(currentPage + 1);
  //     setCountPokemons((prevCount) => prevCount + 20);
  //   } catch (error) {
  //     console.error('Error fetching Pokémon data in handleNextClick:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${currentPage}`
      );
      // Atualizando o estado com os resultados da API
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
  }, [currentPage]);

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

  // Função para lidar com o clique no botão Home, reiniciando os parâmetros
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
        <Wrap
          spacing={4}
          justify="center"
          mt={20}
          overflowY="auto"
          maxHeight="calc(100vh - 200px)"
        >
          {pokemons.map((pokemon: IPokemon) => (
            <WrapItem key={pokemon.name}>
              <Link href={`/pokemonId/${pokemon.name}`}>
                <PokeCard name={pokemon.name} url={pokemon.url} />
              </Link>
            </WrapItem>
          ))}
        </Wrap>
        <Center mt={4}>
          <Button
            onClick={() => setCurrentPage(currentPage - 20)}
            mr={2}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 20)}
            ml={2}
            disabled={currentPage === totalPages}
          >
            Next
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
