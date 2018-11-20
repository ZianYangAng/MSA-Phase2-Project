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
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search By Title" />
                        <div className="input-group-append">
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
            children.push(<td key={"name" + i}>{movie.title}</td>)
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
        const tag = textBox.value 
        this.props.searchByTitle(tag)  
    }

}