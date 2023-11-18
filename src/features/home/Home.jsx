import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div className="flex justify-center items-center relative after:content-[''] after:left-0 after:top-0 after:absolute after:w-full after:h-full after:bg-black/60 after:z-1">
                <div className="absolute z-10 max-w-md text-center">
                    <h1 className="mb-10 text-white font-extrabold text-4xl">We Have A Lot Of Interesting Blogs</h1>
                    <Link to={'/post'}>
                        <Button>See Posts</Button>
                    </Link>
                </div>
                <img
                    className="w-screen object-cover"
                    style={{ height: "calc(100vh - 70px)" }}
                    alt="err"
                    src={"http://localhost:5173/src/assets/blog.jpg"}
                />
            </div>
        </>
    );
}

export default Home;
