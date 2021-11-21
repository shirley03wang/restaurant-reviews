import React, {useState} from "react";
import RestaurantDataService from "../services/restaurant";
import {Link, useParams, useLocation} from "react-router-dom";

const AddReview = props => {
  const {restaurant_id} = useParams();
  let location = useLocation();

  let initialReviewState = ""
  // keep track of whether it's a new review or an edited review
  let editing = false;

  // check if a currentReview is passed into the review. If it is, then it's an edited review
  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: restaurant_id
    };

    if (editing) {
      // get id of review you're editing
      data.review_id = location.state.currentReview._id
      RestaurantDataService.updateReview(data).then(
        response => {
          setSubmitted(true);
          console.log(response.data);
        }
      ).catch(e => {
        console.log(e);
      });
    } else {
      RestaurantDataService.createReview(data).then(
        response => {
          setSubmitted(true);
          console.log(response.data);
        }
      ).catch(e => {
        console.log(e);
      });
    }
  };

  return (
    <div>
      {/* can't add review unless you're logged in */}
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={"/restaurants/" + restaurant_id} className="btn btn-success">
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          Please log in.
        </div>
      )}
    </div>
  );
};

export default AddReview;