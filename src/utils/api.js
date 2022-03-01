import axios from "axios"

const api = axios.create({
    baseURL: "https://rhs-pivot-backend.herokuapp.com/api/presentations/",
});

export const fetchPresentation = (sessionId) => {
    return api.get(`/${sessionId}`).then(({ data }) => {
        return data.presentation;
    })
}
