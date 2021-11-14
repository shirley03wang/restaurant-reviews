import express from "express"
import RestaurantsController from "./restaurants.controller.js"
import ReviewsController from "./reviews.controller.js"

const router = express.Router()

// GET -> get collection of restaurants
router.route("/").get(RestaurantsController.apiGetRestaurants) // gets list of all restaurants
// get a resutaurant with a specific ID
// also gets a list of all the reviews for that restaurant
router.route("/id/:id").get(RestaurantsController.apiGetRestaurantById) 
// get a list of cuisines so users can select a cuisine from a dropdown instead
// of memorizing all cuisines offered
// this route populates that dropdown menu
router.route("/cuisines").get(RestaurantsController.apiGetRestaurantCuisines)


// POST -> create a new review
// PUT -> edit a review
// DELETE -> delete a review
router.route("/review")
      .post(ReviewsController.apiPostReview)
      .put(ReviewsController.apiUpdateReview)
      .delete(ReviewsController.apiDeleteReview)

export default router