import axios from 'axios';

const BASE_URL = `https://pokeapi.co/api/v2`;


async function fetchDataFromApi(url, params="") {
    try {
        const { data } = await axios.get(BASE_URL + url, {params });
        return data;
    } catch (err) {
        return err;
    }
}

export default fetchDataFromApi;

