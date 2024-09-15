import { Flex, Input, Button, Box } from "@chakra-ui/react";

const SearchBar = ({handleSearch}) => (
  <Flex as="section" bg="white" p="4" align="center" justify="center" gap="2" width={"50%"}>
    <Input
      placeholder="Search Trademark Here e.g. Mickey Mouse"
      size="lg"
      borderColor="gray.300"
      w="80%"
      onChange={handleSearch}
    />
    <Button colorScheme="blue" size="lg">
      Search
    </Button>
  </Flex>
);

export default SearchBar;
