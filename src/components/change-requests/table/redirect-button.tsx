import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { SquareArrowUpRight } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Props {
    id: string;
}
export default function RedirectButton({ id }: Props): ReactElement {
    const redirect: NavigateFunction = useNavigate();
    return (
        <div className={"flex items-center"}>
            <Button
                size={"icon"}
                variant={"link"}
                onClick={() => redirect(`/change-requests/${id}`)}
            >
                <SquareArrowUpRight className={"h-5 w-5"} />
            </Button>
        </div>
    );
}
