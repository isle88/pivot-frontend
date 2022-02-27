import axios from "axios"

const api = axios.create({
    baseURL: "https://pivot1.herokuapp.com/api",
});

export const fetchPresentation = () => {
    return api.get('/results').then(({ data }) => {
        return data.results;
    })
}
