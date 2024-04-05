import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
//import useSearchStore from "../hooks/searchStore";
import { useNavigate } from "react-router-dom";
//import useFindJobById from "../../Jobs/hooks/JobDetails/useFindJobById";
//import useFindClientByName from "../../Settings/hooks/Client/useFindClientByName";
import Swal from "sweetalert2";
import { IconSearch } from "../../../assets/icons/IconSearch";
const SearchInput = () => {
  // const { setSearchText } = useSearchStore();
  const [searchText, setSearchText] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // New state

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setSearchText(inputValue);
    setFormSubmitted(true);
    setSearchText(inputValue);
  };
  const navigate = useNavigate();
  //const findJobById = useFindJobById({ id: searchText });
  //const findClientByName = useFindClientByName({ name: searchText });

  // useEffect(() => {
  //   if (searchText) {
  //     if (findJobById.data && findJobById.data[0]?.id) {
  //       const jobId = findJobById.data[0].id;
  //       //  navigate(`/jobs/${jobId}`);
  //       location.href = `/jobs/${jobId}`;
  //     } else if (findClientByName.data?.[0]?.id) {
  //       const clientId = findClientByName.data[0].id;
  //       location.href = `/settings/clients/${clientId}`;
  //       //  navigate(`/settings/clients/${clientId}`);
  //     } else {
  //       setTimeout(() => {
  //         Swal.fire({
  //           title: "No results found",
  //           text: "Please try again",
  //           icon: "error",
  //         });
  //       }, 1000);
  //     }
  //   }
  //   setFormSubmitted(false);
  // }, [
  //   formSubmitted,
  //   searchText,
  //   findJobById.data,
  //   findClientByName.data,
  //   navigate,
  // ]);

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup marginRight={5}>
        <InputLeftElement pl={3} pr={2.5} pointerEvents="none">
          <IconSearch />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          borderRadius={"10"}
          w={"300px"}
          py={2.5}
          bg={"Neutral.100"}
          border={"none"}
          placeholder="Search jobs, clients, users..."
        />
        {inputValue && (
          <InputRightElement>
            {/* {findJobById.isLoading || findClientByName.isLoading ? (
              <Spinner size="sm"   thickness="4px"
            speed="0.65s"
            emptyColor="Neutral.300"
            color="Primary.700" />
            ) : ( */}
            <IconButton
              aria-label="Clear input"
              mr={5}
              size={"lg"}
              icon={<BsX />}
              borderRadius={"10"}
              bg={"transparent"}
              variant="ghost"
              _hover={{ bg: "none" }}
              onClick={handleClearInput}
            />
            {/* )} */}
          </InputRightElement>
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
