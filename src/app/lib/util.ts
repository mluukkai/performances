export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fi-FI').format(date);
}

export const fachs = [
  'Basso', 'Sopraano', 'Tenori', 'Altto', 'Bassobaritoni', 'Baritoni', 'Kontratenori', 'Urut', 
]