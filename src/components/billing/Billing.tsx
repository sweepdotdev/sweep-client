import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StripeProvider from "@/components/billing/stripe-provider";

export default function Billing(): ReactElement {
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Billing</CardTitle>
                </CardHeader>
                <CardContent>
                    <StripeProvider />
                </CardContent>
            </Card>
        </div>
    );
}
