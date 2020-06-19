import React, { Component } from "react";
import axios from "axios";

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePwd = this.onChangePwd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            username: "",
            password: "",
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangePwd(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        const res = await axios.post("/api/users/login", user);
        if (res.data.jwt !== undefined) {
            localStorage.setItem("jwt", res.data.jwt);
            window.location = "/";
        } else {
            localStorage.setItem("jwt", "");
            this.props.history.push("/sign-in");
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Sign In</h1>
                <form onSubmit={this.onSubmit}>
                    <div id="form-group">
                        <label>email:</label>
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div id="form-group">
                        <label>password:</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChangePwd}
                        />
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

export default SignIn;
