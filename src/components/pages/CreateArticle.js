import React, { Component } from "react";
import axios from "axios";

class CreateArticle extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            body: "",
        };
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

    async onSubmit(e) {
        e.preventDefault();
        let token = localStorage.getItem("jwt");
        if (!token) {
            localStorage.setItem("jwt", "");
            token = "";
            alert("please sign in to create an article");
            this.props.history.push("/");
        } else {
            const article = {
                title: this.state.title,
                body: this.state.body,
            };
            try {
                const res = await axios.post("/api/articles/add", article, {
                    headers: { "x-auth-token": token },
                });
                if (res) {
                    this.props.history.push("/");
                } else {
                    alert(
                        "Not a valid user! Please sign up to create an article!"
                    );
                    window.location = "/";
                }
            } catch (err) {
                alert("Not a valid token! Please sign in to create an article");
                window.location = "/";
            }
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Add Article</h1>
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
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}

export default CreateArticle;
