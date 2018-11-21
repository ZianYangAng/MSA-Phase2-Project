import * as React from 'react';
import Modal from 'react-responsive-modal';
import * as Webcam from "react-webcam";
import './App.css';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import MovieLogo from './video.png';


interface IState {
	currentMovie: any,
	movies: any[],
	open: boolean,
	openAuthenticate: boolean,
	uploadFileList: any,
	authenticated: boolean,
	refCamera: any
	predictionResult:any
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			authenticated: false,
			currentMovie: {"id":0, "title":"Loading ","genre":"","rating":"","description":"","director":"","url":"","uploaded":"","width":"0","height":"0"},
			movies: [],
			open: false,
			openAuthenticate: false,
			predictionResult: null,
			refCamera: React.createRef(),
			uploadFileList: null
		}     
		
		this.fetchMovies("")
		this.selectNewMovie = this.selectNewMovie.bind(this)
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.fetchMovies = this.fetchMovies.bind(this)
		this.uploadMovie = this.uploadMovie.bind(this)
		this.authenticate = this.authenticate.bind(this)
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
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Login</div>
					:""}
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<MovieDetail currentMovie={this.state.currentMovie} authentication={this.state.authenticated}/>
					</div>
					<div className="col-5">
						<MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} searchByTitle={this.fetchMovies}/>
					</div>
				</div>
			</div>
			<Modal open={open} onClose={this.onCloseModal || open === false}>
			{(this.state.authenticated) ?
				<form>
					<div className="form-group">
						<label>Movie Title</label>
						<input type="text" className="form-control" id="movie-title-input" placeholder="Enter Title" />
						<small className="form-text text-muted">You can edit any movie later</small>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input type="text" className="form-control" id="movie-genre-input" placeholder="Enter Genre" />
						<small className="form-text text-muted">Tag is used for search</small>
					</div>
					<div className="form-group">
						<label>Rating</label>
						<input type="number" className="form-control" id="movie-rating-input" placeholder="Enter Rating" />
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
				:""}
				{(!this.state.authenticated) ?
					<div>
						<Webcam
						audio={false}
						screenshotFormat="image/jpeg"
						ref={this.state.refCamera}
						/>
						<div className="row nav-row">
							<div className="btn btn-primary bottom-button" onClick={this.authenticate}>Login</div>
						</div>
					</div>
				:""}
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
			currentMovie: newMovie
		})
	}

	// GET movies
	private fetchMovies(title: any) {
		let url = "https://moviebankapi.azurewebsites.net/api/MovieItems"
		if (title !== "") {
			url += "/title?=" + title
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
			this.setState({
				currentMovie,
				movies: json
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
		// const rating = ratingInput.value
		const description = descriptionInput.value
		const director = directorInput.value
		const url = "https://moviebankapi.azurewebsites.net/api/MovieItems/upload"

		const formData = new FormData()
		formData.append("Title", title)
		formData.append("Genre", genre)
		formData.append("Description", description)
		formData.append("Director", director)
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


	// Authenticate
	private authenticate() { 
		const screenshot = this.state.refCamera.current.getScreenshot();
		this.getFaceRecognitionResult(screenshot);
	}

	private getFaceRecognitionResult(image: string) {
		const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/fd596448-62e6-4381-89c6-fe17b8308d93/image?iterationId=b1773e0f-c64f-461a-beba-42e69cb5dbc9"
		if (image === null) {
			return;
		}
		const base64 = require('base64-js');
		const base64content = image.split(";")[1].split(",")[1]
		const byteArray = base64.toByteArray(base64content);
		fetch(url, {
			body: byteArray,
			headers: {
				'cache-control': 'no-cache', 'Prediction-Key': '1aa1ecbb127f42a48f9f40933cac1dc7', 'Content-Type': 'application/octet-stream'
			},
			method: 'POST'
		})
			.then((response: any) => {
				if (!response.ok) {
					// Error State
					alert(response.statusText)
				} else {
					response.json().then((json: any) => {
						console.log(json.predictions[0])
						this.setState({predictionResult: json.predictions[0] })
						if (this.state.predictionResult.probability > 0.7) {
							this.setState({
								authenticated: true,
								open:false
							})
							console.log()
						} else {
							this.setState({authenticated: false})
						}
					})
				}
			})
	}

}

export default App;
