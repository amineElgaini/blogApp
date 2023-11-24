import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TableRender from "@/components/table-render";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import PaginationControl from "../../components/PaginationControl";
import { fetchUsers } from "../../store/userSlice";
import UserTable from "./component/UserTable";
import AddUser from "./component/addUser";

function UsersDashboard() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const [searchByUserId, setSearchByUserId] = useState(user.search.id ?? "");

    const [pagination, setPagination] = useState(user.currentPagination);
    const PaginationInterval = user.pagination;
    const [firstRender, setFirstRender] = useState(true);

    // stop fetching if store is full
    useEffect(() => {
        const searchByUserIdValue =
            searchByUserId === "" ? undefined : searchByUserId;

        if (!firstRender || user.users.length === 0) {
            dispatch(
                fetchUsers({
                    pagination,
                    searchByUserIdValue,
                })
            );
        }
        if (location.state) {
            setSearchByUserId(location.state.id);
        }
        if (firstRender) {
            setFirstRender(false);
        }
    }, [pagination, searchByUserId]);

    return (
        <>
            <main>
                <div className="flex gap-2 items-center justify-between">
                    {/* <Button>Create User</Button> */}
                    <AddUser />
                </div>

                {/* Show Error Table */}
                {!user.loading && user.error ? (
                    <div>Error: {user.error}</div>
                ) : null}

                <hr className="my-4" />
                <div className="flex justify-between items-end my-4">
                    <div className="flex relative gap-2">
                        <div>
                            <Label>UserId:</Label>
                            <Input
                                id="searchId"
                                type="text"
                                placeholder="UserId"
                                className="max-w-[100px]"
                                value={searchByUserId}
                                onChange={(e) => {
                                    setPagination(1);
                                    setSearchByUserId(e.target.value.trim());
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span>
                            {user.currentPagination}/{user.pagination[1]}
                        </span>
                        <PaginationControl
                            pagination={pagination}
                            setPagination={setPagination}
                            PaginationInterval={PaginationInterval}
                        />
                    </div>
                </div>

                {/* Show Render Table */}
                {user.loading && <TableRender />}

                {user.users.length > 0 ? <UserTable /> : <h2 className="mt-10 text-gray-400 text-2xl text-center">No User Is Found</h2>}
            </main>
        </>
    );
}

export default UsersDashboard;
