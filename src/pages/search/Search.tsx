import React, { useState, useCallback } from "react";
import { getSearchResults } from "../../api/search";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  Spinner,
  Card,
  CardBody,
  Heading,
  Divider,
  Text,
} from "@chakra-ui/react";
import { LinkIcon, SearchIcon } from "@chakra-ui/icons";
import { logoIcon } from "../../assets";
import { SearchTermType } from "../../utils/types";
import { useNavigate } from "react-router-dom";

// Component props.
interface SearchProps {}

const SearchComponent: React.FunctionComponent<SearchProps> = () => {
  const navigate = useNavigate();

  const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchItems, setSearchItems] = useState<SearchTermType[]>([]);

  const handleChangeSearchTerm = (payload: string) => {
    setSearchTerm(payload);
  };

  const handleClickEnter = (key: string) => {
    console.log(key);
    if (key === "Enter" && searchTerm.length !== 0) {
      fetchSearchResults();
    }
  };

  const fetchSearchResults = useCallback(async () => {
    if (searchTerm.trim().length === 0) {
      return;
    }

    setSearchIsLoading(true);

    try {
      let response = await getSearchResults({ searchTerm });

      setSearchIsLoading(false);
      setSearchItems(response.collection.items);
    } catch (error) {
      setSearchIsLoading(false);

      console.log(error);
    }
  }, [searchTerm]);

  const _renderSearchItems = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {searchItems.map(e => {
          return (
            <Card
              m={3}
              sx={{
                maxWidth: "1000px",
              }}
            >
              <CardBody p={3}>
                {e.data.map(d => {
                  return (
                    <Box display="flex" alignItems="flex-start">
                      {e.links.length !== 0 && (
                        <Image
                          src={e.links[0].href}
                          alt="thumbnail"
                          height="100px"
                          width="150px"
                          marginRight="10px"
                          backgroundSize="cover"
                          sx={{ aspectRatio: 1, marginTop: "4px" }}
                        />
                      )}

                      <Box
                        cursor="pointer"
                        display="flex"
                        flex={1}
                        onClick={() => navigate(`/show/${d.nasa_id}`)}
                      >
                        <Heading
                          as="h4"
                          size="md"
                          mb={2}
                          color="purple"
                          textDecoration="underline"
                        >
                          {d.title}
                        </Heading>

                        <Box
                          marginLeft="auto"
                          display="flex"
                          alignItems="center"
                        >
                          <LinkIcon color="purple" />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </CardBody>
            </Card>
          );
        })}
      </Box>
    );
  };

  const _renderLoader = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <Spinner size="xl" />
      </Box>
    );
  };

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box mx="auto" maxW="container.md">
        <Image
          src={logoIcon}
          alt="nasa logo"
          height={150}
          width={150}
          margin="auto"
        />

        <Flex alignItems="center" mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Type to Search"
              value={searchTerm}
              onChange={({ currentTarget }) =>
                handleChangeSearchTerm(currentTarget.value)
              }
              onKeyDown={event => handleClickEnter(event.key)}
            />
          </InputGroup>

          <Button ml={4} colorScheme="purple" onClick={fetchSearchResults}>
            Search
          </Button>
        </Flex>
      </Box>

      {searchIsLoading ? _renderLoader() : _renderSearchItems()}
    </Box>
  );
};

export const Search = SearchComponent;
