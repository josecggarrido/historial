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
import Autocomplete from '@material-ui/lab/Autocomplete';

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';


export default function tableRows(props) {

  const {tableInfo } = props;
  console.log(props);
  return (
    <TableBody>
    {tableInfo.map(row => (
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
  );
}