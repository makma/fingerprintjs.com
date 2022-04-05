import * as Turing from '@fpjs-incubator/turing'

let turingPromise: Promise<void> | undefined

export async function initTuring(): Promise<void> {
  if (!turingPromise) {
    turingPromise = Turing.ready(async () => Promise)
  }
  return turingPromise
}
