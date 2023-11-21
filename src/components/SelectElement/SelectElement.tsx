import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

const SelectElement = ({
  cur,
  handleValue,
}: {
  cur: string;
  handleValue: (e: any) => void;
}): JSX.Element => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <FormControl
        fullWidth
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "auto",
        }}
      >
        <p>convert into</p>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ position: "absolute", top: "10px", left: "88px" }}
        >
          Currency
        </InputLabel>
        <Select
          data-testid="selectEl"
          sx={{ padding: "0px", height: "30px", position: "relative" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cur}
          label="Current currency"
          onChange={(e) => handleValue(e.target.value)}
        >
          <MenuItem data-testid="UAH" sx={{ padding: "5px" }} value="UAH">
            UAH
          </MenuItem>
          <MenuItem data-testid="CZK" sx={{ padding: "5px" }} value="CZK">
            CZK
          </MenuItem>
        </Select>
      </FormControl>
    </ThemeProvider>
  );
};

export default SelectElement;
