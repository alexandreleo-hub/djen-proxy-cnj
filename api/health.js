export default async function handler(req, res) {

  return res.status(200).json({
    ok: true,
    region: process.env.VERCEL_REGION || "unknown",
    timestamp: new Date().toISOString()
  });

}