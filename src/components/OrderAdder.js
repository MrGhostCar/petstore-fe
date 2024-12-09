import * as React from 'react';
import { useState } from "react";
import { Input, Typography, Stack, Checkbox, Select, MenuItem, Button } from '@mui/material';
import Axios from "axios";

export const OrderAdder = () => {

    const [petId, setPetId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipDate, setShipDate] = useState('2024-12-09T14:35:02.150Z');
    const [status, setStatus] = useState('PLACED');
    const [isComplete, setComplete] = useState('false');

    const handleChangePet = (event) => {
        setPetId(event.target.value);
    };
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };
    const handleChangeDate = (event) => {
        setShipDate(event.target.value);
    };
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChangeComplete = (event) => {
        setComplete(event.target.value);
    };

    const sendPost = () => {
        Axios.post('http://localhost:8080/store/order', {
            petId: petId,
            quantity: quantity,
            shipDate: shipDate,
            status: status,
            complete: isComplete
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Stack spacing={2} id="orderMaker">
            <Stack spacing={2} direction="row">
                <Typography>
                    PetID:
                </Typography>
                <Input value={petId} onChange={handleChangePet}></Input>
            </Stack>

            <Stack spacing={2} direction="row">
                <Typography>
                    Quantity:
                </Typography>
                <Input type="text" value={quantity} onChange={handleChangeQuantity} />
            </Stack>

            <Stack spacing={2} direction="row">
                <Typography>
                    Ship date:
                </Typography>
                <Input type="text" value={shipDate} onChange={handleChangeDate} />
            </Stack>

            <Stack spacing={2} direction="row">
                <Typography>
                    Status:
                </Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="statusSelect"
                    value={status}
                    onChange={handleChangeStatus}
                >
                    <MenuItem value={"PLACED"}>placed</MenuItem>
                    <MenuItem value={"APPROVED"}>approved</MenuItem>
                    <MenuItem value={"DELIVERED"}>delivered</MenuItem>
                </Select>
            </Stack>

            <Stack spacing={2} direction="row">
                <Typography>
                    Complete:
                </Typography>
                <Checkbox value={isComplete} onChange={handleChangeComplete} />
            </Stack>

            <Button onClick={sendPost}>Send</Button>
        </Stack>

    );
}