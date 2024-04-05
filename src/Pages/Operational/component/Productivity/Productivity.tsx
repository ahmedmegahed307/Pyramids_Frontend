import {
  VStack,
  Card,
  CardBody,
  HStack,
  Badge,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
//import { cdnPath } from "../../../StaticData/StaticData";

const Productivity = () => {
  return (
    <>
      <VStack w={"full"} justify={"start"} align={"start"} mt={2}>
        <Card bg={"Auxiliary.600"} borderRadius={"2xl"}>
          <CardBody>
            <HStack spacing={16}>
              <VStack ml={6}>
                <Text color={"Neutral.700"} fontWeight={"normal"} zIndex={1}>
                  Mon
                </Text>
                <Text zIndex={1} fontWeight={"bold"} fontSize={"4xl"}>
                  14
                </Text>
                <Image
                  zIndex={0}
                  pos={"absolute"}
                  top={0}
                  h={100}
                  src={"src/assets/img/rec.png"}
                  alt="Dan Abramov2"
                />
              </VStack>
              <VStack>
                <Text bgSize={"contain"}> Productive</Text>
                <Badge borderRadius={10} px={2} py={0.5}>
                  {" "}
                  70%
                </Badge>
              </VStack>
              <VStack>
                <Text>Productive time</Text>
                <Text fontWeight={"bold"}>4h 45m</Text>
              </VStack>
              <VStack>
                <Text>Productive work</Text>
                <Text fontWeight={"bold"}>5h 45m</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card bg={"Primary.600"} color={"white"} borderRadius={"2xl"}>
          <CardBody>
            <HStack spacing={16}>
              <VStack ml={6}>
                <Text color={"Neutral.700"} fontWeight={"normal"} zIndex={1}>
                  Fri
                </Text>
                <Text
                  color={"Neutral.700"}
                  zIndex={1}
                  fontWeight={"bold"}
                  fontSize={"4xl"}
                >
                  19
                </Text>
                <Image
                  zIndex={0}
                  pos={"absolute"}
                  top={0}
                  h={100}
                  src={"src/assets//img/rec.png"}
                  alt="Dan Abramov"
                />
              </VStack>
              <VStack>
                <Text bgSize={"contain"}> Productive</Text>
                <Badge borderRadius={10} px={2} py={0.5}>
                  {" "}
                  60%
                </Badge>
              </VStack>
              <VStack>
                <Text>Productive time</Text>
                <Text fontWeight={"bold"}>1h 04m</Text>
              </VStack>
              <VStack>
                <Text>Productive work</Text>
                <Text fontWeight={"bold"}>1h 50m</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
        <Card bg={"Secondary.600"} color={"white"} borderRadius={"2xl"}>
          <CardBody>
            <HStack spacing={16}>
              <VStack ml={6}>
                <Text color={"Neutral.700"} fontWeight={"normal"} zIndex={1}>
                  Tues
                </Text>
                <Text
                  color={"Neutral.700"}
                  zIndex={1}
                  fontWeight={"bold"}
                  fontSize={"4xl"}
                >
                  23
                </Text>
                <Image
                  zIndex={0}
                  pos={"absolute"}
                  top={0}
                  h={100}
                  src={"src/assets//img/rec.png"}
                  alt="Dan Abramov"
                />
              </VStack>
              <VStack>
                <Text
                  bgSize={"contain"}
                  bgImage={"../../../assets/img/rec.png"}
                >
                  {" "}
                  Productive
                </Text>
                <Badge borderRadius={10} px={2} py={0.5}>
                  {" "}
                  85%
                </Badge>{" "}
              </VStack>
              <VStack>
                <Text>Productive time</Text>
                <Text fontWeight={"bold"}>3h 45m</Text>
              </VStack>
              <VStack>
                <Text>Productive work</Text>
                <Text fontWeight={"bold"}>2h 40m</Text>
              </VStack>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export default Productivity;
