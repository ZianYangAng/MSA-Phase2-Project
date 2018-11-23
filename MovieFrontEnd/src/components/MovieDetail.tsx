import * as React from "react";
import Modal from 'react-responsive-modal';

interface IProps {
    currentMovie: any
    userID: any
}

interface IState {
    open: boolean
}

export default class MovieDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)   
        this.state = {
            open: false
        }
        
        this.updateMovie = this.updateMovie.bind(this)
    }

	public render() {
        const currentMovie = this.props.currentMovie
        console.log(currentMovie.uid)
        const { open } = this.state;
		return (
			<div className="container movie-wrapper">
                <div className="row movie-heading">
                    <b>{currentMovie.title}</b>&nbsp; ({currentMovie.genre}) ({currentMovie.director})
                </div>
                <div className="row movie-rating">
                    {currentMovie.rating}
                </div>
                <div className="row movie-date">
                    {currentMovie.uploaded}
                </div>
                <div className="row movie-img">
                    <img src={currentMovie.url}/>
                </div>
                <div className="row movie-description">
                    {currentMovie.description}
                </div>
                <div className="row movie-done-button">
                    <div className="btn btn-primary btn-action" onClick={this.downloadMovie.bind(this, currentMovie.url)}>Download </div>
                    {(this.props.userID === currentMovie.uid)?
                    <div>
                    <div className="btn btn-primary btn-action" onClick={this.onOpenModal}>Edit </div>
                    <div className="btn btn-primary btn-action" onClick={this.deleteMovie.bind(this, currentMovie.id)}>Delete </div>
                    </div>
                    :""}
                </div>
                <Modal open={open} onClose={this.onCloseModal}>
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
                        <button type="button" className="btn" onClick={this.updateMovie}>Save</button>
                    </form>
                </Modal>
            </div>
		);
    }

    // Modal Open
    private onOpenModal = () => {
        this.setState({ open: true });
	};
    
    // Modal Close
    private onCloseModal = () => {
		this.setState({ open: false });
	};

    // Open movie image in new tab
    private downloadMovie(url: any) {
        window.open(url);
    }

    // DELETE movie
    private deleteMovie(id: any) {
        const url = "https://moviebankapi.azurewebsites.net/api/MovieItems/" + id

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
        console.log("pressed")
        const titleInput = document.getElementById("movie-edit-title-input") as HTMLInputElement
        const genreInput = document.getElementById("movie-edit-genre-input") as HTMLInputElement
        const descriptionInput = document.getElementById("movie-edit-description-input") as HTMLInputElement
        const directorInput = document.getElementById("movie-edit-director-input") as HTMLInputElement

        if (titleInput === null || genreInput === null || descriptionInput === null || directorInput === null) {
			return;
		}

        console.log("hello")
        const currentMovie = this.props.currentMovie
        const url = "https://moviebankapi.azurewebsites.net/api/MovieItems/" + currentMovie.id
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
			headers: {'cache-control': 'no-cache', 'Content-Type':'multipart/form-data'},
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
}