import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Layout } from '~/lib/layout';
import axios from 'axios';

export const Home = () => {
  return (
    <Layout>
      <Flex justify="center" align="center" w="100vw" h="100vh">
        <iframe width="100%" height="100%" src="https://headsbet.com" />
      </Flex>
    </Layout>
  );
};
