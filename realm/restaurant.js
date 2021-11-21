exports = async function(payload, response) {
    // not a path parameter but a query parameter
    // path parameter = after a '/'
    // query parameter = after a '?'
    const id = payload.query.id || ""; 
    
    const restaurants = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    
    const pipeline = [
      {
        $match: {
          _id: BSON.ObjectId(id),
          
        },
        
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
    
    restaurant = await restaurants.aggregate(pipeline).next();
    restaurant._id = restaurant._id.toString();
    
    restaurant.reviews.forEach(review => {
      review.date = new Date(review.date).toString();
      review._id = review._id.toString();
    });
    
    return restaurant;
  };