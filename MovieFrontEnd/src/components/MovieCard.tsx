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
import { Typography, IconButton } from '../../node_modules/@material-ui/core';

interface IProps {
    currentMovie: any
    userID: any
    reviews: any[]
}

interface IState {
    clicked:boolean
    expand:boolean
}


export default class MovieCard extends React.Component<IProps, IState> {
    public constructor(props :any){
        super(props)
        this.state = {
            clicked: false,
            expand: false
        }
    }

    public render() {
        const { currentMovie } = this.props
        // let reviews: any[]
        // reviews = currentMovie.reviews
        // console.log(reviews)
        return(
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
                    <IconButton aria-label="delete">
                        <img src={DeleteIcon}/>
                    </IconButton>
                    <IconButton aria-label="edit">
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
                </Collapse>
            </Card>
        );
    }

    handleExpandClick = () => {
        console.log("clicked")
        this.setState(state => ({ expand: !state.expand }));
        this.forceUpdate
    };

}


