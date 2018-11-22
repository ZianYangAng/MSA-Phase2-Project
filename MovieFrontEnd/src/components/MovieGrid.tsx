import MediaStreamRecorder from 'msr';
import * as React from "react";
import MicImage from "./../microphone.png"
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


interface IProps {
    movies: any[],
    selectNewMovie: any,
    searchByTitle: any,
    userName: string,
    authenticated: boolean
}


export default class MovieGrid extends React.Component<IProps, {}> {

    constructor(props: any){
        super(props)
        this.searchByTitle = this.searchByTitle.bind(this)
    }

    public render() {
        const { movies, userName, authenticated } = this.props
        return(
            <div className="container movie-list-wrapper">  
                <div className="row movie-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-title-textbox" className="form-control" placeholder="Search By Title" />
                        <div className="input-group-append">
                            <div className="btn" onClick={this.searchTitleByVoice}><img src={MicImage}/></div>
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByTitle}>Search</div>
                        </div>
                    </div>  
                </div>
                <GridList cellHeight={300}>
                    {(authenticated) ?
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Welcome {userName}!</ListSubheader>
                    </GridListTile>
                    :""}
                    {(!authenticated) ?
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Welcome to Movie Bank</ListSubheader>
                    </GridListTile>
                    :""}
                    {movies.map(movie => (
                            <GridListTile key={movie.id} onClick={this.selectGridTile.bind(this)} className="grid">
                                <img src={movie.url}/>
                                <GridListTileBar 
                                title={movie.title}
                                subtitle={
                                <div>
                                <span>Director: {movie.director}</span>
                                <br/>
                                <span>Genre: {movie.genre}</span>
                                </div>
                                }
                                />
                            </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }

    // Movie selection handler to display selected movie in details component
    private selectGridTile(index: any) {
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