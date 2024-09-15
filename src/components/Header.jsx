import { Box, Flex, Text } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
const Header = ({handleSearch}) => {
    return(
  <Flex
    as="header"
    bg="white"
    boxShadow="md"
    p="4"
    justify="left"
    align="center"
  >
    <Text fontSize="2xl" fontWeight="bold" color="blue.500">
      Trademarkia
    </Text>
    <SearchBar handleSearch ={handleSearch}/>
    
  </Flex>
    )
};

export default Header;
