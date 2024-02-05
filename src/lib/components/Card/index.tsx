// Importando os componentes necessários do Chakra UI e as bibliotecas externas necessárias
import { Box, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Definindo a interface IPokeCard que representa as propriedades esperadas para o componente
interface IPokeCard {
  name: string;
  url: string;
}

// Interface para os dados do Pokémon que serão obtidos da API
interface IDataPoke {
  sprites: {
    front_default: string;
  };
}

// Função utilitária para extrair o ID do Pokémon da URL fornecida pela API
const getIdFromUrl = (url: string) => {
  const segments = url.split('/');
  return segments[segments.length - 2];
};

// Definindo o componente funcional PokeCard com base na interface IPokeCard
export const PokeCard: React.FC<IPokeCard> = ({ name, url }) => {
  // Estado para armazenar os dados do Pokémon após a busca na API
  const [pokemonData, setPokemonData] = useState<IDataPoke | null>(null);

  // Hook useRouter para acessar o objeto de roteamento do Next.js
  const router = useRouter();

  // Efeito useEffect para buscar dados do Pokémon quando o componente é montado ou quando a URL muda
  useEffect(() => {
    // Função assíncrona para buscar dados do Pokémon
    const fetchPokemons = async () => {
      try {
        // Chamada à API usando Axios para obter os dados do Pokémon
        const response = await axios.get(url);
        // Atualizando o estado com os dados obtidos
        setPokemonData(response.data);
      } catch (error) {
        // Lidando com erros, caso ocorram ao buscar dados do Pokémon
        console.error('Error fetching Pokémon data:', error);
      }
    };

    // Chamando a função de busca de dados quando a URL ou o componente é montado
    fetchPokemons();
  }, [url]); // A dependência [url] faz com que o efeito seja reexecutado quando a URL muda

  // Função para lidar com o clique no componente PokeCard
  const handleCardClick = () => {
    // Obtendo o ID do Pokémon da URL usando a função getIdFromUrl
    const pokemonId = getIdFromUrl(url);
    // Navegando para a página do Pokémon correspondente usando o objeto de roteamento
    router.push(`/pokemonId/${pokemonId}`);
  };

  // Verificando se os dados do Pokémon ou a URL da imagem estão disponíveis
  if (!pokemonData || !pokemonData.sprites.front_default) {
    // Se não estiverem disponíveis, retornar null para evitar renderização
    return null;
  }

  // Se os dados estiverem disponíveis, renderizar o componente Box com os detalhes do Pokémon
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
      overflowY="auto" // Adicionando overflowY para permitir rolagem vertical
      maxHeight="200px" // Definindo a altura máxima do Box
    >
      {/* Componente de imagem Chakra UI para exibir a imagem do Pokémon */}
      <Image
        src={pokemonData.sprites.front_default}
        alt={name}
        borderRadius="full"
        boxSize="100px"
        mx="auto"
      />
      {/* Componente de texto Chakra UI para exibir o nome do Pokémon */}
      <Text mt={2} fontWeight="semibold" textTransform="capitalize">
        {name}
      </Text>
    </Box>
  );
};
