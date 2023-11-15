export function convertToDate(
  timezone: number,
  dt: number,
  weekdayFormat: "short" | "long"
): string {
  const utc_time = new Date(dt * 1000)
  const local_time = new Date(utc_time.getTime() + timezone * 1000)

  return new Intl.DateTimeFormat("UTC", { weekday: weekdayFormat }).format(local_time)
}

export function formatSunTimeWithAMPM(
  timestamp: number,
  timezoneOffset: number
): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(
    new Date((timestamp + timezoneOffset) * 1000)
  )
}
