import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
function SelectUser({setSearchParams, defaultValue = "", setAuthorParent }) {
    const [open, setOpen] = React.useState(false);
    const [author, setAuthor] = React.useState(defaultValue);

    const users = useSelector((state) => state.user);

    const usersOptions = users.users.map((user) => {
        return { value: `${user.id}`, label: `${user.username} [${user.id}]` };
    });
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {author
                        ? usersOptions.find((user) => user.value === author)
                              ?.label
                        : "Select user..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search user..." />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                        {usersOptions.map((user) => (
                            <CommandItem
                                key={user.value}
                                value={user.value}
                                onSelect={(currentValue) => {
                                    setAuthor(
                                        currentValue === author
                                            ? ""
                                            : currentValue
                                    );
                                    setAuthorParent(
                                        currentValue === author
                                            ? ""
                                            : currentValue
                                    );
                                    setSearchParams((p) => {
                                        p.set(
                                            "author",
                                            currentValue === author
                                                ? ""
                                                : currentValue
                                        );
                                        return p;
                                    });
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        author === user.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {user.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default SelectUser;
