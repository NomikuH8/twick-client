import { SetVariablesBody } from "../interfaces/SetVariablesBody"
import getApi from "./getApi"

export async function setVariables(body: SetVariablesBody) {
  const req = await fetch(`${getApi()}/vars`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
  return await req.json()
}
