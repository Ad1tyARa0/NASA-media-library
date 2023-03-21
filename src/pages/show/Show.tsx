import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSearchResults } from "../../api/search";
import { fetchAsset } from "../../api/show";
import { MediaAssetType, NasaMediaCollectionType } from "../../utils/types";
import {
  Box,
  Button,
  Image,
  Spinner,
  Card,
  CardBody,
  Heading,
  Divider,
  Text,
  Tag,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

// Component props.
interface ShowProps {}

const ShowComponent: React.FunctionComponent<ShowProps> = () => {
  const { id } = useParams();
  const [showIsLoading, setShowIsLoading] = useState<boolean>(false);
  const [, setMediaAssets] = useState<MediaAssetType>({} as MediaAssetType);
  const [assetsIsLoading, setAssetsIsLoading] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<NasaMediaCollectionType>(
    {} as NasaMediaCollectionType
  );
  const navigate = useNavigate();

  const fetchSearchResults = useCallback(async () => {
    if (!id) {
      return;
    }

    setShowIsLoading(true);

    try {
      let response = await getSearchResults({ nasa_id: id });
      console.log(response);
      setShowIsLoading(false);
      setSearchItems(response.collection);
    } catch (error) {
      setShowIsLoading(false);

      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults]);

  const fetchAssets = useCallback(async () => {
    if (!id) {
      return;
    }

    setAssetsIsLoading(true);

    try {
      const response = await fetchAsset({ nasa_id: id });
      console.log(response);

      setMediaAssets(response.collection);
      setAssetsIsLoading(false);
    } catch (error) {
      setAssetsIsLoading(false);

      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const _renderGoBackButton = () => {
    return (
      <Button
        color="white"
        backgroundColor="purple"
        onClick={() => navigate("/")}
        sx={{ position: "absolute", right: 0, top: 0 }}
        m={3}
      >
        Go Back
      </Button>
    );
  };

  if (showIsLoading || assetsIsLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Spinner size="xl" />
      </Box>
    );

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      // position="relative"
    >
      {searchItems?.items?.map(e => {
        return (
          <Card
            m={3}
            sx={{
              maxWidth: "600px",
            }}
          >
            {e.data.map(d => {
              return (
                <CardBody p={5}>
                  <Box>
                    <Heading
                      as="h3"
                      size="lg"
                      mb={2}
                      color="purple"
                      textAlign="center"
                    >
                      {d.title}
                    </Heading>

                    <Divider orientation="horizontal" mb={3} pt={2} />

                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      mb={2}
                      minHeight="600px"
                    >
                      {e.links.length !== 0 ? (
                        <Image
                          src={e.links[0].href}
                          alt="thumbnail"
                          width="inherit"
                          height="inherit"
                          backgroundSize="cover"
                          sx={{ aspectRatio: 1 }}
                          mb={2}
                        />
                      ) : null}

                      <Box
                        display="flex"
                        width="100%"
                        alignItems="center"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        mb={2}
                      >
                        {d.keywords.map(k => {
                          return (
                            <Tag
                              size="md"
                              key={k}
                              variant="solid"
                              colorScheme="purple"
                              mt={1}
                              mr={1}
                              mb={1}
                              textTransform="capitalize"
                            >
                              {k.toLowerCase()}
                            </Tag>
                          );
                        })}
                      </Box>

                      <Text sx={{ height: "100px", overflowY: "scroll" }}>
                        {d.description}
                      </Text>
                    </Box>

                    <Text color="gray.500" as="i">
                      {DateTime.fromISO(d.date_created).toFormat(
                        "yyyy-MM-dd, hh:mm a"
                      )}
                    </Text>
                  </Box>
                </CardBody>
              );
            })}
          </Card>
        );
      })}

      {_renderGoBackButton()}
    </Box>
  );
};

export const Show = ShowComponent;
