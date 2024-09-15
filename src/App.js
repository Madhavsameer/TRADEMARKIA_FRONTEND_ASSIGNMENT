import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Header from "./components/Header";
import TrademarkList from "./components/TrademarkList";
import RightFilters from "./components/RightFilters";
import SearchResultsInfo from "./components/SearchResults";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState('');
 const handleSearch = (e) => {
   setSearch(e.target.value);
 }
  return (
    
    <ChakraProvider>
      <Box bg="gray.50" minH="100vh">
        <Header handleSearch ={handleSearch}/>
        <SearchResultsInfo />
        <Flex direction={{ base: "column", md: "row" }} p="4">
          <Box flex="1" pr={{ md: "4" }}>
            <TrademarkList search={search}/>
          </Box>
          <Box w={{ base: "100%", md: "300px" }} mt={{ base: "4", md: "4" }}>
            <RightFilters />
          </Box>
        </Flex>
        {/* <Pagination /> */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
