import {atom} from 'recoil';

export const apiKeyAtom = atom({
    key: 'api-key', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });