import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Badge,
  Text,
  Stack,
  Image,
  Flex,
  Button,
  SimpleGrid,
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import { AiFillCiCircle, AiFillStop, AiOutlineCheckCircle, AiOutlineSync } from "react-icons/ai";
import { FaList, FaTh } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrademarks } from "../Redux/trademarks/actions";
import { useEffect, useState } from "react";

const TrademarkList = ({ search }) => {
  const dispatch = useDispatch();

  // State to toggle between list and grid view
  const [viewType, setViewType] = useState("list"); // 'list' or 'grid'

  useEffect(() => {
    dispatch(fetchTrademarks());
  }, [dispatch]);

  const trademarksState = useSelector((state) => state.trademarks);
  const { data, loading, error } = trademarksState;

  // Filter trademarks based on the search term
  const filteredTrademarks = data?.filter((trademark) =>
    trademark._source.mark_identification.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p="4" bg="white" borderWidth="1px" borderRadius="md" mt="4">
      {/* Toggle between List and Grid view */}
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="2xl" fontWeight="bold">
          Trademarks
        </Text>
        <Flex gap="2">
          <IconButton
            aria-label="List view"
            icon={<FaList />}
            onClick={() => setViewType("list")}
            isActive={viewType === "list"}
          />
          <IconButton
            aria-label="Grid view"
            icon={<FaTh />}
            onClick={() => setViewType("grid")}
            isActive={viewType === "grid"}
          />
        </Flex>
      </Flex>

      {/* Displaying content based on view type */}
      {viewType === "list" ? (
        <Table variant="simple" border="none">
          <Thead>
            <Tr>
              <Th fontWeight="bold">Mark</Th>
              <Th fontWeight="bold">Details</Th>
              <Th fontWeight="bold">Status</Th>
              <Th width="40%" fontWeight="bold">
                Class/Description
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredTrademarks?.map((trademark) => (
              <Tr key={trademark._id}>
                {/* Mark Column */}
                <Td>
                  <Image
                    src={trademark.logo}
                    alt="Trademark Logo"
                    boxSize="6rem"
                    borderRadius="md"
                    fallbackSrc="https://via.placeholder.com/50"
                  />
                </Td>

                {/* Details Column */}
                <Td>
                  <Stack spacing="1">
                    <Text fontWeight="bold">
                      {trademark._source.mark_identification}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {trademark._source.current_owner}
                    </Text>
                    <Text fontWeight="bold" mt="5">
                      {trademark._source.registration_number}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(trademark._source.registration_date * 1000).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Text>
                  </Stack>
                </Td>

                {/* Status Column */}
                <Td>
                  <Stack spacing="1">
                    <Flex align="center" gap="1">
                      {
                        trademark._source.status_type === "abandoned" ? (<>
                          <Stack>
                            <Text fontWeight="bold" color="red.400">
                              Dead/Cancelled
                            </Text>
                            <Text fontWeight="normal" fontSize='small'>
                              On <span style={{ fontWeight: 'bold' }}>
                                {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </Text>
                          </Stack>
                        </>) : (<>
                          {
                            trademark._source.status_type === "pending" ? (<>
                              <Stack>
                                <Text fontWeight="bold" color="yellow.400">
                                  Live/Pending
                                </Text>
                                <Text fontWeight="normal" fontSize='small'>
                                  On <span style={{ fontWeight: 'bold' }}>
                                    {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </Text>
                              </Stack>
                            </>) : (<>
                              {
                                trademark._source.status_type === "registered" ? (<>
                                  <Stack>
                                    <Text fontWeight="bold" color="green.400">
                                      Live/Registered
                                    </Text>
                                    <Text fontWeight="normal" fontSize='small'>
                                      On <span style={{ fontWeight: 'bold' }}>
                                        {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })}
                                      </span>
                                    </Text>
                                    <Flex align="center" gap="1">
                                      <AiOutlineSync color="red" />
                                      <Text fontSize="sm" color="red.500">
                                        {new Date(trademark._source.renewal_date * 1000).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })}
                                      </Text>
                                    </Flex>
                                  </Stack>
                                </>) : (<>
                                  {
                                    <Stack>
                                      <Text fontWeight="bold" color="blue.400">
                                        Indifferent
                                      </Text>
                                      <Text fontWeight="normal" fontSize='small'>
                                        On <span style={{ fontWeight: 'bold' }}>
                                          {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                          })}
                                        </span>
                                      </Text>
                                    </Stack>
                                  }
                                </>)
                              }
                            </>)
                          }
                        </>)
                      }

                    </Flex>
                    <Text fontSize="sm" color="gray.500">
                      {/* on {trademark.statusDate} */}
                    </Text>

                  </Stack>
                </Td>
                {/* Class/Description Column */}
                <Td>
                  <Text fontSize="small">
                    {trademark._source.mark_description_description[1]}
                  </Text>
                  <Flex gap="1" flexWrap="wrap">
                    {trademark._source.class_codes.map((cls, index) => (
                      <Button
                        key={index}
                        size="xs"
                        variant="outline"
                        colorScheme="gray"
                      >
                        Class {cls}
                      </Button>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing="4">
          {filteredTrademarks?.map((trademark) => (
            <GridItem key={trademark._id} borderWidth="1px" p="4" borderRadius="md">
              {/* Trademark Item in Grid */}
              <Image
                src={trademark.logo}
                alt="Trademark Logo"
                boxSize="7rem"
                objectFit="contain"
                mx="auto"
                fallbackSrc="https://via.placeholder.com/100"
              />
              <Text fontWeight="bold" mt="2" textAlign="center">
                {trademark._source.mark_identification}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                {trademark._source.current_owner}
              </Text>
              <Text fontWeight="bold" mt="2" textAlign="center">
                {trademark._source.registration_number}
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                {new Date(trademark._source.registration_date * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </Text>
              {/* Status Section */}
              <Flex justifyContent='center'>
                <Stack spacing="1">
                  <Flex align="center" gap="1">
                    {
                      trademark._source.status_type === "abandoned" ? (<>
                        <Stack>
                          <Text fontWeight="bold" color="red.400">
                            Dead/Cancelled
                          </Text>
                          <Text fontWeight="normal" fontSize='small'>
                            On <span style={{ fontWeight: 'bold' }}>
                              {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </Text>
                        </Stack>
                      </>) : (<>
                        {
                          trademark._source.status_type === "pending" ? (<>
                            <Stack>
                              <Text fontWeight="bold" color="yellow.400">
                                Live/Pending
                              </Text>
                              <Text fontWeight="normal" fontSize='small'>
                                On <span style={{ fontWeight: 'bold' }}>
                                  {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </Text>
                            </Stack>
                          </>) : (<>
                            {
                              trademark._source.status_type === "registered" ? (<>
                                <Stack>
                                  <Text fontWeight="bold" color="green.400">
                                    Live/Registered
                                  </Text>
                                  <Text fontWeight="normal" fontSize='small'>
                                    On <span style={{ fontWeight: 'bold' }}>
                                      {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </Text>
                                  <Flex align="center" gap="1">
                                    <AiOutlineSync color="red" />
                                    <Text fontSize="sm" color="red.500">
                                      {new Date(trademark._source.renewal_date * 1000).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </Text>
                                  </Flex>
                                </Stack>
                              </>) : (<>
                                {
                                  <Stack>
                                    <Text fontWeight="bold" color="blue.400">
                                      Indifferent
                                    </Text>
                                    <Text fontWeight="normal" fontSize='small'>
                                      On <span style={{ fontWeight: 'bold' }}>
                                        {new Date(trademark._source.status_date * 1000).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric'
                                        })}
                                      </span>
                                    </Text>
                                  </Stack>
                                }
                              </>)
                            }
                          </>)
                        }
                      </>)
                    }

                  </Flex>
                  <Text fontSize="sm" color="gray.500">
                    {/* on {trademark.statusDate} */}
                  </Text>

                </Stack>
              </Flex>
              <Flex justify="center" align="center" mt="2" gap="1">
                {/* Status Indicator Logic */}
              </Flex>
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TrademarkList;
