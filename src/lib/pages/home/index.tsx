import {
  Flex,
  Wrap,
  WrapItem,
  Button,
  Center,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PokeCard } from '~/lib/components/Card';
import { LoadingProgressBar } from '~/lib/components/LoadingProgressBar';
import { Navbar } from '~/lib/components/Navbar';

interface IPokemon {
  name: string;
  url: string;
}

export const Home = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [countPokemons, setCountPokemons] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${countPokemons}`
      );

      setPokemons(response.data.results);
      setTotalPages(Math.ceil(response.data.count / countPokemons));
    } catch (error) {
      toast({
        title: 'Erro ao buscar detalhes do Pokémon',
        description: 'Ocorreu um erro ao buscar os detalhes deste Pokémon.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [countPokemons]);

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
      toast({
        title: 'Erro ao buscar detalhes do Pokémon',
        description: 'Ocorreu um erro ao buscar os detalhes deste Pokémon.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (term: string) => {
    setSearchTerm(term);

    if (term === '') {
      fetchPokemons();
    } else {
      await handleSearch();
    }
  };

  // Função para lidar com o clique no botão Home, reiniciando os parâmetros
  const handleHomeClick = async () => {
    try {
      setLoading(true);
      setCurrentPage(1);
      setCountPokemons(0);
      setSearchTerm('');
      fetchPokemons();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex direction="column" w="100vw" h="100vh" bgColor="gray.800">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={handleInputChange}
        onHomeClick={handleHomeClick}
      />
      <Wrap
        spacing={4}
        justify="center"
        pt={8}
        overflowY="auto"
        maxHeight="calc(100vh - 200px)"
        minHeight="calc(100vh - 16rem)"
      >
        {pokemons.map((pokemon: IPokemon) => (
          <WrapItem key={pokemon.name}>
            <Link href={`/pokemonId/${pokemon.name}`}>
              <PokeCard name={pokemon.name} url={pokemon.url} />
            </Link>
          </WrapItem>
        ))}
      </Wrap>
      <Center mt={10} ml="auto" mr={2}>
        <Button
          onClick={() => setCountPokemons(countPokemons - 20)}
          mr={2}
          isDisabled={countPokemons === 0}
        >
          Prev
        </Button>
        <Button
          onClick={() => setCountPokemons(countPokemons + 20)}
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
  );
};
