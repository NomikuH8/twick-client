export default function () {
  if (location.host.search("localhost") === -1) return ""

  return "http://localhost:7278"
}
