import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import MovieLogo from './video.png';


interface IState {
	currentMovie: any,
	movies: any[],
	open: boolean,
	uploadFileList: any,
}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			currentMovie: {"id":0, "title":"Loading ","genre":"","rating":"","description":"","director":"","url":"","uploaded":"","width":"0","height":"0"},
			movies: [],
			open: false,
			uploadFileList: null
		}     
		
		this.fetchMovies("")
		this.selectNewMovie = this.selectNewMovie.bind(this)
		this.handleFileUpload = this.handleFileUpload.bind(this)
		this.fetchMovies = this.fetchMovies.bind(this)
		this.uploadMovie = this.uploadMovie.bind(this)
		
	}

	public render() {
		const { open } = this.state;
		return (
		<div>
			<div className="header-wrapper">
				<div className="container header">
					<img src={MovieLogo} height='40'/>&nbsp; Movie Bank &nbsp;
					<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenModal}>Add Movie</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-7">
						<MovieDetail currentMovie={this.state.currentMovie} />
					</div>
					<div className="col-5">
						<MovieList movies={this.state.movies} selectNewMovie={this.selectNewMovie} searchByTitle={this.fetchMovies}/>
					</div>
				</div>
			</div>
			<Modal open={open} onClose={this.onCloseModal}>
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
	
	// Change selected memovieme
	private selectNewMovie(newMovie: any) {
		this.setState({
			currentMovie: newMovie
		})
	}

	// GET moviess
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
}

export default App;