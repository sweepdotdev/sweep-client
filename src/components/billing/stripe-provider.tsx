import { ReactElement, useEffect, useState } from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { AxiosResponse } from "axios";
import { Loader } from "lucide-react";
import { stripe } from "@/lib/stripe";
import useIntentMutation from "@/requests/billing/use-intent-mutation";

export default function StripeProvider(): ReactElement {
    const [clientSecret, setClientSecret] = useState("");
    const intentMutation = useIntentMutation();

    useEffect(() => {
        intentMutation.mutateAsync().then((res: AxiosResponse) => {
            setClientSecret(res.data.client_secret);
        });
    }, []);

    if (intentMutation.isPending) {
        return (
            <div className={"h-screen w-screen flex items-center justify-center"}>
                <Loader className={"h-10 w-10 animate-spin"} />
            </div>
        );
    }

    if (intentMutation.isSuccess) {
        return (
            <Elements stripe={stripe} options={{ clientSecret: clientSecret }}>
                <PaymentElement></PaymentElement>
            </Elements>
        );
    }

    return <Loader className={"h-10 w-10 animate-spin"} />;
}
