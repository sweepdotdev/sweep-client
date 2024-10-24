import { ReactElement, useState } from "react";
import { Elements, EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { stripe } from "@/lib/stripe";
import { useQuery } from "@tanstack/react-query";
import { createIntent } from "@/requests/payments/create-intent";
import { Loader } from "lucide-react";

export default function StripeProvider(): ReactElement {
    const intentRequest = useQuery({
        queryKey: ["createPaymentIntent"],
        queryFn: async () => await createIntent(),
    });

    const [clientSecret, setClientSecret] = useState<string>("");

    if (intentRequest.isLoading) {
        return (
            <div className={"h-full w-full flex items-center justify-center"}>
                <Loader className={"h-10 w-10 animate-spin"} />
            </div>
        );
    }

    let element = <></>;
    stripe!
        .initEmbeddedCheckout({ clientSecret: intentRequest.data?.data.client_secret })
        .then(() => {
            element = (
                <Elements
                    stripe={stripe}
                    options={{ clientSecret: intentRequest.data?.data.client_secret }}
                >
                    <EmbeddedCheckoutProvider
                        stripe={stripe}
                        options={{ clientSecret: intentRequest.data?.data.client_secret }}
                    >
                        <EmbeddedCheckout></EmbeddedCheckout>
                    </EmbeddedCheckoutProvider>
                </Elements>
            );
        });

    return element;
}
