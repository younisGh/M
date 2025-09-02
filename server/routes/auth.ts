import type { RequestHandler } from "express";

const store = new Map<string, { code: string; expiresAt: number }>();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const requestOtp: RequestHandler = (req, res) => {
  const phone = String(req.body?.phone || "").trim();
  if (!/^\+?\d{7,15}$/.test(phone)) {
    return res.status(400).json({ success: false, error: "invalid_phone" });
  }
  const code = generateCode();
  const ttlMs = 5 * 60 * 1000; // 5 minutes
  store.set(phone, { code, expiresAt: Date.now() + ttlMs });
  console.log(`[OTP] phone=${phone} code=${code} ttl=5m`);
  return res.json({ success: true });
};

export const verifyOtp: RequestHandler = (req, res) => {
  const phone = String(req.body?.phone || "").trim();
  const code = String(req.body?.code || "").trim();
  const entry = store.get(phone);
  if (!entry) return res.status(400).json({ success: false, error: "not_requested" });
  if (Date.now() > entry.expiresAt) {
    store.delete(phone);
    return res.status(400).json({ success: false, error: "expired" });
  }
  if (entry.code !== code) return res.status(400).json({ success: false, error: "invalid_code" });
  store.delete(phone);
  const token = Buffer.from(`${phone}:${Date.now()}`).toString("base64url");
  return res.json({ success: true, token });
};
