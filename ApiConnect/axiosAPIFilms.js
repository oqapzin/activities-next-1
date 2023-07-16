import axios from "axios";

const ApiFIlmes = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.API_KEU_TMDB}`
    }
})

export default ApiFIlmes

