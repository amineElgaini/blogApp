import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function TableRender() {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-36">
                            <Skeleton className="w-100 h-4" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-100 h-4" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="w-100 h-4" />
                        </TableHead>
                        <TableHead  className="w-36">
                            <Skeleton className="w-100 h-4" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {'0123456789'.split('').map((e) => (
                        <TableRow key={e}>
                            <TableCell className="font-medium">
                                <Skeleton className="w-100 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-100 h-4" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="w-100 h-4" />
                            </TableCell>
                            <TableCell className="flex justify-center gap-2">
                                <Skeleton className="w-6 h-100" />
                                <span>|</span>
                                <Skeleton className="w-6 h-100" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default TableRender;
