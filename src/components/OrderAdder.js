import * as React from 'react';
import { useState } from "react";
import { FormControl, FormControlLabel, Stack, Checkbox, Select, MenuItem, Button, TextField, InputLabel } from '@mui/material';
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
            <h1>Add order </h1>
            <TextField value={petId} onChange={handleChangePet} label="PetID" variant="filled" />
            <TextField value={quantity} onChange={handleChangeQuantity} label="Quantity" variant="filled" />
            <TextField value={shipDate} onChange={handleChangeDate} label="Quantity" variant="filled" />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="statusSelect"
                    value={status}
                    onChange={handleChangeStatus}
                    label="Status"
                >
                    <MenuItem value={"PLACED"}>placed</MenuItem>
                    <MenuItem value={"APPROVED"}>approved</MenuItem>
                    <MenuItem value={"DELIVERED"}>delivered</MenuItem>
                </Select>
            </FormControl>

            <Stack spacing={2} direction="row">
                <FormControlLabel control={<Checkbox value={isComplete} onChange={handleChangeComplete}/>} label="Complete" />
            </Stack>

            <Button onClick={sendPost}>Send</Button>
        </Stack>
    );
}