import {
  StyleFunctionProps,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "10",
    fontsize: "sm",
  },

  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "Primary.700",
      color: "Primary.700",
      borderRadius: "7",
      borderWidth: "1px",
    },
    link: {
      color: "Primary.700",
    },
    solid: {
      bg: "Primary.700",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});

const FormLabel = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    fontsize: "md",
    color: "black",
  },
});
const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: "default",
        bg: "#F0F1F3",
      },
    }),
  },
  fonts: {
    heading: `'Manrope', sans-serif`,
    body: `'Manrope', sans-serif`,
  },

  colors: {
    Primary: {
      50: "#FFE0B2",
      100: "#FFCC80",
      200: "#FFB74D",
      300: "#FFA726",
      400: "#FF9800",
      500: "#F57C00", // Main shade of orange
      600: "#EF6C00",
      700: "#E65100",
    },

    Secondary: {
      50: "#CCDDDE",
      100: "#B3CCCE",
      200: "#99BBBD",
      300: "#80AAAD",
      400: "#679A9D",
      500: "#34787C",
      600: "#01565B",
    },
    secondary: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      600: "",
      700: "",
      800: "",
      900: "",
    },

    Auxiliary: {
      50: "#FCFEF5",
      100: "#F9FCEA",
      200: "#F6FBDF",
      300: "#F0F9CB",
      400: "#EDF7C0",
      500: "#E7F5AB",
      600: "#E1F296",
    },

    Neutral: {
      50: "#F3F9FA",
      100: "#F6F6F6",
      200: "#EEEEEE",
      300: "#E1E1E1",
      400: "#CCCCCC",
      500: "#8D8D8D",
      600: "#4B4B4B",
      700: "#292A2B",
    },

    Success: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "#6BC497",
      600: "",
    },
    Info: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "#4BA1FF",
      600: "",
    },
    Error: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "#EB6F70",
      600: "",
    },
    Warning: {
      50: "",
      100: "",
      200: "",
      300: "",
      400: "",
      500: "#FFC62B",
      600: "",
    },
  },

  components: {
    FormLabel,
    Button,
    Select: {
      baseStyle: {
        _hover: {
          backgroundColor: "gray.500",
        },
      },
    },
  },

  table: {
    color: "red",
  },

  Button: {
    color: "red",
  },
});

export default theme;
