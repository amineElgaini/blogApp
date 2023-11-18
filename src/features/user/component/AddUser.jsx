import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { addUser } from "../../../store/userSlice";

function AddUser() {
    const username = useRef("");
    const password = useRef("");
    const groupId = useRef("");
    const img = useRef("");
    const [error, setError] = useState({});

    const validation = (username, password, groupId) => {
        let errors = {};
        if (username.length < 4) {
            errors.username = "Username Should Be Greater Than 4 Caracters";
        }
        if (password.length < 4) {
            errors.password = "Password Should Be Greater Than 4 Caracters";
        }
        if (!["1", "0"].includes(groupId)) {
            errors.groupId = "Id Should Be either 1 or 0";
        }
        return errors;
    };

    const handleSubmit = () => {
        const valueUsername = username.current.value.trim();
        const valuePassword = password.current.value.trim();
        const valueImg = img.current.value.trim();
        const valueGroupId = groupId.current.value.trim();
        const errors = validation(valueUsername, valuePassword, valueGroupId);
        if (Object.keys(errors).length === 0) {
            dispatch(
                addUser({
                    username: valueUsername,
                    password: valuePassword,
                    img: valueImg,
                    groupId: valueGroupId,
                })
            );
        }
        setError(errors);
    };

    const dispatch = useDispatch();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Add a new user here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="pt-2 self-start text-right">
                            Username
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="username"
                                placeholder="Name"
                                ref={username}
                            />
                            {error.username ? (
                                <small className="text-red-500">
                                    {error.username}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="pt-2 self-start text-right">
                            Password
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="password"
                                placeholder="Password"
                                className="col-span-3"
                                ref={password}
                            />
                            {error.password ? (
                                <small className="text-red-500">
                                    {error.password}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="img" className="pt-2 self-start text-right">
                            Image
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="img"
                                placeholder="Image"
                                className="col-span-3"
                                ref={img}
                            />
                            {error.img ? (
                                <small className="text-red-500">
                                    {error.img}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="groupId"
                            className="pt-2 self-start text-right"
                        >
                            GroupId
                        </Label>
                        <div className="col-span-3">
                            <Input
                                id="groupId"
                                placeholder="0 for user, 1 for admin"
                                ref={groupId}
                            />
                            {error.groupId ? (
                                <small className="text-red-500">
                                    {error.groupId}
                                </small>
                            ) : (
                                <small className="invisible">placeholder</small>
                            )}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    {/* <DialogClose> */}
                    <Button
                        className="ms-auto"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Add User
                    </Button>
                    {/* </DialogClose> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddUser;
