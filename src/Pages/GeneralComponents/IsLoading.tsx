import { Spinner, Box } from "@chakra-ui/react";
const IsLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        emptyColor="Neutral.300"
        color="Primary.700"
      />
    </Box>
  );
};

export default IsLoading;
