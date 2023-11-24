import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="flex justify-center items-center relative after:content-[''] after:left-0 after:top-0 after:absolute after:w-full after:h-full after:bg-black/60 after:z-1">
                <div className="absolute z-10 max-w-md text-center">
                    <h1 className="mb-10 text-white font-extrabold text-4xl">We Have A Lot Of Interesting Blogs</h1>
                    <Link to={'/blogApp/post'}>
                        <Button>See Posts</Button>
                    </Link>
                </div>
                <img
                    className="w-screen object-cover"
                    style={{ height: "calc(100vh - 70px)" }}
                    alt="err"
                    src={"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                />
            </div>
        </>
    );
}

export default Home;
