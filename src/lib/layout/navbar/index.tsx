import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputRightAddon, Stack, IconButton } from '@chakra-ui/react';
import { useState } from 'react';

export const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Chama a função de pesquisa passando o termo de pesquisa
    onSearch(searchTerm);
  };

  return (
    <Stack width="100%" margin={8}>
      <InputGroup size="lg">
        <Input
          placeholder="Pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightAddon>
          <IconButton
            onClick={handleSearch}
            colorScheme="blue"
            aria-label="Search database"
            icon={<SearchIcon />}
          />
        </InputRightAddon>
      </InputGroup>
    </Stack>
  );
};
