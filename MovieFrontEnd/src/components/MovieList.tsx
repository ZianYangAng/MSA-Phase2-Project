import MediaStreamRecorder from 'msr';
import * as React from "react";


interface IProps {
    movies: any[],
    selectNewMovie: any,
    searchByTitle: any
}

export default class MovieList extends React.Component<IProps, {}> {
    constructor(props: any) {
        super(props)   
        this.searchByTitle = this.searchByTitle.bind(this)
    }

	public render() {
		return (
			<div className="container movie-list-wrapper">
                <div className="row movie-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-title-textbox" className="form-control" placeholder="Search By Title" />
                        <div className="input-group-append">
                            <div className="btn" onClick={this.searchTitleByVoice}><i className="fa fa-microphone" /></div>
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTitle}>Search</div>
                        </div>
                    </div>  
                </div>
                <div className="row movie-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
		);
    }

    // Construct table using movie list
	private createTable() {
        const table:any[] = []
        const movieList = this.props.movies
        if (movieList == null) {
            return table
        }

        for (let i = 0; i < movieList.length; i++) {
            const children = []
            const movie = movieList[i]
            children.push(<td key={"id" + i}>{movie.id}</td>)
            children.push(<td key={"title" + i}>{movie.title}</td>)
            children.push(<td key={"genres" + i}>{movie.genre}</td>)
            children.push(<td key={"director" + i}>{movie.director}</td>)
            children.push(<td key={"rating" + i}>{movie.rating}</td>)
            table.push(<tr key={i+""} id={i+""} onClick= {this.selectRow.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Movie selection handler to display selected movie in details component
    private selectRow(index: any) {
        const selectedMovie = this.props.movies[index]
        if (selectedMovie != null) {
            this.props.selectNewMovie(selectedMovie)
        }
    }

    // Search movie by title
    private searchByTitle() {
        const textBox = document.getElementById("search-title-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const title = textBox.value 
        this.props.searchByTitle(title)  
    }

    private searchTitleByVoice(){
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                // this.postAudio(blob);
                mediaRecorder.stop()
                fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
                    body: blob, // this is a .wav audio file    
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer' + accessToken,
                        'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                        'Ocp-Apim-Subscription-Key': 'ac4a5739b2fa4d749b080822e01c167a'
                    },    
                    method: 'POST'
                }).then((res:any) => {
                    return res.json()
                }).then((res: any) => {
                    console.log(res.DisplayText)
                    const textBox = document.getElementById("search-title-textbox") as HTMLInputElement
                    textBox.value = (res.DisplayText as string).slice(0, -1)
                }).catch((error) => {
                    console.log("Error", error)
                });
            }
            mediaRecorder.start(3000);
        }
    
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
    
        function onMediaError(e: any) {
            console.error('media error', e);
        }
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'ac4a5739b2fa4d749b080822e01c167a'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });    
    }

}