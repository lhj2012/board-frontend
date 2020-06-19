import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, NavbarText } from "reactstrap";
import userContext from "../../context/userContext";

function NavBar() {
    const { userData, setUserData } = useContext(userContext);
    const history = useHistory();
    const signUp = () => history.push("/sign-up");
    const signIn = () => history.push("/sign-in");
    const signOut = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("jwt", "");
    };
    if (userData.user) {
        console.log(userData.user);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Container>
                    <Link className="navbar-brand" to="/">
                        Board
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarsExampleDefault"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/articles/add">
                                    Add Articles
                                </Link>
                            </li>

                            {userData.user ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        onClick={signOut}
                                    >
                                        Sign Out
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            onClick={signUp}
                                        >
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            onClick={signIn}
                                        >
                                            Sign In
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <NavbarText>
                        Welcome {userData.user ? userData.user.username : null}
                    </NavbarText>
                </Container>
            </nav>
        </div>
    );
}

export default NavBar;
