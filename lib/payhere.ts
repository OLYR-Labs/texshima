import crypto from "crypto";

export const PAYHERE_SANDBOX_URL =
  "https://sandbox.payhere.lk/pay/checkout";

function md5(value: string): string {
  return crypto
    .createHash("md5")
    .update(value)
    .digest("hex");
}

export function generatePayHereHash(
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  merchantSecret: string
): string {
  const formattedAmount = amount.toFixed(2);

  const hashedSecret = md5(
    merchantSecret
  ).toUpperCase();

  return md5(
    merchantId +
      orderId +
      formattedAmount +
      currency +
      hashedSecret
  ).toUpperCase();
}

export function verifyPayHereNotification(
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string,
  statusCode: string,
  md5sig: string,
  merchantSecret: string
): boolean {
  const hashedSecret = md5(
    merchantSecret
  ).toUpperCase();

  const localSignature = md5(
    merchantId +
      orderId +
      amount +
      currency +
      statusCode +
      hashedSecret
  ).toUpperCase();

  return (
    localSignature.toUpperCase() ===
    md5sig.toUpperCase()
  );
}