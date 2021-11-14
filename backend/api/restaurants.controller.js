import { ReturnDocument } from "mongodb"
import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
    static async apiGetRestaurants(request, res, next) {
        const restaurantsPerPage = request.query.restaurantsPerPage ? parseInt(request.query.restaurantsPerPage, 10) : 20
        const page = request.query.page ? parseInt(request.query.page, 10): 0

        let filters = {}
        if (request.query.cuisine) {
            filters.cuisine = request.query.cuisine
        } else if (request.query.zipcode) {
            filters.zipcode = request.query.zipcode
        } else if (request.query.name) {
            filters.name = request.query.name
        }

        const {restaurantsList, restaurantCount} = await RestaurantsDAO.getRestaurants({
            filters, page, restaurantsPerPage,
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters, 
            entries_per_page: restaurantsPerPage,
            total_results: restaurantCount
        }
        res.json(response)
    }

    static async apiGetRestaurantById(req, res, next) {
        try {
            // a query is after the ? in the URL
            // a parameter is in the URL after a slash(/)
            // a body is in the Body of the request
            let id = req.params.id || {}
            let restaurant = await RestaurantsDAO.getRestaurantByID(id)

            if (!restaurant) {
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(restaurant)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiGetRestaurantCuisines(req, res, next) {
        try {
           let cuisines = await RestaurantsDAO.getCuisines()
           res.json(cuisines)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}