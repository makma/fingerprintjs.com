export function objectFromEntries(entries: IterableIterator<[string, string]>) {
  const result = {} as Record<string, string>

  // Creating an array from the iterator removes the need to use the --downlevelIteration compiler option.
  for (const [key, value] of Array.from(entries)) {
    result[key] = value
  }
  return result
}

export function buildQueryString(values: Record<string, string>) {
  const queryString = new URLSearchParams(values).toString()
  return queryString.length > 0 ? `?${queryString}` : ''
}

export function getQueryStringParam(queryString: string, param: string) {
  const params = new URLSearchParams(queryString)
  return params.get(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paginate(arr: any[], size: number) {
  return arr.reduce((acc, val, i) => {
    const idx = Math.floor(i / size)
    const page = acc[idx] || (acc[idx] = [])
    page.push(val)
    return acc
  }, [])
}

export function generateRandomString(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
