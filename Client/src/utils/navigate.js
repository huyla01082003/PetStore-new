import { useLocation, useNavigate } from "react-router-dom";

export function withNavigation(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        const location = useLocation();
        return <Component {...props} navigate={navigate} location={location} />;
    }
}