export function loadFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}
