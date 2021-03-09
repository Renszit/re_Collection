import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome to recollection</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
