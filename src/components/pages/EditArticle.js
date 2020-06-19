import React, { Component } from "react";
import axios from "axios";

class EditArticle extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);

        this.state = {
            article_id: "",
            user_id: "",
            name: "",
            title: "",
            body: "",
        };
    }
    componentDidMount() {
        console.log("component mounted");
        axios
            .get("/api/articles/" + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    article_id: res.data.article_id,
                    user_id: res.data.user_id,
                    name: res.data.name,
                    title: res.data.title,
                    body: res.data.body,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const article = {
            article_id: this.state.article_id,
            title: this.state.title,
            body: this.state.body,
        };

        axios
            .post("/api/articles/" + this.state.article_id, article)
            .then(() => console.log("update successful"));

        this.props.history.push("/");
    }

    deleteArticle(id) {
        axios
            .delete("/api/articles/" + this.state.article_id)
            .then(() => console.log("deleted from the DB"));

        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <h1>Edit Article</h1>
                <form onSubmit={this.onSubmit}>
                    <div id="form-group">
                        <label>Title:</label>
                        <input
                            className="form-control"
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div id="form-group">
                        <label>Body:</label>
                        <textarea
                            className="form-control"
                            name="body"
                            value={this.state.body}
                            onChange={this.onChangeBody}
                        ></textarea>
                    </div>
                    <br />
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Edit"
                    />
                </form>
                <br />
                <button
                    className="btn btn-danger delete-article"
                    data-id={this.state.article_id}
                    onClick={() => {
                        this.deleteArticle(this.state.article_id);
                    }}
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default EditArticle;
