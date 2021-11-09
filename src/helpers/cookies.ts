export function setCookie(name: string, value: string, days: number) {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export function getCookie(name: string) {
  const cookieName = name + '='
  const cookieArray = document.cookie.split(';')

  for (let cookie of cookieArray) {
    cookie = cookie.trim()

    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length)
    }
  }
  return null
}

export function removeCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
