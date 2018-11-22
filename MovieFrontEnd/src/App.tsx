import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
// import MovieDetail from './components/MovieDetail';
// import MovieList from './components/MovieList';
import MovieLogo from './video.png';
import  FacebookLogin  from 'react-facebook-login'
import MovieGrid from './components/MovieGrid'
import MovieCard from './components/MovieCard'


interface IState {
	currentMovie: any,
	movies: any[],
	open: boolean,
	uploadFileList: any,
	authenticated: boolean,
	userName:any,
	userID:any,
	reviews: any[]
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			authenticated: false,
			currentMovie: {"id":0, "title":"Loading ","genre":"","rating":"","description":"","director":"","url":"","uploaded":"","width":"0","height":"0"},
			movies: [],
			open: false,
			uploadFileList: null,
			userName: '',
			userID:null,
			reviews: []
		}     
		
		this.fetchMovies("")
		this.selectNewMovie = this.selectNewMovie.bind(this)
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.fetchMovies = this.fetchMovies.bind(this)
		this.uploadMovie = this.uploadMovie.bind(this)
		this.fetchReviews = this.fetchReviews.bind(this)
	}

	public render() {
		const { open } = this.state
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<img src={MovieLogo} height='40'/>&nbsp; Movie Bank &nbsp;
					{(this.state.authenticated) ?
						<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Movie</div>
					:""}
					{(!this.state.authenticated) ?
					<div className = "btn-add">
					<FacebookLogin
					cssClass="btnFacebook"
					appId="208193176783412"
					autoLoad={true}
					fields="name,email,picture"
					onClick={this.componentClicked}
					callback={this.responseFacebook} />
					</div>
					:""}
				</div>
			</div>
			<div className="container">
				{/* <div className="row">
					<div className="col-7">
						<MovieDetail currentMovie={this.state.currentMovie} userID={this.state.userID}/>
					</div>
					<div className="col-5">
						<MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} searchByTitle={this.fetchMovies}/>
					</div>
				</div> */}
				<div className="row">
				<div className="col-7">
				<MovieGrid 
					movies={this.state.movies} 
					selectNewMovie={this.selectNewMovie} 
					searchByTitle={this.fetchMovies} 
					userName={this.state.userName}
					authenticated={this.state.authenticated}
				/>
				</div>
				<div className="col-5">
				<MovieCard currentMovie={this.state.currentMovie} userID={this.state.userID} reviews={this.state.reviews}/>
				</div>
				</div>
			</div>
			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Movie Title</label>
						<input type="text" className="form-control" id="movie-title-input" placeholder="Enter Title" />
						<small className="form-text text-muted">Titles can be used to search</small>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input type="text" className="form-control" id="movie-genre-input" placeholder="Enter Genre" />
						<small className="form-text text-muted">Tag is used for search</small>
					</div>
					<div className="form-group">
						<label>Rating</label>
						<input type="number" className="form-control" id="movie-rating-input" placeholder="Enter Rating" min="1" max="5"/>
						<small className="form-text text-muted">Ratings are out of 5</small>
					</div>
					<div className="form-group">
						<label>Description</label>
						<input type="text" className="form-control" id="movie-description-input" placeholder="Enter Description" />
						<small className="form-text text-muted">Give a small description of the movie</small>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input type="text" className="form-control" id="movie-director-input" placeholder="Enter Director" />
						<small className="form-text text-muted">Give the director of the movie</small>
					</div>
					<div className="form-group">
						<label>Image</label>
						<input type="file" onChange={this.handleFileUpload} className="form-control-file" id="meme-image-input" />
					</div>
					<button type="button" className="btn" onClick={this.uploadMovie}>Upload</button>
				</form>
			</Modal>
		</div>
		);
	}

	// Modal open
	private onOpenModal = () => {
		this.setState({ open: true });
	  };
	
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};

	// Change selected movie
	private selectNewMovie(newMovie: any) {
		this.setState({
			currentMovie: newMovie,
			reviews: newMovie.reviews
		})
	}


	private componentClicked = () => {
		console.log("clicked")
	}

	private responseFacebook = (response:any) => {
		console.log(response)
		this.setState({
			userID: response.userID,
			userName: response.name,
			authenticated : true
		})
	}

	// GET movies
	private fetchMovies(title: any) {
		let url = "https://movieapi.azurewebsites.net/api/MovieItems"
		if (title !== "") {
			url += "/title?title=" + title
		}
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			let currentMovie = json[0]
			if (currentMovie === undefined) {
				currentMovie = {"id":0, "title":"No movies :(","genre":"","rating":"","description":"","director":"","url":"","uploaded":"","width":"0","height":"0"}
			}
			console.log(currentMovie)
			this.setState({
				currentMovie,
				movies: json
			})
			this.fetchReviews(this.state.currentMovie.id)
        });
	}

	private fetchReviews(iD: any) {
		console.log(iD)
		let url = "https://movieapi.azurewebsites.net/api/ReviewItems/revID?revID=" + iD
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			this.setState({
				reviews: json
			})
        });
	}

	// Sets file list
	private handleFileUpload(fileList: any) {
		this.setState({
			uploadFileList: fileList.target.files
		})
	}

	// POST movie
	private uploadMovie() {
		const titleInput = document.getElementById("movie-title-input") as HTMLInputElement
		const genreInput = document.getElementById("movie-genre-input") as HTMLInputElement
		const ratingInput = document.getElementById("movie-rating-input") as HTMLInputElement
		const descriptionInput = document.getElementById("movie-description-input") as HTMLInputElement
		const directorInput = document.getElementById("movie-director-input") as HTMLInputElement
		const imageFile = this.state.uploadFileList[0]

		if (titleInput === null || genreInput === null || ratingInput == null || descriptionInput == null || directorInput == null || imageFile === null) {
			return;
		}

		const title = titleInput.value
		const genre = genreInput.value
		const rating = ratingInput.value
		const description = descriptionInput.value
		const director = directorInput.value
		const url = "https://movieapi.azurewebsites.net/api/MovieItems/upload"

		const formData = new FormData()
		formData.append("Title", title)
		formData.append("Genre", genre)
		formData.append("Rating",rating)
		formData.append("Description", description)
		formData.append("Director", director)
		formData.append("UID", this.state.userID)
		formData.append("image", imageFile)

		fetch(url, {
			body: formData,
			headers: {'cache-control': 'no-cache'},
			method: 'POST'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		  })
	}
}

export default App;
