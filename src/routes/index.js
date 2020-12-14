import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({children, ...props}) => {

    const isLoggedIn = window.localStorage.getItem('username');

    !isLoggedIn  && delete props.component;

    return (<Route
    {...props}
    render={() => !isLoggedIn && <Redirect to="/login" />}
    >
</Route>);
}