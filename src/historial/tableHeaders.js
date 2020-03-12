import React, {Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';

export default function tableHeaders(props) {
  const {rows, handleChange,selectedDate, handleDateChange, handleChangeStatus, handleChangeObservations } = props;
  return (
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
            renderInput={params => <TextField {...params} margin="normal" />}
            onChange={handleChangeStatus}
          />
        </TableCell>

        <TableCell align="left">
          <Autocomplete
            id="filter-demo"
            options={rows.map(row => row.observations)}
            renderInput={params => <TextField {...params} margin="normal" />}
            onChange={handleChangeObservations}
          />
        </TableCell>

        <TableCell align="left">
            {""}
          </TableCell>
      </TableRow> 
    </TableHead>
  );
}