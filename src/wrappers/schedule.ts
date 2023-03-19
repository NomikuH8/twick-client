import getApi from "./getApi"

export async function scheduleImages(images: FormData) {
  const req = await fetch(`${getApi()}/schedule/images`, {
    method: "POST",
    body: images,
  })
  return req.json()
}

interface NewScheduleBody {
  text: string
  timestamp: string
  images: string[]
}
export async function addNewScheduled(body: NewScheduleBody) {
  const req = await fetch(`${getApi()}/schedule`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
  return req.json()
}
