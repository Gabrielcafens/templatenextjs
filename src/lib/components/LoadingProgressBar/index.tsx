import { Center, Progress } from '@chakra-ui/react';
import { useEffect } from 'react';
import type React from 'react';

interface LoadingProgressBarProps {
  loading: boolean;
}

export const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({
  loading,
}) => {
  useEffect(() => {
    console.log('LoadingProgressBar mounted');
    return () => {
      console.log('LoadingProgressBar unmounted');
    };
  }, []);

  return (
    <Center mt={4}>
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
