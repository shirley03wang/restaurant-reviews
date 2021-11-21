exports = async function(payload, response) {
  
    if (payload.body) {
     // convert from ESON to EJSON (specific to mongodb realm)
     const body = EJSON.parse(payload.body.text());
     const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
     const date = new Date();
     
     const updateResponse = await reviews.updateOne(
       {user_id: body.user_id, _id: BSON.ObjectId(body.review_id)}, // search for review with rights IDs (e.g., userid is same to the one who created the review)
       {$set: {text: body.text, date: date}}, // set new text and date
     )
     
     return updateResponse;
    }
    
    return {};
 };