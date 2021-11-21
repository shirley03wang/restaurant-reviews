import axios from "axios"

export default axios.create({
    //baseURL: "http://localhost:5000/api/v1/restaurants", // URL of the backend server
    baseURL: "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/restaurants-reviews-tnhrm/service/restaurants/incoming_webhook/",
    headers: {
        "Content-type": "application/json"
    }
});