export default (_req, res, next) => {
  const oneMinuteInSeconds = 60
  const oneHourInMinutes = 60
  const oneDayInHours = 24
  const oneYearInDays = 365

  const oneYearInSeconds =
    oneYearInDays * oneDayInHours * oneHourInMinutes * oneMinuteInSeconds

  res.setHeader(
    'Cache-Control',
    `s-maxage=${oneYearInSeconds}, stale-while-revalidate`
  )

  next()
}
