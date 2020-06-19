import React, { Component } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class ArticlePage extends Component {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);

        this.state = {
            article_id: "",
            user_id: "",
            name: "",
            title: "",
            body: "",
        };
    }

    componentDidMount() {
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

    async onEdit() {
        let token = localStorage.getItem("jwt");
        if (!token) {
            localStorage.setItem("jwt", "");
            token = "";
            alert("Please sign in to edit your article");
            this.props.history.push("/");
        } else {
            try {
                const tokenRes = await axios.post(
                    "/api/users/validation",
                    null,
                    {
                        headers: { "x-auth-token": token },
                    }
                );
                if (tokenRes.data) {
                    const userRes = await axios.get("/api/users/", {
                        headers: { "x-auth-token": token },
                    });
                    if (userRes.user_id === this.state.user_id) {
                        this.props.history.push(
                            "/articles/edit/" + this.state.article_id
                        );
                    }
                }
                alert("Not a valid user!");
            } catch (err) {
                console.log(err);
                localStorage.setItem("jwt", "");
                alert(
                    "Not a valid token! Please sign in to edit your article!"
                );
                this.props.history.push("/");
            }
        }
    }

    render() {
        return (
            <Container>
                <h1>{this.state.title}</h1>
                <h3>{this.state.name}</h3>
                <p>{this.state.body}</p>
                <Link className="btn btn-primary" onClick={this.onEdit}>
                    Edit
                </Link>
            </Container>
        );
    }
}

export default ArticlePage;
