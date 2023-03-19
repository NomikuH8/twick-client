import getApi from "./getApi"

export async function tweet(text: string, images: string[]) {
  const req = await fetch(`${getApi()}/twitter/tweet`, {
    method: "POST",
    body: JSON.stringify({ text, images }),
    headers: { "Content-Type": "application/json" },
  })
  return req.json()
}
