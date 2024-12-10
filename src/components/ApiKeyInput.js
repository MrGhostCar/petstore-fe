import { Stack, TextField } from '@mui/material';
import { apiKeyAtom } from '../atoms/apiKeyAtom';
import {useRecoilState} from 'recoil';
import Axios from "axios";

export const ApiKeyInput = () => {

    const [text, setText] = useRecoilState(apiKeyAtom);

    Axios.defaults.headers.common['x-api-key'] = text;

    
    return (
        <Stack spacing={2} id="orderMaker" >
            <h1>Api key</h1>
            <TextField value={text} onChange={(event) => { setText(event.target.value) }} label="ApiKey" variant="filled" />
        </Stack>
    );
}