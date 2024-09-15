import {
    Box,
    VStack,
    Stack,
    Button,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Checkbox,
    Flex,
    Text,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import { useState, useEffect } from "react";
  import { fetchTrademarks } from '../Redux/trademarks/actions';
  import { fetchFilters } from '../Redux/filters/actions';
  import {GoDotFill} from  'react-icons/go'
  const RightFilters = () => {
    const dispatch = useDispatch();
    
    // Redux state for filters
    const filterStates = useSelector((state) => state.filters);
    const { attorneys, owners, law_firms } = filterStates;
    
    // Local state to manage selected filters
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedOwners, setSelectedOwners] = useState([]);
    const [selectedAttorneys, setSelectedAttorneys] = useState([]);
    const [selectedLawFirms, setSelectedLawFirms] = useState([]);
  
    const [ownerSearch, setOwnerSearch] = useState('');
    const [lawFirmSearch, setLawFirmSearch] = useState('');
    const [attorneySearch, setAttorneySearch] = useState('');

    // Filter the owners, attorneys, and law firms based on the search input
  const filteredOwners = owners?.filter(owner => 
    owner.key.toLowerCase().includes(ownerSearch.toLowerCase())
  );
  const filteredLawFirms = law_firms?.filter(lawFirm => 
    lawFirm.key.toLowerCase().includes(lawFirmSearch.toLowerCase())
  );
  const filteredAttorneys = attorneys?.filter(attorney => 
    attorney.key.toLowerCase().includes(attorneySearch.toLowerCase())
  );
    // Fetch available filter options on component mount
    useEffect(() => {
      dispatch(fetchFilters());
    }, [dispatch]);
  
    // Handle fetching trademarks when filters change
    const handleFetchTrademarks = () => {
      dispatch(fetchTrademarks(selectedStatus, selectedAttorneys, selectedLawFirms, selectedOwners));
    };
  
    // Handle status toggle (add/remove from selected)
    const toggleStatus = (status) => {
      setSelectedStatus((prev) =>
        prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
      );
    };
  
    // Handle owner, attorney, and law firm selection
    const toggleOwner = (owner) => {
      setSelectedOwners((prev) =>
        prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]
      );
    };
    const toggleAttorney = (attorney) => {
      setSelectedAttorneys((prev) =>
        prev.includes(attorney) ? prev.filter((a) => a !== attorney) : [...prev, attorney]
      );
    };
    const toggleLawFirm = (lawFirm) => {
      setSelectedLawFirms((prev) =>
        prev.includes(lawFirm) ? prev.filter((l) => l !== lawFirm) : [...prev, lawFirm]
      );
    };
  
    // Call fetchTrademarks whenever any filter changes
    useEffect(() => {
      handleFetchTrademarks();
    }, [selectedStatus, selectedOwners, selectedAttorneys, selectedLawFirms]);
  
    return (
      <VStack align="flex-start" spacing="6" w="100%">
        {/* Status Filter Card */}
        <Box p="4" bg="white" borderWidth="1px" borderRadius="md" w="100%">
          <Stack spacing="2">
            <Text fontSize="md" fontWeight="bold" mb="2">Status</Text>
          
            <Flex flexWrap='wrap'>
  {['All', 'Registered', 'Pending', 'Abandoned', 'Other'].map((status, idx) => {
    let selectedColorScheme;
    let selectedBgColor;
    let selectedTextColor;

    // Set custom colors based on status
    if (status === 'Registered') {
      selectedColorScheme = "green";
      selectedBgColor = "green.100";
      selectedTextColor = "green.800";
    } else if (status === 'Pending') {
      selectedColorScheme = "yellow";
      selectedBgColor = "yellow.100";
      selectedTextColor = "yellow.800";
    } else if (status === 'Abandoned') {
      selectedColorScheme = "red";
      selectedBgColor = "red.100";
      selectedTextColor = "red.800";
    } else if (status === 'Other') {
      selectedColorScheme = "blue";
      selectedBgColor = "blue.100";
      selectedTextColor = "blue.800";
    }

    return (
      <Button
        key={idx}
        size="sm"
        variant={selectedStatus.includes(status.toLowerCase()) ? "solid" : "outline"}
        colorScheme={selectedStatus.includes(status.toLowerCase()) ? selectedColorScheme : "gray"}
        bg={selectedStatus.includes(status.toLowerCase()) ? selectedBgColor : "transparent"}
        color={selectedStatus.includes(status.toLowerCase()) ? selectedTextColor : "black"}
        margin='2'
        onClick={() => toggleStatus(status.toLowerCase())}
        leftIcon={<GoDotFill color={selectedColorScheme} style={{ fontSize: '17px' }}/>}
      >
        {status}
      </Button>
    );
  })}
</Flex>

          </Stack>
        </Box>
  
        {/* Owners, Law Firms, Attorneys Tab Card */}
        <Box p="4" bg="white" borderWidth="1px" borderRadius="md" w="100%">
          <Tabs colorScheme="black">
            <TabList>
              <Tab _selected={{ fontWeight: "bold", color: "black" }}>Owners</Tab>
              <Tab _selected={{ fontWeight: "bold", color: "black" }}>Law Firms</Tab>
              <Tab _selected={{ fontWeight: "bold", color: "black" }}>Attorneys</Tab>
            </TabList>
  
            <TabPanels>
              {/* Owners Tab */}
              <TabPanel>
              <Input
                placeholder="Search Owners"
                size="sm"
                borderColor="gray.300"
                mb="2"
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
              />
                <Stack spacing="2">
                  {filteredOwners?.map((owner, index) => (
                    <Checkbox
                      key={index}
                      colorScheme="blue"
                      isChecked={selectedOwners.includes(owner.key)}
                      onChange={() => toggleOwner(owner.key)}
                    >
                      {owner.key}
                    </Checkbox>
                  ))}
                </Stack>
              </TabPanel>
  
              {/* Law Firms Tab */}
              <TabPanel>
              <Input
                placeholder="Search Law Firms"
                size="sm"
                borderColor="gray.300"
                mb="2"
                value={lawFirmSearch}
                onChange={(e) => setLawFirmSearch(e.target.value)}
              />
                <Stack spacing="2">
                  {filteredLawFirms?.map((lawFirm, index) => (
                    <Checkbox
                      key={index}
                      colorScheme="blue"
                      isChecked={selectedLawFirms.includes(lawFirm.key)}
                      onChange={() => toggleLawFirm(lawFirm.key)}
                    >
                      {lawFirm.key}
                    </Checkbox>
                  ))}
                </Stack>
              </TabPanel>
  
              {/* Attorneys Tab */}
              <TabPanel>
              <Input
                placeholder="Search Attorneys"
                size="sm"
                borderColor="gray.300"
                mb="2"
                value={attorneySearch}
                onChange={(e) => setAttorneySearch(e.target.value)}
              />
                <Stack spacing="2">
                  {filteredAttorneys?.map((attorney, index) => (
                    <Checkbox
                      key={index}
                      colorScheme="blue"
                      isChecked={selectedAttorneys.includes(attorney.key)}
                      onChange={() => toggleAttorney(attorney.key)}
                    >
                      {attorney.key}
                    </Checkbox>
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    );
  };
  
  export default RightFilters;
  