export async function json(req, res) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(chunks).toString());
  } catch (error) {
    req.body = {};
  }

  res.setHeader("Content-type", "application/json");
}
