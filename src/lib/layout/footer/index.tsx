import { Flex, Text, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link href="footer" isExternal rel="footer">
          next-js/chakra-ui boilerplate
        </Link>
      </Text>
    </Flex>
  );
};
