import http from "../http-common";

class RestaurantDataService {
   // here. all functions will make API calls and return associated data

   // default page number is 0
   // will perform http GET request of the provided URL which is 
   // an URL added to the end of the baseURL in http-common.js
   // gets the page you want
   getAll(page = 0) {
       // not realm -> return http.get(`?page=${page}`);
       return http.get(`restaurants?page=${page}`);
   }

   // get restaurant of specific ID 
   get(id) {
       // not realm -> return http.get(`/id/${id}`);
       return http.get(`/restaurant?id=${id}`);
   }

   find(query, by = "name", page = 0) {
       // not realm -> return http.get(`?${by}=${query}&page=${page}`);
       return http.get(`restaurants?${by}=${query}&page=${page}`);
   }

   // POST request to /review with provided data
   createReview(data) {
       //return http.post("/review", data);
       return http.post("/review-new", data);
   }

   updateReview(data) {
       // return http.put("/review", data);
       return http.put("/review-edit", data);
   }

   deleteReview(id, userId) {
       // return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
       return http.delete(`/review-delete?id=${id}`, {data:{user_id: userId}});
   }

   getCuisines(id) {
       return http.get(`/cuisines`);
   }
}

export default new RestaurantDataService();