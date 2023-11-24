import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addUser } from "@/store/userSlice";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
    const username = useRef("");
    const password = useRef("");
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const validation = (username, password) => {
        let errors = {};
        if (username.length < 4) {
            errors.username = "Username Should Be Greater Than 4 Caracters";
        }
        if (password.length < 4) {
            errors.password = "Password Should Be Greater Than 4 Caracters";
        }
        return errors;
    };

    const submitForm = () => {
        const valueUsername = username.current.value.trim();
        const valuePassword = password.current.value.trim();
        const errors = validation(valueUsername, valuePassword);
        if (Object.keys(errors).length === 0) {
            dispatch(
                addUser({
                    username: valueUsername,
                    password: valuePassword,
                    groupId: 0,
                })
            );
            navigate("/blogApp/login");
        } else {
            setError(errors);
        }
    };
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">UserName</Label>
                <Input
                    ref={username}
                    type="text"
                    id="username"
                    placeholder="Username"
                />
                {error.username ? (
                    <small className="text-red-500">{error.username}</small>
                ) : <small className="invisible ">placeholder</small>}
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                    ref={password}
                    type="text"
                    id="password"
                    placeholder="Password"
                />
                {error.password ? (
                    <small className="text-red-500">{error.password}</small>
                ) : <small className="invisible ">placeholder</small>}
            </div>

            <div className="grid w-full max-w-sm">
                <Button className="ms-auto" onClick={submitForm}>
                    Submit
                </Button>
            </div>
            <Link to={'/blogApp/login'}>Login</Link>
        </div>
    );
}

export default SignIn;
