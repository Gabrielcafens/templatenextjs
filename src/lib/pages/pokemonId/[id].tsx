// Importando os componentes e bibliotecas necessários do Chakra UI, Axios e Next.js
import { Box, Text, Image, Link as ChakraLink } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Definindo a interface para os detalhes do Pokémon
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
}

// Definindo o componente funcional PokemonDetails
export const PokemonDetails: React.FC = () => {
  // Hook useRouter para acessar o objeto de roteamento do Next.js
  const router = useRouter();
  // Obtendo o ID do Pokémon da URL usando o hook useRouter
  const { id } = router.query;
  // Estado para armazenar os detalhes do Pokémon
  const [pokemonDetails, setPokemonDetails] = useState<IPokemonDetails | null>(
    null
  );

  // Efeito useEffect para buscar detalhes do Pokémon quando o componente é montado ou quando o ID muda
  useEffect(() => {
    // Função assíncrona para buscar detalhes do Pokémon
    const fetchPokemonDetails = async () => {
      try {
        // Verificando se o ID do Pokémon está disponível
        if (id) {
          // Convertendo o ID para um número inteiro
          const pokemonId = Number(id);
          // Registrando no console que os detalhes do Pokémon estão sendo buscados
          console.log('Fetching details for Pokemon ID:', pokemonId);
          // Chamada à API usando Axios para obter os detalhes do Pokémon
          const response = await axios.get<IPokemonDetails>(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
          );
          // Registrando no console a resposta da API
          console.log('API Response:', response.data);
          // Atualizando o estado com os detalhes do Pokémon obtidos da API
          setPokemonDetails(response.data);
        }
      } catch (error) {
        // Lidando com erros, caso ocorram ao buscar detalhes do Pokémon
        console.error('Error fetching Pokémon details:', error);
      }
    };
    // Chamando a função de busca de detalhes do Pokémon
    fetchPokemonDetails();
  }, [id]); // A dependência [id] faz com que o efeito seja reexecutado quando o ID muda

  // Renderização do componente
  return (
    <Box p={4} textAlign="center">
      {/* Verificando se os detalhes do Pokémon estão disponíveis */}
      {pokemonDetails ? (
        <>
          {/* Componente de imagem Chakra UI para exibir a imagem do Pokémon */}
          <Image
            src={pokemonDetails.sprites.front_default || ''}
            alt={pokemonDetails.name || ''}
            boxSize="200px"
            mx="auto"
          />
          {/* Componente de texto Chakra UI para exibir o nome do Pokémon com formatação */}
          <Text fontSize="2xl" fontWeight="semibold" mt={4}>
            {pokemonDetails.name || 'Loading...'}
          </Text>
          {/* Componente de texto Chakra UI para exibir o ID do Pokémon */}
          <Text fontSize="lg">ID: {pokemonDetails.id}</Text>
          {/* Componente de texto Chakra UI para exibir as habilidades do Pokémon */}
          <Text fontSize="lg" mt={2}>
            Abilities:
            {pokemonDetails.abilities.map((ability, index) => (
              // Mapeando e renderizando as habilidades do Pokémon
              <span key={index}>
                {index > 0 && ', '}
                {/* Componente de link Chakra UI para as URLs das habilidades do Pokémon */}
                <ChakraLink href={ability.ability.url} isExternal>
                  {ability.ability.name}
                </ChakraLink>
                {/* Adicionando '(Hidden)' se a habilidade estiver oculta */}
                {ability.is_hidden && ' (Hidden)'}
              </span>
            ))}
          </Text>
          {/* Componente de texto Chakra UI para exibir a experiência base do Pokémon */}
          <Text fontSize="lg" mt={2}>
            Base Experience: {pokemonDetails.base_experience}
          </Text>
          {/* Componente de texto Chakra UI para exibir as formas do Pokémon */}
          <Text fontSize="lg" mt={2}>
            Forms:
            {pokemonDetails.forms.map((form, index) => (
              // Mapeando e renderizando as formas do Pokémon
              <span key={index}>
                {index > 0 && ', '}
                {/* Componente de link Chakra UI para as URLs das formas do Pokémon */}
                <ChakraLink href={form.url} isExternal>
                  {form.name}
                </ChakraLink>
              </span>
            ))}
          </Text>
          {/* Componente de link Chakra UI para voltar à lista de Pokémon */}
          <ChakraLink href="/" mt={4} fontSize="lg" color="teal.500">
            Voltar para a lista
          </ChakraLink>
        </>
      ) : (
        // Exibindo "Loading..." se os detalhes do Pokémon não estiverem disponíveis
        <Text>Loading...</Text>
      )}
    </Box>
  );
};
