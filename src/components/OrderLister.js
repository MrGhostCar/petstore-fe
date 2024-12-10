import { Button, Stack } from '@mui/material';
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

    const modifyOrder = (modifyTargetId) => {
        Axios.patch(`http://localhost:8080/store/order/${modifyTargetId}`,
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

                let returnedOrder = response.data;
                let newArray = orders.map(currentOrder => {
                    if (currentOrder.id === modifyTargetId) {
                        return returnedOrder;
                    } else {
                        return currentOrder;
                    }
                })

                setOrders(newArray);

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
        <Stack spacing={2} id="orderLister">
            <br />
            <h1>Order List</h1>
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

            <OrderTable rows={orders} modifyOrder={modifyOrder} deleteOrder={deleteOrder} />

            <Button onClick={getOrders}>Refresh</Button>
        </Stack>
    );
}