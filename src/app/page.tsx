"use client";
import Image from "next/image";

import { transformCurrency } from "../common/index";
import styles from "./page.module.css";
import { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TabPanel from "@/components/TabPanel";
import Input from "@mui/joy/Input";

import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
// Datepicker
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// Datepicker
import response from "../common/response.json";
export default function Home() {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [defaultDataModal, setDefaultDataModal] = useState("");

  function createData(
    chargeDate: any,
    particular: any,
    matchOptions: any,
    netAmount: any
  ) {
    return { chargeDate, particular, matchOptions, netAmount };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: string | number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const StackItem = styled(Sheet)(({ theme }) => ({
    borderRadius: 4,
  }));

  const inputStyles = {
    border: "unset",
    fontSize: "1rem",
    borderRadius: "unset",
    borderBottom: "2px solid black",
  };
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "md",
            maxWidth: "33%",
            minWidth: "33%",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: "calc(-1/4 * var(--IconButton-size))",
              right: "calc(-1/4 * var(--IconButton-size))",
              boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
              borderRadius: "50%",
              bgcolor: "background.body",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Add New Perticular
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              To add this new particular to database
            </Typography>
            <div>
              <label style={{ fontSize: "0.75rem" }} htmlFor="">
                Item Name
              </label>
              <Input defaultValue={defaultDataModal} sx={inputStyles} />
            </div>
            <div>
              <label style={{ fontSize: "1rem" }} htmlFor="">
                Hospital Int Code
              </label>
              <Input sx={inputStyles} />
            </div>
            <div>
              <label style={{ fontSize: "1rem" }} htmlFor="">
                Fee For
              </label>
              <Input sx={inputStyles} />
            </div>
            {Array.from(Array(5).keys()).map((element, index) => (
              <div>
                <label style={{ fontSize: "1rem" }} htmlFor="">
                  {`Benefit Type ${index + 1}`}
                </label>
                <Input sx={inputStyles} />
              </div>
            ))}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                color: "orange",
                ml: "auto",
                cursor: "pointer",
              }}
            >
              <Box onClick={() => setOpen(false)}>CANCEL</Box>
              <Box>ADD</Box>
            </Box>
          </Box>
        </Sheet>
      </Modal>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Page One" {...a11yProps(`page-one`)} />
            <Tab label="Page Two" {...a11yProps(`page-two`)} />
          </Tabs>
        </Box>
        {response.data.pages.length > 0 &&
          response.data.pages.map((page, index) => {
            const { fileName, items } = page;
            const rows = items.map((item) =>
              createData(
                item.chargeDate,
                item.particularsEn,
                item.matchOptions,
                item.netAmount
              )
            );
            console.log("rows", rows);

            return (
              <TabPanel index={index} value={value}>
                <Grid container spacing={2}>
                  <Grid item xs={5}>
                    <Item>
                      <img
                        width={`100%`}
                        height={`auto`}
                        src={fileName}
                        alt=""
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={7}>
                    <Item>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Charge Date</TableCell>
                              <TableCell>Particulars</TableCell>
                              <TableCell>Match Items</TableCell>
                              <TableCell>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row, index) => {
                              let defaultSelectOption = row.matchOptions.find(
                                (option: any) =>
                                  option.value.toLowerCase() ===
                                  row.particular.toLowerCase()
                              );
                              let isOptionValueMatchExactlyWithParticular =
                                row.matchOptions[0].value.toLowerCase() ===
                                row.particular.toLowerCase();

                              return (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DemoContainer
                                        components={["DatePicker"]}
                                      >
                                        <DatePicker
                                          label="Charge date picker"
                                          defaultValue={dayjs(row.chargeDate)}
                                        />
                                      </DemoContainer>
                                    </LocalizationProvider>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Stack
                                      alignItems={`center`}
                                      direction="row"
                                      spacing={{ xs: 1 }}
                                      sx={{
                                        border: 1,
                                        borderRadius: `8px`,
                                        padding: 1,
                                        borderColor: "#D8D8DF",
                                      }}
                                    >
                                      <StackItem>{row.particular}</StackItem>
                                      <StackItem
                                        sx={{
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                        onClick={() => {
                                          setOpen(true);
                                          setDefaultDataModal(row.particular);
                                        }}
                                      >
                                        <ControlPointIcon />
                                      </StackItem>
                                    </Stack>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    <Select
                                      sx={{}}
                                      style={{
                                        backgroundColor:
                                          !isOptionValueMatchExactlyWithParticular
                                            ? "pink"
                                            : "white",
                                      }}
                                      defaultValue={row.matchOptions[0].value}
                                    >
                                      {row.matchOptions.map(
                                        (option: any, index: number) => {
                                          return (
                                            <Option value={option.value}>
                                              {option.value}
                                            </Option>
                                          );
                                        }
                                      )}
                                    </Select>
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      minWidth: 200,
                                    }}
                                    component="th"
                                    scope="row"
                                  >
                                    <Box
                                      sx={{
                                        border: 1,
                                        borderRadius: `8px`,
                                        padding: 1,
                                        borderColor: "#D8D8DF",
                                      }}
                                    >
                                      {transformCurrency(
                                        row.netAmount.toString()
                                      )}
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Item>
                  </Grid>
                </Grid>
              </TabPanel>
            );
          })}
      </div>
    </div>
  );
}
