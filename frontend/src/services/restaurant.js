import http from "../http-common";

class RestaurantDataService {
   // here. all functions will make API calls and return associated data

   // default page number is 0
   // will perform http GET request of the provided URL which is 
   // an URL added to the end of the baseURL in http-common.js
   // gets the page you want
   getAll(page = 0) {
       return http.get(`?page=${page}`);
   }

   // get restaurant of specific ID 
   get(id) {
       return http.get(`/id/${id}`);
   }

   find(query, by = "name", page = 0) {
       return http.get(`?${by}=${query}&page=${page}`);
   }

   // POST request to /review with provided data
   createReview(data) {
       return http.post("/review", data);
   }

   updateReview(data) {
       return http.put("/review", data);
   }

   deleteReview(id, userId) {
       return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
   }

   getCuisines(id) {
       return http.get(`/cuisines`);
   }
}

export default new RestaurantDataService();