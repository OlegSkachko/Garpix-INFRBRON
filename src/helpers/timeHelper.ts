export function correctTime (time: string): string {
  const date = new Date(time)
  const newTime = date.toLocaleTimeString().split(':').slice(0, 2).join(':')
  return newTime
}
