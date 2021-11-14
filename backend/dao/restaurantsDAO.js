import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId // we'll have to convert a string to a mongoDB objectID

let restaurants // stores a reference to the DB

export default class RestaurantsDAO {
    // use this to initially connect to the DB
    // called as soon as the server starts
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.REVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsDAO: ${e}`)
        }
    }

    // gets a list of all restaurants in the DB
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = {$text: {$search: filters["name"]}}
            } else if ("cuisine" in filters) {
                query = {"cuisine": {$eq: filters["cuisine"]}}
            } else if ("zipcode" in filters) {
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor
        try {
            // empty query returns all restaurants
            cursor = await restaurants.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {resutaurantsList: [], restaurantCount: 0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        try {
            const restaurantsList = await displayCursor.toArray()
            const restaurantCount = await restaurants.countDocuments(query)
            return {restaurantsList, restaurantCount}
        } catch (e) {
            console.error(`Unable to convert cursor to array or there was a problem counting documents, ${e}`)
            return {resutaurantsList: [], restaurantCount: 0}
        }
    }

    
    static async getRestaurantByID(id) {
        // trying to get reviews from one collection and put it into the restaurant
        try {
            // pipeline that help match different collections together
            const pipeline = [
                // match ID of a restaurant
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },

                // lookup other items (reviews) to add to the result
                // part of the mongoDB aggregation pipeline
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        // find all reviews that match this restaurant_id
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        // listed as "reviews" in the result
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        // a new field in the results
                        reviews: "$reviews",
                    },
                },
            ]
            return await restaurants.aggregate(pipeline).next()
        } catch (e) {
            console.error(`A problem occured in getRestaurantByID: ${e}`)
            throw e
        }
    }

    static async getCuisines() {
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`)
            return cuisines
        }
    }
}