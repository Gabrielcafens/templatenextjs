// Importando os componentes necessários do Chakra UI e as bibliotecas externas necessárias
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

// Importando componentes personalizados
import { PokeCard } from '~/lib/components/Card';
import { LoadingProgressBar } from '~/lib/components/LoadingProgressBar';
import { Navbar } from '~/lib/components/Navbar';

// Definindo a interface para os dados do Pokémon
interface IPokemon {
  name: string;
  url: string;
}

// Definindo o componente funcional Home
export const Home = () => {
  // Estados para armazenar dados, controle de página, termo de pesquisa e status de carregamento
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [countPokemons, setCountPokemons] = useState(20);
  const [loading, setLoading] = useState(false);

  // Função para buscar os Pokémon da API
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      // Chamada à API para obter a lista de Pokémon com base na página e quantidade definidas
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=${countPokemons}&offset=${
          (currentPage - 1) * countPokemons
        }`
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

  // Efeito useEffect para buscar Pokémon quando a página ou a contagem de Pokémon muda
  useEffect(() => {
    fetchPokemons();
  }, [currentPage, countPokemons]);

  // Função para carregar mais Pokémon
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      // Aumentando a contagem de Pokémon e reiniciando a página para 1
      setCountPokemons((prevCount) => prevCount + 5);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar Pokémon com base no termo de pesquisa
  const handleSearch = async () => {
    try {
      setLoading(true);
      // Chamada à API para obter uma lista maior de Pokémon (limit=241)
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?limit=241`
      );
      // Filtrando Pokémon com base no termo de pesquisa
      const filteredPokemons = response.data.results.filter(
        (pokemon: IPokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Atualizando o estado com os resultados da pesquisa
      setPokemons(filteredPokemons);
      setTotalPages(Math.ceil(filteredPokemons.length / countPokemons));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching Pokémon data in handleSearch:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar o termo de pesquisa e chamar a função de pesquisa
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
      // Chamando a função para buscar Pokémon
      fetchPokemons();
    } finally {
      setLoading(false);
    }
  };

  // Renderização do componente
  return (
    <ChakraProvider>
      {/* Estrutura principal usando o componente Flex do Chakra UI */}
      <Flex direction="column" w="100vw" h="100vh">
        {/* Componente Navbar para a barra de navegação */}
        <Navbar
          searchTerm={searchTerm}
          onSearchChange={handleInputChange}
          onHomeClick={handleHomeClick}
        />
        {/* Componente Wrap para exibir os Pokémon em uma grade */}
        <Wrap
          spacing={4}
          justify="center"
          mt={20}
          // Adicionando estilo para permitir rolagem vertical
          overflowY="auto"
          maxHeight="calc(100vh - 200px)" // Definindo a altura máxima do Wrap
        >
          {/* Mapeando e renderizando os Pokémon usando o componente PokeCard */}
          {pokemons.map((pokemon: IPokemon) => (
            <WrapItem key={pokemon.name}>
              {/* Usando o componente Link do Next.js para envolver o PokeCard */}
              <Link href={`/pokemonId/${pokemon.name}`}>
                <PokeCard name={pokemon.name} url={pokemon.url} />
              </Link>
            </WrapItem>
          ))}
        </Wrap>
        {/* Componente Center para centralizar o botão "Carregar Mais" */}
        <Center mt={4}>
          {/* Botão para carregar mais Pokémon com um ícone */}
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
        {/* Exibindo uma barra de progresso de carregamento se a variável loading estiver true */}
        {loading && (
          <Center mt={4}>
            <LoadingProgressBar loading={false} />
          </Center>
        )}
      </Flex>
    </ChakraProvider>
  );
};
