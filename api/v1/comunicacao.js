export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Método não permitido"
      });
    }

    const params = new URLSearchParams(req.query);

    const url =
      "https://comunicaapi.pje.jus.br/api/v1/comunicacao?" +
      params.toString();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 DJEN-Proxy"
      }
    });

    const contentType =
      response.headers.get("content-type") ||
      "application/json";

    const body = await response.text();

    res.status(response.status);
    res.setHeader("Content-Type", contentType);

    return res.send(body);

  } catch (error) {

    return res.status(500).json({
      error: "Erro ao consultar a API do CNJ",
      message: error.message
    });
  }
}