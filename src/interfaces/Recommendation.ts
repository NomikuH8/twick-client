export interface Recommendation {
  id: number
  filename: string
  datetime: Date
  approved: boolean
  recommender: Recommender
}

export interface Recommender {
  id: number
  discord: string
  discord_ping: string
}
