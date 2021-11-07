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
}