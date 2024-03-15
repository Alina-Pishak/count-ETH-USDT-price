import {
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import "./App.css";
import { ChangeEvent, useState } from "react";
import axios from "axios";

function App() {
  const [value, setValue] = useState<number>(0);
  const [exchangeValue, setExchangeValue] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(true);
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };
  const getExchangeInfo = async () => {
    const {
      data: { price },
    } = await axios.get(
      "https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"
    );
    setExchangeValue(price);
  };
  const countValue = (): string => {
    return Number(value) && Number(exchangeValue)
      ? Number.parseFloat(
          String(Number(value) * Number(exchangeValue))
        ).toFixed(2)
      : "";
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "rgba(0, 0, 0, 0.7)",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <TextField
          type="number"
          value={value || ""}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            getExchangeInfo();
            setValue(event.target.valueAsNumber);
          }}
          label="UTH amount:"
        />
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={checked ? "Buy" : "Sell"}
        />
        <TextField
          disabled
          type="number"
          value={countValue()}
          label="You will receive it in USDT:"
        />
      </Box>
    </Container>
  );
}

export default App;

// if (checked) {
//   const { data } = await axios.get(
//     "https://api.binance.com/api/v3/avgPrice?symbol=ETHUSDT"
//   );
//   setExchangeValue(Number(Number.parseFloat(data).toFixed(2)));
// } else {
//   const { data } = await axios.get(
//     "https://api.binance.com/api/v3/avgPrice?symbol=USDTETH"
//   );
//   setExchangeValue(Number(Number.parseFloat(data).toFixed(2)));
// }
