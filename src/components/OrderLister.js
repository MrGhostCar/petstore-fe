import { Button, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Axios from "axios";
import * as React from 'react';
import { useState } from "react";
import { OrderTable } from "./OrderTable.js"

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


    return (
        <Stack spacing={2} id="orderLister">
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

            <OrderTable rows={orders}/>
            <Button onClick={getOrders}>Get</Button>
        </Stack>
    );
}