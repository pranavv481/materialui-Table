import './App.css';
import { Container, Table, Paper, Box, TableBody, TableHead, TableContainer, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    maxWidth: "100vw",
    height: "100vh",
    paddingTop: theme.spacing(5)
  },
}));


function App() {
  const classes = useStyles();
  const [user, setUser] = useState([])
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5)
  const loadUser = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    console.log(res)
    setUser(res.data)
  }
  useEffect(() => {
    loadUser()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Company</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map(data => (
              <TableRow key={data.id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.phone}</TableCell>
                <TableCell>{data.company.name}</TableCell>
                <TableCell>{data.website}</TableCell>
              </TableRow>
            ))}


          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={user.length}
          rowsPerPage={rowPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
     
    </Container>
  );
}

export default App;
