import React, {Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';



function createData(date, status, observations) {
  return { date, status, observations };
}

const rows = [
  createData(new Date("2019-12-15T10:15:00"), "Pendiente", "",""),
  createData(new Date("2019-12-15T15:10:00"), "Certificado","",""),
  createData(new Date("2019-12-22T12:11:00"), "Solicitud compartir","","" ),
  createData(new Date("2019-12-22T13:14:00"), "Rechazado", "usuario desconocido",""),
];

export default function ExampleTable() {
  const [text, setText] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState(null);
  const [selectedObservations, setSelectedObservations] = React.useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };


  const handleChange = event => {
    
    setText(event.target.value);
    getDataTable();
  };

  const handleChangeObservations = event => {
    setSelectedObservations(event.target.value);
  };

  const handleChangeStatus = event => { 
    setSelectedStatus(event.target.value);
  };

  const getDataTable = () => {
    const rowsByText = rows.filter(info => {
      return info.status.toLowerCase().includes(text.toLowerCase()) || info.observations.toLowerCase().includes(text.toLowerCase()) });

    const rowsByDate = rowsByText.filter(info => {
      if(!selectedDate){
        return info;
      }
      return (info.date && info.date.toLocaleDateString() === selectedDate.toLocaleDateString())});
    /*const rowsByStatus = rowsByDate.filter(info => {
      return (info.status && info.status.toLowerCase() === selectedStatus.toLowerCase())});

    const rowsByOIbservations = rowsByStatus.filter(info => {
      return (info.observations && info.observations.toLowerCase() === selectedObservations.toLowerCase())});
*/ 
    const finalRows = text.length === 0 && !selectedDate  ? rows : rowsByDate;

    return finalRows;
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                Fecha/hora
              </TableCell>

              <TableCell align="left">
                Estado
              </TableCell>

              <TableCell align="left">
                Observaciones
              </TableCell>

              <TableCell align="left">
                <TextField
                  placeholder="buscar"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </TableCell>

              <TableCell align="left">
                <Autocomplete
                  id="filter-demo"
                  options={rows.map(row => row.status)}
                  getOptionLabel={option => option}
                  renderInput={params => <TextField {...params} margin="normal" />}
                  onChange={handleChangeStatus}
                />
              </TableCell>

              <TableCell align="left">
                <Autocomplete
                  id="filter-demo"
                  options={rows.map(row => row.observations )}
                  getOptionLabel={option => option}
                  renderInput={params => <TextField {...params} margin="normal" />}
                  onChange={handleChangeObservations}
                />
              </TableCell>

              <TableCell align="left">
                  {""}
                </TableCell>
            </TableRow> 
          </TableHead>

          <TableBody>
            {getDataTable().map(row => (
              <TableRow key={row.name}>
                <TableCell align="left">
                  {row.date.toLocaleDateString()}
                </TableCell>

                <TableCell align="left">
                  {row.status}
                </TableCell>

                <TableCell align="left">
                  {row.observations}
                </TableCell>

                <TableCell align="left">
                  {""}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}