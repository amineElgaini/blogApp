import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function SearchBox({ search='', setSearch='' }) {
    return (
        <div className="flex relative w-fit">
            <Input
                id="search"
                type="text"
                placeholder="Search"
                className="max-w-[200px]"
                value={search}
                onChange={(e) => setSearch(e.target.value.trim())}
            />
            {search !== "" && (
                <Button
                    className="absolute right-0 text-xl"
                    variant={"outline"}
                    onClick={() => setSearch("")}
                >
                    x
                </Button>
            )}
        </div>
    );
}

export default SearchBox;
