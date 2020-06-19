import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/pages/Home";
import CreateArticle from "./components/pages/CreateArticle";
import ArticlePage from "./components/pages/ArticlePage";
import EditArticle from "./components/pages/EditArticle";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import axios from "axios";
import userContext from "./context/userContext";

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkSignedIn = async () => {
            let token = localStorage.getItem("jwt");
            if (token === null) {
                localStorage.setItem("jwt", "");
                token = "";
            }
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
                    setUserData({
                        token,
                        user: userRes.data,
                    });
                }
            } catch (err) {
                console.log(err);
                localStorage.setItem("jwt", "");
            }
        };
        checkSignedIn();
    }, []);

    return (
        <Router>
            <userContext.Provider value={{ userData, setUserData }}>
                <NavBar />
                <br />
                <br />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route
                        exact
                        path="/articles/add"
                        component={CreateArticle}
                    />
                    <Route exact path="/articles/:id" component={ArticlePage} />
                    <Route
                        exact
                        path="/articles/edit/:id"
                        component={EditArticle}
                    />
                </Switch>
                <hr />
                <Footer />
            </userContext.Provider>
        </Router>
    );
}

export default App;
