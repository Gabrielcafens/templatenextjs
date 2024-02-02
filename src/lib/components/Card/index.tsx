import { Card, Stack, CardBody, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface IPokeCard {
  name: string;
  url: string;
}
interface IDataPoke {
  sprites: {
    front_default: string;
  };
}
export const PokeCard = ({ name, url }: IPokeCard) => {
  const [pokemonData, setPokemonData] = useState<IDataPoke | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (error) {
        // console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, [url]);
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Stack>
        <CardBody>
          <Heading size="md">{name}</Heading>
          <Image src={pokemonData?.sprites.front_default} />
        </CardBody>
      </Stack>
    </Card>
  );
};
