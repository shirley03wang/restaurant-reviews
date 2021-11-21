exports = async function(payload, response) {
    const reviews = context.services.get("mongodb-atlas").db("sample_restaurants").collection("reviews");
    
    const deleteResponse = await reviews.deleteOne({
      // note there's no authentication of user_id
      _id: BSON.ObjectId(payload.query.id)
    })
    
    return deleteResponse;
  };