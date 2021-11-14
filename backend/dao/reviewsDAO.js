import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId // we'll have to convert a string to a mongoDB objectID

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) { // check if review already exists
            return
        }
        try { // if not, access DB
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish connection handles in userDAO: ${e}`)
        }
    }

    static async addReview(restaurantID, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantID),
            }

            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewID, userID, text, date) {
        try {
            const response = await reviews.updateOne(
                {user_id: userID, _id: ObjectId(reviewID)}, // search for review with rights IDs
                {$set: {text: text, date: date}}, // set new text and date
            )
            return response
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewID, userID) {
        try {
            const response = await reviews.deleteOne({
                _id: ObjectId(reviewID),
                user_id: userID,
            })
            return response
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return {error: e}
        }
    }
}
