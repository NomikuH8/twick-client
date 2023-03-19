import getApi from "./getApi"

export async function getUser() {
  const req = await fetch(`${getApi()}/currentuser`)
  return req.json()
}

export async function getAvailableUsers() {
  const req = await fetch(`${getApi()}/availableusers`)
  return req.json()
}

export async function changeUser() {
  return fetch(`${getApi()}/changeuser/${localStorage.getItem("loggedUserId")}`)
}
