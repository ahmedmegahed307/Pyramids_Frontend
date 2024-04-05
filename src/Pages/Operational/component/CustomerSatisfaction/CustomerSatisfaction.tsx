import {
  Card,
  CardBody,
  HStack,
  Heading,
  Select,
  Spacer,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",

    pv: 40,
    showDot: false,
  },
  {
    name: "Tues",

    pv: 60,
    showDot: false,
  },
  {
    name: "Wed",
    pv: 40,
    showDot: false,
  },
  {
    name: "Thu",
    pv: 70,
    showDot: true,
  },
  {
    name: "Fri",
    pv: 50,
    showDot: false,
  },
  {
    name: "Sat",
    pv: 30,
    showDot: false,
  },
  {
    name: "Sun",
    pv: 90,
    showDot: false,
  },
];

const CustomerSatisfaction = () => {
  return (
    <Card w={"40%"} borderRadius={"2xl"} variant={"outline"} pb={10}>
      <HStack>
        <Heading ml={5} size={"sm"} fontWeight={"bold"}>
          Customer Satisfaction
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
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" axisLine={false} />
          <YAxis axisLine={false} />
          <Tooltip />

          <Line
            type="natural"
            dataKey="pv"
            stroke="#00ABB6"
            strokeWidth={2}
            dot={{ fill: "#00ABB6", r: 5, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
export default CustomerSatisfaction;
