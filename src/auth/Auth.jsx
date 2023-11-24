import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Auth({ groupId = [-1], children }) {
    const user = useSelector((state) => state.auth);
    if (groupId.includes(+user.userInfo.groupId)) {
        return children;
    }
    if (groupId == -1) {
        return children;
    }

    return <Navigate to={"/blogApp"} />;
}

export default Auth;
