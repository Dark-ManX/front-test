import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SyntheticEvent, useEffect, useState } from "react";
import { FaCheck, FaPen, FaTimes } from "react-icons/fa";
import dataFile from "../../additional/data/data.json";
import { Helpers } from "../../additional/helpers";
import {
  StyledBtn,
  StyledBtnSet,
  StyledDiv,
  StyledInput,
} from "./Table.styled";

interface IInit {
  baseCurrency: string;
  checkedCurrency: string | null;
  operationType: string;
  inputHover: boolean;
  inputFocus: boolean;
}

const BasicTable = ({
  convertedCurrency,
  count,
}: {
  convertedCurrency: "UAH" | "CZK";
  count: number;
}): JSX.Element => {
  const initialState = {
    baseCurrency: "UAH",
    checkedCurrency: "",
    operationType: "",
    inputHover: false,
    inputFocus: false,
  };

  const [state, setState] = useState<IInit>(initialState);
  const [data, setData] = useState<any[]>(dataFile);
  const [inpValue, setInpValue] = useState("");

  const helpers = new Helpers(data);

  function handleChange(e: SyntheticEvent) {
    const { value } = e.target as HTMLInputElement;
    setInpValue(value);
  }

  function handleEditClick(e: SyntheticEvent) {
    const { parentNode, previousSibling } = e.target as HTMLButtonElement;
    const currency = parentNode!.previousSibling!.textContent;
    const { value } = previousSibling!.childNodes[0] as HTMLInputElement;
    console.log("curr", currency);

    setState((prevState) => ({
      ...prevState,
      inputFocus: true,
      prevValue: value,
    }));
  }

  function handleSetClick() {
    setData((prevState) => {
      return prevState.map((el) => {
        if (el.ccy === state.checkedCurrency) {
          if (
            (Number(inpValue) >
              Number(el[state.operationType]) +
                Number(el[state.operationType]) * 0.1 ||
              Number(inpValue) <
                Number(el[state.operationType]) -
                  Number(el[state.operationType]) * 0.1) &&
            inpValue
          ) {
            alert("value must be in range +/- 10%");
            return el;
          }

          switch (state.operationType) {
            case "buy":
              el.buy = inpValue ? Number(inpValue).toFixed(5) : el.buy;
              return el;
            case "sale":
              el.sale = inpValue ? Number(inpValue).toFixed(5) : el.sale;
              return el;
            default:
              return el;
          }
        }
        return el;
      });
    });
    setInpValue("");
    setState((prevState) => ({ ...prevState, inputFocus: false }));
  }

  function handleMouseOn(e: SyntheticEvent) {
    const { childNodes } = e.currentTarget as HTMLElement;
    const { name } = childNodes[0] as HTMLInputElement;
    const action = name.split(" ")[0];
    console.log("action", action);
    const { textContent } = e.currentTarget.parentNode
      ?.parentNode as HTMLElement;

    setState((prevState) => ({
      ...prevState,
      operationType: action,
      checkedCurrency: textContent,
      inputHover: true,
    }));
  }

  function handleMouseLeave(e: any) {
    const { nodeName } = e.relatedTarget as HTMLElement;
    console.log("node", nodeName);
    if (nodeName === "INPUT" || nodeName === "BUTTON") return;
    setState((prevState) => ({
      ...prevState,
      inputFocus: false,
    }));
    setInpValue("");
  }

  function handleCloseClick() {
    setState((prevState) => ({ ...prevState, inputFocus: false }));
  }
  console.log(state);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      baseCurrency: convertedCurrency,
    }));
  }, [convertedCurrency, count]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "rgb(2, 157, 204)" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Currency / convert to</TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Buy
            </TableCell>
            <TableCell sx={{ color: "white" }} align="right">
              Sell
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ ccy, buy, sale }) => {
            return (
              <TableRow
                key={helpers.createId()}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgb(92, 221, 247)",
                  },
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(92, 221, 247, 0.5)",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {ccy}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    position: "relative",
                  }}
                >
                  <StyledDiv
                    onMouseEnter={handleMouseOn}
                    onMouseLeave={handleMouseLeave}
                  >
                    <StyledInput
                      placeholder="Edit…"
                      name={`buy ${ccy}`}
                      type="text"
                      value={
                        inpValue &&
                        state.checkedCurrency === ccy &&
                        state.operationType === "buy"
                          ? inpValue
                          : helpers.proceedTotal({
                              price: buy,
                              total: count ? count : 1,
                            })
                      }
                      onChange={handleChange}
                      disabled={
                        state.inputFocus &&
                        state.checkedCurrency === ccy &&
                        state.operationType === "buy"
                          ? false
                          : true
                      }
                    />
                  </StyledDiv>
                  {!state.inputFocus &&
                    state.checkedCurrency === ccy &&
                    state.operationType === "buy" && (
                      <StyledBtn type="button" onClick={handleEditClick}>
                        <FaPen width={15} />
                      </StyledBtn>
                    )}
                  {state.inputFocus &&
                    state.checkedCurrency === ccy &&
                    state.operationType === "buy" && (
                      <>
                        <StyledBtnSet onClick={handleSetClick}>
                          <FaCheck width={15} />
                        </StyledBtnSet>
                        <StyledBtn
                          onClick={handleCloseClick}
                          onMouseLeave={handleMouseLeave}
                        >
                          <FaTimes width={15} />
                        </StyledBtn>
                      </>
                    )}
                </TableCell>
                <TableCell
                  align="right"
                  className="table-cell"
                  sx={{
                    position: "relative",
                  }}
                >
                  <StyledDiv
                    onMouseEnter={handleMouseOn}
                    onMouseLeave={handleMouseLeave}
                  >
                    <StyledInput
                      placeholder="Edit…"
                      name={`sale ${ccy}`}
                      type="text"
                      value={
                        inpValue &&
                        state.checkedCurrency === ccy &&
                        state.operationType === "sale"
                          ? inpValue
                          : helpers.proceedTotal({
                              price: sale,
                              total: count ? count : 1,
                            })
                      }
                      onChange={handleChange}
                      disabled={
                        state.inputFocus &&
                        state.checkedCurrency === ccy &&
                        state.operationType === "sale"
                          ? false
                          : true
                      }
                    />
                  </StyledDiv>

                  {!state.inputFocus &&
                    state.checkedCurrency === ccy &&
                    state.operationType === "sale" && (
                      <StyledBtn type="button" onClick={handleEditClick}>
                        <FaPen width={15} />
                      </StyledBtn>
                    )}
                  {state.inputFocus &&
                    state.checkedCurrency === ccy &&
                    state.operationType === "sale" && (
                      <>
                        <StyledBtnSet onClick={handleSetClick}>
                          <FaCheck width={15} />
                        </StyledBtnSet>
                        <StyledBtn
                          onClick={handleCloseClick}
                          onMouseLeave={handleMouseLeave}
                        >
                          <FaTimes width={15} />
                        </StyledBtn>
                      </>
                    )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
