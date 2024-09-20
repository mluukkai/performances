export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fi-FI').format(date);
}