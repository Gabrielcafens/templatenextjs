// Importando componentes específicos do Chakra UI para construir a barra de progresso
import { Center, Progress } from '@chakra-ui/react';
// Importando o hook useEffect do React para execução de efeitos colaterais no componente funcional
import { useEffect } from 'react';
import type React from 'react';

// Definindo as propriedades esperadas pelo componente LoadingProgressBar
interface LoadingProgressBarProps {
  loading: boolean; // Flag indicando se o progresso está em andamento
}

// Definindo o componente funcional LoadingProgressBar
export const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({
  loading,
}) => {
  // Efeito useEffect executado quando o componente é montado
  useEffect(() => {
    // Registrando no console quando o componente é montado
    console.log('LoadingProgressBar mounted');
    // Função de limpeza executada quando o componente é desmontado
    return () => {
      // Registrando no console quando o componente é desmontado
      console.log('LoadingProgressBar unmounted');
    };
  }, []); // O array de dependências vazio [] significa que o efeito é executado apenas uma vez, equivalente ao componentDidMount

  // Renderizando o componente
  return (
    // Componente Center do Chakra UI para centralizar os elementos filhos
    <Center mt={4}>
      {/* Verificando se o progresso está em andamento */}
      {loading && (
        <Progress
          size="md"
          isIndeterminate
          width="50%"
          colorScheme="teal"
          borderRadius="md"
        />
      )}
    </Center>
  );
};