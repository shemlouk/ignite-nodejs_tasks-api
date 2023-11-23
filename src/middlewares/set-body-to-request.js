export async function setBodyToRequest(req, _res) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(chunks).toString());
  } catch (error) {
    req.body = {};
  }
}
