import AuthService from "./auth.service"
import {Component} from "react/cjs/react.production.min";

class Dashboard extends Component{


    constructor(props) {
        super();
    }

    async componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user

            });
        }
        else{
            this.props.history.push("../");
        }
    }

    render() {

        return(
            <div>
                <h1>Hello Dashboard</h1>
                </div>
        );
    }
}

export default Dashboard;