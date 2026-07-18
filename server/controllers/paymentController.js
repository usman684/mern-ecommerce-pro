import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount PKR mein aayega

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Stripe amount "smallest currency unit" mein leta hai (paisa/cents)
    // PKR ke liye bhi *100 karna hota hai
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
