import { Flex, Button } from "@chakra-ui/react";

const Pagination = () => (
  <Flex justifyContent="center" mt="4" gap="2">
    <Button>Previous</Button>
    <Button>1</Button>
    <Button>2</Button>
    <Button>Next</Button>
  </Flex>
);

export default Pagination;
