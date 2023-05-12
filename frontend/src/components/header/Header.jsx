import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box
      height={"120px"}
      mb="30px"
      p="10px"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      position={"relative"}
      textAlign={"center"}
    >
      <Typography
        variant="h4"
        color={"white"}
        fontWeight="lighter"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h7" color={"white"} fontWeight="lighter">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
