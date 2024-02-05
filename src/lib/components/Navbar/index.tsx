// Importando componentes específicos do Chakra UI para construir a barra de navegação
import { Image } from '@chakra-ui/image';
import { Flex, Input, Button } from '@chakra-ui/react';
import type React from 'react';

// Definindo as propriedades esperadas pelo componente Navbar
interface NavbarProps {
  searchTerm: string; // Termo de pesquisa atual
  onSearchChange: (term: string) => void; // Função chamada ao alterar o termo de pesquisa
  onHomeClick: () => void; // Função chamada ao clicar no botão de home
}

// Definindo o componente funcional Navbar
export const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  onSearchChange,
  onHomeClick,
}) => {
  // Renderizando a barra de navegação
  return (
    // Componente Flex do Chakra UI para criar um contêiner flexível
    <Flex
      position="fixed" // Posicionamento fixo na tela
      top={0} // Alinhado ao topo
      left={0} // Alinhado à esquerda
      right={0} // Alinhado à direita
      align="center" // Alinhamento central verticalmente
      justify="space-between" // Justificação do espaço entre os elementos
      p={4} // Espaçamento interno de 4 unidades
      bg="gray.700" // Cor de fundo cinza escuro
      color="white" // Cor do texto branca
      boxShadow="md" // Sombra média
      zIndex={1} // Índice de sobreposição para aparecer acima de outros elementos
    >
      {/* Usando um botão com uma imagem como logotipo para a página inicial */}
      <Button
        onClick={onHomeClick} // Função chamada ao clicar no botão
        variant="ghost" // Variante de botão transparente
        _hover={{ color: 'teal.400' }} // Estilo de destaque ao passar o mouse
        display="flex" // Exibição flexível para alinhar itens
        alignItems="center" // Alinhamento central vertical dos itens
      >
        {/* Componente de imagem do Chakra UI para exibir o logotipo do Pokémon */}
        <Image
          src="/assets/pokemon-logo.png" // Caminho da imagem
          alt="Pokemon Logo" // Texto alternativo da imagem
          boxSize="150px" // Tamanho da caixa da imagem
          objectFit="contain" // Ajuste da imagem para conter dentro da caixa
          marginLeft="-4" // Margem à esquerda para ajuste fino
        />
      </Button>

      {/* Componente de entrada de texto do Chakra UI para a pesquisa de Pokémon */}
      <Input
        placeholder="Pesquisa Pokémon" // Texto de espaço reservado para orientação
        value={searchTerm} // Valor do campo de entrada controlado pelo estado
        onChange={(e) => onSearchChange(e.target.value)} // Função chamada ao alterar o valor do campo de entrada
        size="md" // Tamanho médio do campo de entrada
        focusBorderColor="teal.400" // Cor da borda ao receber foco
        bg="white" // Cor de fundo branca
        color="gray.700" // Cor do texto cinza escuro
      />
    </Flex>
  );
};
