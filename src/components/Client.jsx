import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField } from "@mui/material";
import { saveClientName } from "../redux/client_information/action";
import { useDispatch } from "react-redux";

export default function Client() {
  const [clientName, setClientName] = useState("");
  const dispatch = useDispatch();
  const detectKeyPress = (e) => {
    if (e.keyCode === 13 && clientName.length > 0) {
      dispatch(saveClientName(clientName));
      setClientName("");
    }
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "white",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src="https://res.cloudinary.com/dpaehurgb/image/upload/v1655442363/tie_ewdoen.png"
          alt="tie"
          style={{ height: "150px", width: "150px" }}
        />
        <Typography align="center" variant="h1" color="#191357">
          Necktie
        </Typography>
        <Typography align="center" variant="subtitle" fontWeight="light">
          Good Day. Happiness Begins with Good Health.
        </Typography>
        <Box
          sx={{
            marginTop: 15,
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label="Your name please?"
            id="fullWidth"
            onKeyDown={detectKeyPress}
            helperText="Press Enter & Send"
            value={clientName}
            onChange={(e) => {
              setClientName(e.target.value);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
