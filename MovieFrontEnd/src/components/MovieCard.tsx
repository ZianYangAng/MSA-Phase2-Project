import * as React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Reviews from './../customer-reviews.png'
import DeleteIcon from './../rubbish-bin.png';
import EditIcon from './../edit.png'
import Modal from 'react-responsive-modal';
import AddIcon from './../plus.png'
import { Typography, IconButton } from '../../node_modules/@material-ui/core';
import DownloadIcon from './../download.png'
import Rating from 'react-rating'
import EmptyStar from './../emptystar.png'
import Star from './../star.png'

interface IProps {
    currentMovie: any
    userID: any
    userName: any
    reviews: any[]
    authenticated:any
}

interface IState {
    expand:boolean
    open:boolean
    reviewOpen:boolean
    reviewEditOpen:boolean
    currentReviewID: number

}


export default class MovieCard extends React.Component<IProps, IState> {
    public constructor(props :any){
        super(props)
        this.state = {
            expand: false,
            open: false,
            reviewOpen: false,
            reviewEditOpen:false,
            currentReviewID: 1
        }
    }

    public render() {
        const { currentMovie, reviews } = this.props
        return(
            <div>
            <Card>
                <CardHeader 
                title={currentMovie.title}
                subheader={
                <div>
                    <span>Director: {currentMovie.director}</span>
                    <br/>
                    <span>Genre: {currentMovie.genre}</span>
                    <br/>
                    <span>Uploaded: {currentMovie.uploaded}</span>
                </div>
                }
                action={
                    <IconButton aria-label="download" onClick={this.downloadImage.bind(this, currentMovie.url)}>
                        <img src={DownloadIcon}/>
                    </IconButton>
                }
                />
                <CardMedia
                style={{height: 0, paddingTop: '56.25%'}}
                image={currentMovie.url}
                title={currentMovie.title}
                />
                <CardContent>
                    <Typography component="p">
                        {currentMovie.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    {(this.props.userID === currentMovie.uid ) ?
                    <div>
                    <IconButton aria-label="delete" onClick={this.deleteMovie.bind(this,currentMovie.id)}>
                        <img src={DeleteIcon}/>
                    </IconButton>
                    <IconButton aria-label="edit" onClick={this.onOpenModal}>
                        <img src={EditIcon}/>
                    </IconButton>
                    </div>
                    :""}
                    <IconButton 
                    aria-label="review"
                    style={{marginLeft: 'auto',marginRight: -8}}
                    onClick={this.handleExpandClick}
                    >
                        <img src={Reviews}/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                <CardHeader 
                subheader="Reviews"
                action={
                    (this.props.authenticated) ?
                    <IconButton aria-label="add" onClick={this.onReviewOpenModal}>
                        <img src={AddIcon}/>
                    </IconButton>
                :""}
                />
                {(reviews.length === 0)?
                <CardContent>
                    <Typography component="p">
                        There are currently no reviews for <b>{currentMovie.title}</b>
                    </Typography>
                </CardContent>
                :""}
                {(reviews.length > 0) ?
                    reviews.map(review => (
                            <Card>
                                <CardHeader 
                                    title={review.name}
                                    subheader={
                                        <div>
                                            <span>Rating: {
                                            <Rating 
                                            emptySymbol={<img src={EmptyStar}/>}
                                            fullSymbol={<img src={Star}/>}
                                            initialRating={review.rating} 
                                            readonly
                                            />}
                                            </span>
                                            <br/>
                                            <span>Uploaded: {review.uploaded}</span>
                                        </div>
                                    }
                                    action={
                                        (this.props.userID === review.uid) ?
                                            <CardActions>
                                                <IconButton aria-label="delete" onClick={this.deleteReview.bind(this,review.id)}>
                                                    <img src={DeleteIcon}/>
                                                </IconButton>
                                                <IconButton aria-label="edit" onClick={this.onReviewEditOpenModal.bind(this,review.id)}>
                                                    <img src={EditIcon}/>
                                                </IconButton>
                                            </CardActions>
                                    :""}
                                />
                                <CardContent>
                                    <Typography component="p">
                                        {review.review}
                                    </Typography>
                                </CardContent>
                            </Card>
                    )):""}
                </Collapse>
            </Card>
            <Modal open={this.state.open} onClose={this.onCloseModal}>
                <form>
                    <div className="form-group">
                        <label>Movie Title</label>
                        <input type="text" className="form-control" id="movie-edit-title-input" placeholder="Enter Title"/>
                        <small className="form-text text-muted">You can edit any movie later</small>
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input type="text" className="form-control" id="movie-edit-genre-input" placeholder="Enter Genre"/>
                        <small className="form-text text-muted">Enter the genre of the movie</small>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" id="movie-edit-description-input" placeholder="Enter Description"/>
                        <small className="form-text text-muted">Give a small description of the movie</small>
                    </div>
                    <div className="form-group">
                        <label>Director</label>
                        <input type="text" className="form-control" id="movie-edit-director-input" placeholder="Enter Director"/>
                        <small className="form-text text-muted">Enter the director of the movie</small>
                    </div>
                    <button type="button" className="btn" onClick={this.updateMovie.bind(this, currentMovie.id, currentMovie.rating)}>Save</button>
                </form>
            </Modal>
            <Modal open={this.state.reviewOpen} onClose={this.onReviewCloseModal}>
                <form>
                    <div className="form-group">
                        <label>Review</label>
                        <input type="text" className="form-control" id="review-input" placeholder="Enter Review"/>
                        <small className="form-text text-muted">Enter your review of the movie</small>
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <input type="number" min="1" max="5" className="form-control" id="review-rating-input" placeholder="Enter Rating"/>
                        <small className="form-text text-muted">Enter your rating of the movie, out of 5</small>
                    </div>
                    <button type="button" className="btn" onClick={this.newReview.bind(this, currentMovie.id,this.props.userID)}>Submit</button>
                </form>
            </Modal>
            <Modal open={this.state.reviewEditOpen} onClose={this.onReviewEditCloseModal}>
                <form>
                    <div className="form-group">
                        <label>Review</label>
                        <input type="text" className="form-control" id="review-edit-input" placeholder="Enter Review"/>
                        <small className="form-text text-muted">Enter your new review of the movie</small>
                    </div>
                    <div className="form-group">
                        <label>Rating</label>
                        <input type="number" min="1" max="5" className="form-control" id="review-edit-rating-input" placeholder="Enter Rating"/>
                        <small className="form-text text-muted">Enter your new rating of the movie, out of 5</small>
                    </div>
                    <button type="button" className="btn" onClick={this.updateReview.bind(this)}>Update</button>
                </form>
            </Modal>
        </div>
        );
    }

    componentWillReceiveProps(nextProps:any){
        if(this.props.currentMovie !== nextProps.currentMovie){
            this.setState({ 
                expand: false,
            })
        }
    }
    

    handleExpandClick = () => {
        this.setState(state => ({ expand: !state.expand }));
    };

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	};
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};

        // Modal Open
    private onReviewOpenModal = () => {
        this.setState({ reviewOpen: true });
	};
    
    // Modal Close
    private onReviewCloseModal = () => {
		this.setState({ reviewOpen: false });
    };
    
    // Modal Open
    private onReviewEditOpenModal(iD:any) {
        this.setState({ 
            reviewEditOpen: true, 
            currentReviewID: iD
        });
	};
    
    // Modal Close
    private onReviewEditCloseModal = () => {
		this.setState({ reviewEditOpen: false });
	};

    // DELETE movie
    private deleteMovie(id: any) {
        const url = "https://movieapi.azurewebsites.net/api/MovieItems/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
    }

    // PUT movie
    private updateMovie(){
        const titleInput = document.getElementById("movie-edit-title-input") as HTMLInputElement
        const genreInput = document.getElementById("movie-edit-genre-input") as HTMLInputElement
        const descriptionInput = document.getElementById("movie-edit-description-input") as HTMLInputElement
        const directorInput = document.getElementById("movie-edit-director-input") as HTMLInputElement

        if (titleInput === null || genreInput === null || descriptionInput === null || directorInput === null) {
			return;
		}
    
        const { currentMovie } = this.props
        const url = "https://movieapi.azurewebsites.net/api/MovieItems/" + currentMovie.id
        const updatedTitle = titleInput.value
        const updatedGenre = genreInput.value
        const updatedDescription = descriptionInput.value
        const updatedDirector = directorInput.value

        const formData = new FormData()
        formData.append("title",updatedTitle)
        formData.append("genre", updatedGenre)
        formData.append("rating", currentMovie.rating)
        formData.append("description", updatedDescription)
        formData.append("director", updatedDirector)

		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'PUT'
		})
        .then((response : any) => {
            console.log(response)
			if (!response.ok) {
				// Error State
				alert(response.statusText + " " + url)
			} else {
                location.reload()
			}
		  })
    }


    private newReview(movieID:any, userID:any){
        const reviewInput = document.getElementById("review-input") as HTMLInputElement
        const ratingInput = document.getElementById("review-rating-input") as HTMLInputElement
        const url = "https://movieapi.azurewebsites.net/api/ReviewItems/upload"

        if (reviewInput === null || ratingInput === null) {
            return;
        }

        const review =  reviewInput.value
        const rating = ratingInput.value

        const formData = new FormData()
        formData.append("review", review)
        formData.append("refID", movieID)
        formData.append("name", this.props.userName)
        formData.append("uID", userID)
        formData.append("rating", rating)
        fetch(url, {
            body:formData,
            headers: {'cache-control': 'no-cache'},
            method: 'POST'
        }).then((response : any) => {
            if (!response.ok) {
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }

    private deleteReview(id: any){
        const url = "https://movieapi.azurewebsites.net/api/ReviewItems/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
    }

    private updateReview(){
        const { reviews } = this.props
        console.log(this.state.currentReviewID)
        const reviewInput = document.getElementById("review-edit-input") as HTMLInputElement
        const ratingInput = document.getElementById("review-edit-rating-input") as HTMLInputElement
        let currentReview:any
        for(let i = 0; i < reviews.length; i++){
            if(reviews[i].id === this.state.currentReviewID){
                currentReview = reviews[i]
            }
        }



        const url = "https://movieapi.azurewebsites.net/api/ReviewItems/" + this.state.currentReviewID
        const updatedReview = reviewInput.value
        const updatedRating = ratingInput.value
        fetch(url, {
            body: JSON.stringify({
                "id": currentReview.id,
                "revRefID": currentReview.revRefID,
                "name": currentReview.name,
                "rating": updatedRating,
                "uploaded": currentReview.uploaded,
                "uid": currentReview.uid,
                "review": updatedReview
            }),
            headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
            method: 'PUT'
        }).then((response : any) => {
            if (!response.ok) {
                // Error State
                alert(response.statusText + " " + url)
            } else {
                location.reload()
            }
        })
    }

    private downloadImage(url: any){
        window.open(url)
    }

}


