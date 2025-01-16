const get = (key: string) => {
  return localStorage.getItem(key)
}

const set = (key: string, value: string) => {
  return localStorage.setItem(key, value)
}

export default { get, set }
