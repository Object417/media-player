const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600

function getFormattedTime(s) {
  // Format: h?h:mm:ss
  // or m?m:ss

  s = Math.floor(s)

  let h = Math.floor(s / SECONDS_IN_HOUR)
  s -= h * SECONDS_IN_HOUR

  let m = Math.floor(s / SECONDS_IN_MINUTE)
  s -= m * SECONDS_IN_MINUTE

  // console.log(h + ":" + m + ":" + s)

  let formattedHours = h > 0 ? h + ":" : ""
  let formattedMinutes = h > 0 ? (m > 9 ? m : "0" + m) : m
  let formattedSeconds = s > 9 ? s : "0" + s

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`
}

export default getFormattedTime
