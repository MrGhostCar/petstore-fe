import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Tooltip } from '@mui/material';
import Axios from "axios";
import { useState } from "react";

export const OrderTable = ({ rows, modifyOrder, deleteOrder }) => {

    const [currentTooltip, setCurrentTooltip] = useState("");

    const getOrderDetails = (id) => {
        Axios.get(`http://localhost:8080/store/order/${id}`)
            .then(function (response) {
                console.log(response);
                setCurrentTooltip(response.data.shipDate);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
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
                        <Tooltip key={row.id}
                            title={currentTooltip}
                            onOpen={() => { getOrderDetails(row.id) }}
                            enterDelay={500}
                            enterNextDelay={500}
                            arrow
                            placement="right">
                            <TableRow
                                key={row.id}
                                on
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.petId}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.complete + ""}</TableCell>
                                <TableCell><Button onClick={() => modifyOrder(row.id)} >Complete</Button></TableCell>
                                <TableCell><Button onClick={() => deleteOrder(row.id)} >Delete </Button></TableCell>
                            </TableRow>
                        </Tooltip>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}