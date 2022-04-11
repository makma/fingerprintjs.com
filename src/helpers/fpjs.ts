import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

export const getConfig: FingerprintJS.GetOptions<true> = {
  extendedResult: true,
  timeout: 30_000,
}
