import axios from "axios"

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/restaurants", // URL of the backend server
    headers: {
        "Content-type": "application/json"
    }
});