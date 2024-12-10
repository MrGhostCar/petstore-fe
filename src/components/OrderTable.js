import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from "axios";
import { Button } from '@mui/material';

export const OrderTable = ({ rows }) => {

    const modifyOrder = (id) => {
        Axios.patch(`http://localhost:8080/store/order/${id}`,
            [{
                "op": "replace",
                "path": "/complete",
                "value": true
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                }
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteOrder = (id) => {
        Axios.delete(`http://localhost:8080/store/order/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{  }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>PetId</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Completed</TableCell>
                        <TableCell>Operation</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.petId}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.complete + ""}</TableCell>
                            <TableCell><Button onClick={() => modifyOrder(row.id)} >Complete</Button></TableCell>
                            <TableCell><Button onClick={() => deleteOrder(row.id)} >Delete </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}