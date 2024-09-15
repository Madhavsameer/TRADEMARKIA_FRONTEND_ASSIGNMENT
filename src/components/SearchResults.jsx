import { Box, Text, Button, Flex, Stack } from "@chakra-ui/react";
import {useSelector} from 'react-redux'
const SearchResultsInfo = () => {
    const trademarkState = useSelector(state=> state.trademarks);
    const {loading, statusMessage} = trademarkState;
  return (
    <Box p="4" bg="light" borderBottomWidth="1px" borderColor="gray.200">
      {/* Results Count */}
      <Text fontSize="md" fontWeight="medium" mb="2">
        {statusMessage}
      </Text>
    </Box>
  );
};

export default SearchResultsInfo;
