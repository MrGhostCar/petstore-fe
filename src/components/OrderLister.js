import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from "axios";
import * as React from 'react';
import { useState } from "react";

export const OrderLister = () => {
    const [orders, setOrders] = useState([]);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

    const getOrders = () => {
        Axios.get('http://localhost:8080/store/order', {
            params: {
                from: fromDate.format(),
                to: toDate.format()
            }
        })
            .then(function (response) {
                console.log(response);
                setOrders(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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

    var rows = orders.map(order =>
        <Stack key={order.id} direction="row">
            <Typography > {order.id} </Typography>
            <Button onClick={() => modifyOrder(order.id)} >Complete</Button>
            <Button onClick={() => deleteOrder(order.id)} >Delete </Button>
        </Stack>)

    return (
        <Stack spacing={2} id="orderMaker">
            <DatePicker
                label="From date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
            />
            <DatePicker
                label="To date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
            />

            {rows}

            <Stack spacing={2} direction="row">
            </Stack>
            <Button onClick={getOrders}>Get</Button>
        </Stack>

    );
}