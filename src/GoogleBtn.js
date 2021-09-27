import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import {MultiStep} from 'react-multistep'
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";


const CLIENT_ID =
  "245895509013-e2a2g51aeesmfh79i9nhubkupfk7jhfq.apps.googleusercontent.com";

  const steps = [
    {name: 'StepOne', component: <StepOne/>},
    {name: 'StepTwo', component: <StepTwo/>},
    {name: 'StepThree', component: <StepThree/>},
    {name: 'StepFour', component: <StepFour/>}
  ];


class GoogleBtn extends Component {

    constructor(props) {

        super(props);
   
    this.state = {
      name: "",
      isLogined: false,
      addressSaved: false,
      googleId: "",
      theAddress: "",
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.googleId) {
      this.setState((state) => ({
        isLogined: true,
        googleId: response.googleId,
        name: response.profileObj.name,
      }));
    }
  }

  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      googleId: "",
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  handleSave = () => {
    this.setState((state) => ({
      addressSaved: true,
    }));
    localStorage.setItem(
      "UserData",
      JSON.stringify({ name: this.state.name, address: this.state.theAddress })
    );
  };

  

  

  render() {
    return (
      <div>
        {this.state.isLogined ? (
          <div>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.logout}
              onFailure={this.handleLogoutFailure}
            ></GoogleLogout>
            <Multistep showNavigation={true} steps={steps}/>

            <input
              onChange={(e) => {
                this.setState({ theAddress: e.target.value });
              }}
              t
              placeholder="Enter your address"
            />
            <button onClick={this.handleSave}>Save address</button>
          </div>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
        {this.state.googleId ? (
          <h5>
            Your Google Id: <br />
            <br /> {this.state.googleId}
          </h5>
        ) : null}
        {this.state.addressSaved ? (
          <h5>
            your address <br />
            <br /> {this.state.theAddress}
          </h5>
        ) : null}
      </div>
    );
  }
}

export default GoogleBtn;


