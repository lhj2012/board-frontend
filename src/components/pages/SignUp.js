import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePwd1 = this.onChangePwd1.bind(this);
        this.onChangePwd2 = this.onChangePwd2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: "",
            username: "",
            password1: "",
            password2: "",
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

    onChangePwd1(e) {
        this.setState({
            password1: e.target.value,
        });
    }

    onChangePwd2(e) {
        this.setState({
            password2: e.target.value,
        });
    }

    async onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            name: this.state.username,
            password: this.state.password1,
        };
        const existingUser = await axios.get("/api/users/" + user.email);
        if (!existingUser.data) {
            console.log("can register new user");
            if (this.state.password1 === this.state.password2) {
                axios
                    .post("/api/users", user)
                    .then((response) => console.log(response.data));
                this.props.history.push("/");
            } else {
                alert("the password does not match");
            }
        } else {
            alert("Your email is already signed up!");
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Sign Up</h1>
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
                        <label>Username:</label>
                        <input
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                        />
                    </div>

                    <div id="form-group">
                        <label>password:</label>
                        <input
                            className="form-control"
                            name="password1"
                            type="password"
                            value={this.state.password1}
                            onChange={this.onChangePwd1}
                        />
                    </div>

                    <div id="form-group">
                        <label>password confirmation:</label>
                        <input
                            className="form-control"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChangePwd2}
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

export default SignUp;
