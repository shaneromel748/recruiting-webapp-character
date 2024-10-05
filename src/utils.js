import { default as axios} from 'axios';

const characterApi = axios.create({
    baseURL: "https://recruiting.verylongdomaintotestwith.ca/api/{shaneromel748}"
});

export const getCharacters = () => characterApi.get("/character").then(response => response.data?.body);

export const getModifierValue = points => Math.floor((points - 10) / 2)