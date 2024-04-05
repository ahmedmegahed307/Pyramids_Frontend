import {
  Card,
  CardBody,
  Center,
  HStack,
  Heading,
  Select,
  Spacer,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",

    pv: 4400,
  },
  {
    name: "Tues",

    pv: 5428,
  },
  {
    name: "Wed",

    pv: 8800,
  },
  {
    name: "Thu",

    pv: 6008,
  },
  {
    name: "Fri",

    pv: 4800,
  },
  {
    name: "Sat",

    pv: 5400,
  },
  {
    name: "Sun",

    pv: 6500,
  },
];

const EngineerActivity = () => {
  return (
    <Card w={"full"} borderRadius={"2xl"} variant={"outline"}>
      <HStack>
        <Heading ml={5} size={"sm"} fontWeight={"bold"}>
          Engineer Activity
        </Heading>

        <Spacer />
        <Select
          w={100}
          placeholder="Weekly"
          pt={2}
          pr={2}
          size={"md"}
          borderRadius={"8px"}
          color={"#8D8D8D"}
          fontWeight={"bold"}
        >
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Annually</option>
        </Select>
      </HStack>
      <CardBody>
        <ResponsiveContainer width={"100%"} height={290}>
          <BarChart data={data} barSize={30}>
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
              axisLine={false}
            />
            <Tooltip />
            <CartesianGrid strokeDasharray="4 4" vertical={false} />

            <Bar
              dataKey="pv"
              fill="#CCEEF0"
              background={{ fill: "none" }}
              radius={[10, 10, 10, 10]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
export default EngineerActivity;
