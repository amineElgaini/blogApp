import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth({ groupId = [-1], children }) {
    /* 
        GroueId is who is alowed children is the requested page
    */
    const user = useSelector((state) => state.auth);
    if (user.loading === true) {
        return "loading...";
    } else if (groupId == -1 || groupId.includes(+user.userInfo.groupId)) {
        return children;
    }
    return <Navigate to={"/blogApp/post"} />;
}

export default Auth;
