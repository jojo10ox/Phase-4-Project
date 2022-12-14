import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";

function EditReview({review, currentUser, addReviews, handleDelete}) {
	let {id} = useParams();

	const [isEditing, setIsEditing] = useState(true);
	const [errors, setErrors] = useState([]);
	const {title, user_review, rating, location} = review;
	const [titleUpdate, setTitleUpdate] = useState(title);
	const [locationUpdate, setLocationUpdate] = useState(location);
	const [userReviewUpdate, setUserReviewUpdate] = useState(user_review);
	const [ratingUpdate, setRatingUpdate] = useState(rating);

	
	function updateReview(e) {
		e.preventDefault();

		const formData = {
			user_id: currentUser.id,
			toy_id: id,
			id: review.id,
			title: titleUpdate,
			user_review: userReviewUpdate,
			rating: ratingUpdate,
			location: locationUpdate,
		};


		console.log(formData)

		fetch(`/reviews/${id}`, {
			method: "PATCH",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(formData),
		}).then((res) => {
			if (res.ok) {
				res.json().then(addReviews);
			} else {
				res.json().then((errors) => setErrors(errors.errors));
			}
		});

		setIsEditing((isEditing) => !isEditing);
		return review;
	}
	const [disable, setDisable] = useState(currentUser.id !== review.user_id);
	
	return (
		<div>
			{isEditing ? (
				<Card elevation={3} sx={{maxWidth: 400}} key={review.id}>
					<CardHeader title='User Reviews' />
					<CardContent>
						<IconButton
						 disabled={disable} 
						 onClick={updateReview}>
							<EditIcon></EditIcon>
						</IconButton>

						<IconButton
						disabled={disable}
						onClick={handleDelete}
						>
							<DeleteForeverIcon/>
						</IconButton>
						<Typography>{review.title} </Typography>
						<Typography>{review.user_review}</Typography>
						<Typography>{review.rating}</Typography>
						<Typography>{review.location}</Typography>
						<Typography>{review.created_at}</Typography>
					</CardContent>
				</Card>
			) : (
				<form>
					<Card elevation={3} sx={{maxWidth: 400}}>
						<CardHeader title='User Reviews' />
						<CardContent>
							<TextField
								type='text'
								name='title'
								value={titleUpdate}
								onChange={(e) => setTitleUpdate(e.target.value)}
							/>
							<TextField
								type='text'
								name='review'
								multiline
								maxRows={4}
								value={userReviewUpdate}
								onChange={(e) =>
									setUserReviewUpdate(e.target.value)
								}
							/>
							<TextField
								name='rating'
								type='number'
								value={ratingUpdate}
								onChange={(e) =>
									setRatingUpdate(e.target.value)
								}
							/>
							<TextField
								name='location'
								value={locationUpdate}
								onChange={(e) =>
									setLocationUpdate(e.target.value)
								}
							/>
							<Button type='submit' onClick={updateReview}>
								Save
							</Button>
						</CardContent>
					</Card>
				</form>
			)}
			{errors ? <div>{errors}</div> : null}
		</div>
	);
}

export default EditReview;
