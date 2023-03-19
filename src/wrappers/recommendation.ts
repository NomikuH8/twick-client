import getApi from "./getApi"

export function getImageRecommendation(filename: string) {
  return `${getApi()}/images/recommendations/${filename}`
}

export async function getRecommendations() {
  const req = await fetch(`${getApi()}/recommendations`)
  return await req.json()
}

export async function getApprovedRecommendations() {
  const req = await fetch(`${getApi()}/recommendations/approved`)
  return await req.json()
}

export async function approveRecommendation(id: number) {
  const req = await fetch(`${getApi()}/recommendations/approve/${id}`)
  return await req.json()
}

export async function declineRecommendation(id: number) {
  const req = await fetch(`${getApi()}/recommendations/decline/${id}`)
  return await req.json()
}
