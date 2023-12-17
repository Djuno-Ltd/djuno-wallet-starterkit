export function getLocalStorage<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue
  }
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key)
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    return initialValue
  }
}

export function setLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    // set to local storage by key
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    return false
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window === 'undefined') {
    return false
  }
  try {
    // set to local storage by key
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    // If error also return initialValue
    console.log(error)
    return false
  }
}
