import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {useParams} from "react-router-dom";
function Popup({open, handleClose, addReviews, currentUser}) {

    let {id} = useParams();
    const [formData, setFormData] = useState({
        user_id:currentUser.id,
        toy_id:id,  
        title: '',
        user_review: '',
        rating: '',
        location: ''
      })

    const [errors, setErrors] = useState([])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    function onSubmit(e){
        e.preventDefault()

        fetch('/reviews',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(formData)
        })
        .then(res => {
          if(res.ok){
            res.json().then(addReviews)

          } else {
            //Display errors
            res.json().then((json) => setErrors(json.errors));
          }
        })
      }

    return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Please share your experience.</DialogTitle>
					<DialogContent>
					<DialogContentText>
						Your feedback will help other shoppers make good
						choices, and we'll use it to improve our products.
					</DialogContentText>
					<form onSubmit={onSubmit}>
						<TextField
							name='title'
							label='Review Title'
							value={formData.title}
							onChange={handleChange}
						/>
						<TextField
							required
							name='rating'
							label='Rating'
							type='number'
							value={formData.rating}
							onChange={handleChange}
						/>
						<TextField
							name='user_review'
							label='Review'
							value={formData.user_review}
							onChange={handleChange}
						/>
						<TextField
							name='location'
							label='Location'
							value={formData.location}
							onChange={handleChange}
						/>
						<DialogActions>
							<Button type='submit' onClick={handleClose}>
								Submit
							</Button>
						</DialogActions>
					</form>
					</DialogContent>
			</Dialog>
			{errors ? <div>{errors}</div> : null}
		</div>
	);
}

export default Popup;