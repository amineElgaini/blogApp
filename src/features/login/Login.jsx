import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/ProfilSlice";
import { Link, Navigate } from "react-router-dom";
function Login() {
    const username = useRef("");
    const password = useRef("");
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    if (auth.userInfo?.id) {
        return <Navigate to={"/profile"} replace={true} />;
    }

    const submitForm = () => {
        const payload = {
            username: username.current.value.trim(),
            password: password.current.value.trim(),
        };
        dispatch(fetchUser(payload));
    };
    
    return (
        <>
            <div className="flex flex-col items-center gap-10">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="username">UserName</Label>
                    <Input
                        ref={username}
                        type="text"
                        id="username"
                        placeholder="Username"
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        ref={password}
                        type="text"
                        id="password"
                        placeholder="Password"
                    />
                </div>

                <div className="grid w-full max-w-sm">
                    <Button className="ms-auto" onClick={submitForm}>
                        Submit
                    </Button>
                </div>
                <Link to={"/blogApp/signIn"}>SignIn</Link>
                <span className="text-red-500 text-bold font-bold text-xl">
                    {auth.error}
                </span>
            </div>
        </>
    );
}

export default Login;
