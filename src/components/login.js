
import React, { Component } from "react";
import {  Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import AuthService from "./auth.service";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};



class Login extends Component {
    constructor(props) {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/dashboard");
            },
            error => {
                alert('Invalid creditials');
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.setState({
                    loading: false,
                    message: resMessage
                });
            }

        );


    }

    render() {
        return (
            <form>
                <div>
                    <hr />
                    <div>
                        <Form>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password"
                                       className="form-control"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                       validations={[required]}/>
                            </FormGroup>

                        </Form>
                    </div>
                    <div>

                        <Button style = {{backgroundColor: "#2196f3"}} onClick = {this.handleLogin}  > Sign in</Button>
                        <p>Forgot your password? <a href="" > Reset</a></p>
                        <div >
                            <Link className = "nav-link" to = {"/registration"}>
                                <Button style = {{backgroundColor: "#2196f3"}} > Create an account</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default Login;