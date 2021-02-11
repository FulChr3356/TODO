import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, ButtonGroup, Container, Table ,Form, FormGroup, Input, Label } from 'reactstrap';
import AuthService from "./auth.service";




export default class Registration extends Component {
    constructor(props) {
        super();
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeCPassword = this.onChangeCPassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            cpassword: "",
            successful: false,
            message: "",
            role: ""
        };
    }
    validate(email, username, password,cpassword){
        return !((username.length < 3 || username.length > 20) || (password.length < 6 || password.length > 40) || password != cpassword);


    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onChangeCPassword(e) {
        this.setState({
            cpassword: e.target.value
        });
    }
        onChangeRole(e) {
            this.setState({
                role: e.target.value
            });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });


        if(!this.validate(this.state.email,this.state.username,this.state.password,this.state.cpassword)){
            alert('Invalid parameters');
            return;
        }


        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.role
        ).then(
            response => {
                this.setState({
                    message: response,
                    successful: true
                });

            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
        alert('Registered successfully');
        this.props.history.push('../');
    }


    render() {
        return (
            <div>
                <div className="split left">
                    <div className="centered">
                        <h1>
                            Sign up
                        </h1>
                        <hr id="hr2" />
                        <Form

                        >
                            <FormGroup>
                                <Label for="name">Username</Label>
                                <Input type="text"
                                       className="form-control"
                                       name="username"
                                       value={this.state.username}
                                       onChange={this.onChangeUsername}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text"
                                       className="form-control"
                                       name="email"
                                       value={this.state.email}
                                       onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Role</Label>
                                <Input type="text"
                                       className="form-control"
                                       name="role"
                                       value={this.state.role}
                                       onChange={this.onChangeRole}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input type="password"
                                       className="form-control"
                                       name="password"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm Password</Label>
                                <Input type="password"
                                       className="form-control"
                                       name="cpassword"
                                       value={this.state.cpassword}
                                       onChange={this.onChangeCPassword}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick= {this.handleRegister}>Register</Button>
                            </FormGroup>

                        </Form>
                        <p>
                            Once you click Register you agree with our Terms and Condtions
                        </p>
                    </div>
                </div>
                <hr id="vl" />
                <div className="split right">
                    <div className="centered">
                        <h1>
                            Already have an account?
                        </h1>
                        <Link className="nav-link" to={"/"}>
                            <Button style = {{backgroundColor: "#2196f3"}}>
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}