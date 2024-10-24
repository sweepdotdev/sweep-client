import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUBLISHABLE_KEY: string | undefined = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY: string | undefined = import.meta.env.VITE_STRIPE_SECRET_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
    throw new Error("No Stripe API key!");
}

if (!STRIPE_SECRET_KEY) {
    throw new Error("No Stripe Secret Key!");
}

export const stripe: Stripe | null = await loadStripe(STRIPE_PUBLISHABLE_KEY);
