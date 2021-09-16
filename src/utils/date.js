export const generateSemester = (years) => {
  const year = new Date().getFullYear() - 1911
  const semesters = [...Array(years).keys()]
    .map((_, i) => {
      return [`${year - i}-2`, `${year - i}-1`]
    })
    .flat()
  return semesters
}
