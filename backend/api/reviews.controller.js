import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantID = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const response = await ReviewsDAO.addReview(
                restaurantID,
                userInfo,
                review,
                date,
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewID = req.body.review_id
            const userID = req.body.user_id
            const text = req.body.text
            const date = new Date()

            const response = await ReviewsDAO.updateReview(
                reviewID,
                userID, // to make sure the user updating is the user who created the review
                text,
                date,
            )

            var {error} = response
            if (error) {
                res.status(400).json({error})
            }

            if (response.modifiedCount === 0) { // this means review wasn't updated
                throw new Error("unable to update review - user may not be original poster")
            }

            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewID = req.query.id
            const userID = req.body.user_id // to check if the user deleting is the user who created the review
                                            // for http delete requests, it's non-standard to have anything in the body
            console.log(reviewID)
            
            const response = await ReviewsDAO.deleteReview(
                reviewID,
                userID,
            )
            res.json({status: "sucess"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}