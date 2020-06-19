import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Article = (props) => {
    return (
        <tr>
            <td>{props.index}</td>
            <td>{props.article.name}</td>
            <td>
                <Link to={"/articles/" + props.article.article_id}>
                    {props.article.title}
                </Link>
            </td>
            <td>{props.article.added_date.substring(0, 10)}</td>
        </tr>
    );
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.articleList = this.articleList.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.state = { articles: [], search: "" };
    }

    componentDidMount() {
        axios
            .get("/api/articles")
            .then((res) => {
                this.setState({ articles: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    articleList(articles) {
        return articles.map((article, index) => {
            return (
                <Article
                    article={article}
                    key={article.article_id}
                    index={index + 1}
                />
            );
        });
    }

    onChangeSearch(e) {
        this.setState({
            search: e.target.value,
        });
    }

    render() {
        let filteredArticles = this.state.articles.filter((article) => {
            return article.title.indexOf(this.state.search) !== -1;
        });

        return (
            <div className="container">
                <h1>Articles</h1>
                <br />
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.search}
                        onChange={this.onChangeSearch}
                    />
                </div>
                <br />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>{this.articleList(filteredArticles)}</tbody>
                </table>
            </div>
        );
    }
}

export default Home;
