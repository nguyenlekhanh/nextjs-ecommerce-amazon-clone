//const devLink = "http://localhost:3000/"
const env = process.env.NODE_ENV;  //development or production

export const base_url = env == "development" ? "http://localhost:3000" : "http://localhost:3000";
export const STRIPE_STATUS_COMPLETE = "complete";