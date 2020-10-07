import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ProfileDetails from "./components/user/ProfileDetails";
import Settings from "./components/SettingsPage";
import LoginPage from "./components/LoginPage";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Switch, Route,Redirect } from "react-router-dom";
import axios from 'axios';
import './index.css';

import * as serviceWorker from './serviceWorker';

function ProfileMenu(props) {
    let {changeMenu} = props;
    return (
        <div className="profile-menu">
            <hr />
            <div className="suggestion" onClick={() => {changeMenu("suggestion")}}>
                suggestion
            </div>
            <hr />
            <div className="request" onClick={() => {changeMenu("request")}}>
                request
            </div>
            <hr />
            <div className="follower" onClick={() => {changeMenu("followers")}}>
                follower
            </div>
            <hr />
        </div>
    );
}

function Profile(props) {
    return (
        <div className="profile">
            <ProfileDetails></ProfileDetails>           
            <ProfileMenu changeMenu={props.changeMenu}></ProfileMenu>
        </div>
    );
}

class UserView extends Component {
    state = {
        cMenu: "suggestions",
        list: []
    }

    changeMenu = async (nMenu) => {
        console.log(nMenu);
        let obj = await axios.get("/api/v1/users/fr/0442e634-cc01-44df-936a-37f5b1ee23a8");
        let uFollArr = [];
        if (nMenu == "followers") {
            uFollArr = obj.data.message.filter((follower) => { return follower.is_pending == 0 });
        } else if (nMenu == "request") {
            uFollArr = obj.data.message.filter(follower=> follower.is_pending == 1);
        }
        this.setState({
            cMenu: nMenu,
            list: uFollArr
        })
        // follower_id => user => details
    }
    render() {
        return (
            <div className="userView">
                <Profile changeMenu={this.changeMenu}></Profile>
                <MenuList list={this.state.list}></MenuList>
            </div>
        );
    }
}

function MenuList(props) {
    let { list } = props;
    return (
        <div className="menu-list">{list.map((follower) => {
            return (
                <div>
                    <hr />
                    <img src={follower.p_img_url} alt="profile-img"></img>
                    <div> {follower.email_id}</div>
                    <div>{follower.handle}</div>
                </div>
            );
        })}
        </div>
    );
}

function App() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/profile" exact>
                    <div className="app">
                        <UserView></UserView>
                        <div className="postView"> PostView</div>
                    </div>
                </Route>
                
                <Route path="/" exact>
                    <LoginPage></LoginPage>
                </Route>

                <Redirect path="/login" exact></Redirect>
                
                <Route path="/setting" exact>
                    <Settings></Settings>
                </Route>

                <Route>
                <PageNotFound></PageNotFound>
                </Route>
            </Switch>
        </React.Fragment >
    );
}

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
