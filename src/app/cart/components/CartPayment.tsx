import { SiMediamarkt } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FormattedPrice from "@/components/FormattedPrice";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { RotatingLines } from 'react-loader-spinner'

const CartPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  useEffect(() => {
    let amt = 0;
    productData.map((item: StoreProduct) => {
      amt += Number(item.price) * item.quantity;
      return;
    });
    setTotalAmount(amt);
  }, [productData]);

  // Striep payment
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );

  const { data: session } = useSession();

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    setIsLoadingCheckout(true);
    //save temporary order to database and give the id to the checkout below
    //if success return to success page and save temp order to actually db

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: productData, email: session?.user?.email,  }),
    });
    const checkoutSession = await response.json();

    //save temporary stripe session id
    await fetch("/api/order/stripe_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: checkoutSession.id, email: session?.user?.email,  }),
    });

    // Redirecting user/customer to Stripe Checkout
    const result: any = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.id,
    });

    if (result.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 rounded-full p-1 h-6 w-6 text-sm text-white flex items-center justify-center mt-1">
          <SiMediamarkt />
        </span>
        <p className="text-sm">
          Your order qualifies for FREE Shipping by Choosing this option at
          checkout. See details....
        </p>
      </div>
      <p className="flex items-center justify-between px-2 font-semibold">
        Total:{" "}
        <span className="font-bold text-xl">
          <FormattedPrice amount={totalAmount} />
        </span>
      </p>
      {userInfo ? (
        <div className="flex flex-col items-center">
          <div
            className="w-full flex flex-row items-center justify-center h-10 text-sm font-semibold bg-amazon_blue text-white rounded-lg hover:bg-amazon_yellow hover:text-black duration-300"
          >
            <button
              onClick={handleCheckout}
              className=""
              disabled={isLoadingCheckout ? true : false}
            >
              Proceed to Buy &nbsp;
            </button>
            {isLoadingCheckout && (
              <div className="text-left">
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button className="w-full h-10 text-sm font-semibold bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
