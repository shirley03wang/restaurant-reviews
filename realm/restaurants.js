exports = async function(payload, response) {
    // get access to the restaurants collection
    
    const {restaurantsPerPage = 20, page = 0} = payload.query; // default to 20 and 0
    
    let query = {}
    
    if (payload.query.cuisine) {
      query = {"cuisine": {$eq: payload.query.cuisine}}
    } else if (payload.query.zipcode) {
      query = {"address.zipcode": {$eq: payload.query.zipcode}}
    } else if (payload.query.name) {
      query = {$text: {$search: payload.query.name}}
    }
    
    const collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
    let restaurantsList = await collection.find(query).skip(page*restaurantsPerPage).limit(restaurantsPerPage).toArray(); // creates an array of our restaurants collection (first 20 elements)
    
    restaurantsList.forEach(restaurant => {
      restaurant._id = restaurant._id.toString();
    })
    
    let responseData = {
      restaurants: restaurantsList,
      page: page.toString(),
      filters: {}, 
      entries_per_page: restaurantsPerPage.toString(),
      total_results: await collection.count(query).then(num => num.toString())
    }
    
    return responseData;
  };