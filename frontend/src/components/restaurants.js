import React, {useState, useEffect} from "react";
import RestaurantDataService from "../services/restaurant";
import {Link, useParams} from "react-router-dom";

const Restaurant = props => {
  const {restaurant_id} = useParams();

  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };

  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id).then(
      response => {
        setRestaurant(response.data);
        console.log(response.data);
      }
    ).catch(e => {
      console.log(e);
    })
  };

  useEffect(() => {
    // called when the component first renders
    // note array at the end -> useEffect is called only if the id in the array is updated
    // even if the component is called many times, it will only call getRestaurant if is
    // is updated
    getRestaurant(restaurant_id);
  }, [restaurant_id]);

  const deleteReview = (reviewId, index) => {
    // index = index of the review from the review array which is the review variable
    // from the state
    // you can only delete is you're logged in as the user who created the review
    RestaurantDataService.deleteReview(reviewId, props.user.id).then(
      response => {
        // set restaurant array be the array without the delete restaurant
        // take previous state of the restaurant array, remove the review you want to
        // delete from the reviews array, then return the previous state (with spliced 
        // reviews = review removed) back into the restaraunt's array
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      }
    ).catch(e => {
      console.log(e);
    });
  };

  return (
    <div>
      {restaurant ? (
        // if there is a restaurant
        <div>
          <h5>{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <Link to={"/restaurants/" + restaurant_id /* this is the restaurant ID */ + "/review"} className="btn btn-primary">
          Add Review
          </Link>

          {/* list reviews */}
          <h4> Reviews </h4>
          <div className="row">
            {restaurant.reviews.length > 0 ? (
              restaurant.reviews.map((review, index) => {
                return (
                  <div className="col-lg-4 pb-1" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <p className="card-text">
                          {review.text}<br/>
                          <strong>User: </strong>{review.name}<br/>
                          <strong>Date: </strong>{review.date}
                        </p>
                        {/*show button depending on what user is logged in*/}
                        {props.user && props.user.id === review.user_id && 
                           <div className="row">
                             <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                             <Link to={{
                               pathname: "/restaurants/" + restaurant_id + "/review",
                             }}
                             state={{
                              // pass in state of the review so we can fill in the fields with the text
                              // of the current review on the review page
                              currentReview: review
                             }}
                             className="btn btn-primary col-lg-5 mx-1 mb-1">
                               Edit
                             </Link>
                           </div>
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-sm-4">
                <p>No reviews yet.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // if there's no restaurant
        <div>
          <br/>
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
}

export default Restaurant;