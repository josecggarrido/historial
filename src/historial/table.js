import React, {Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import TableHeaders from "./tableHeaders";
import TableRows from "./tableRows";

function createData(date, status, observations, id) {
  return { date, status, observations, id };
}

const rows = [
  createData(new Date("2019-12-15T10:15:00"), "Pendiente", "","", 1),
  createData(new Date("2019-12-15T15:10:00"), "Certificado","","", 2),
  createData(new Date("2019-12-22T12:11:00"), "Solicitud compartir","","", 3 ),
  createData(new Date("2019-12-22T13:14:00"), "Rechazado", "usuario desconocido","",4 ),
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

  const handleChangeObservations = (event, values) => {
    setSelectedObservations(values);
  };

  const handleChangeStatus = (event, values) => { 
    setSelectedStatus(values);
  };

  const getDataTable = () => {
    const rowsByText = rows.filter(info => {
      return info.status.toLowerCase().includes(text.toLowerCase()) || info.observations.toLowerCase().includes(text.toLowerCase()) });

    const rowsByDate = rowsByText.filter(info => {
      if(!selectedDate){
        return info;
      }
      return (info.date && info.date.toLocaleDateString() === selectedDate.toLocaleDateString())});
      
    const rowsByStatus = rowsByDate.filter(info => {
      if(!selectedStatus){
        return info;
      }
      return (info.status && selectedStatus && info.status.toLowerCase() === selectedStatus.toLowerCase())});

    const rowsByOIbservations = rowsByStatus.filter(info => {
      if(!selectedObservations){
        return info;
      }
      return (info.observations && selectedObservations && info.observations.toLowerCase() === selectedObservations.toLowerCase())});

    const finalRows = (text.length === 0 && !selectedDate && !selectedStatus && !selectedObservations) ? rows : rowsByOIbservations;

    return finalRows;
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHeaders
            rows={rows}
            handleChange={handleChange}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            handleChangeStatus={handleChangeStatus}
            handleChangeObservations={handleChangeObservations}
          />

          <TableRows
            tableInfo={getDataTable()}
          />
        </Table>
      </TableContainer>
    </Fragment>
  );
}