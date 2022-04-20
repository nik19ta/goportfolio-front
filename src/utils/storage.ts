class Storage {
  static get(key: string) {
    return localStorage.getItem(`jp_${key}`)
  }

  static set(key: string, payload: any) {
    return localStorage.setItem(`jp_${key}`, payload)
  }

  static delete(key: string) {
    return localStorage.removeItem(`jp_${key}`)
  }
}

export default Storage