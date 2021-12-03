import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import CodeWindow from '../../common/CodeWindowWithSelector'

import { ReactComponent as DevSVG } from './DevSVG.svg'

import styles from './GenerateKeySection.module.scss'

export default function GenerateKeySection() {
  return (
    <Container className={styles.container} size='large'>
      <section className={styles.keyGenSection}>
        <DevSVG className={styles.icon} id='generateKeySection' />
        <h1 className={styles.title}>Generate my API keys</h1>
        <p className={styles.description}>
          Enter your email to generate a unique token and code snippet. Install on your site to use our API for free.
        </p>

        <form className={styles.generateKeyForm}>
          <label className={styles.label} htmlFor='email'>
            Work email
          </label>
          <div className={styles.form}>
            <input
              className={styles.input}
              id='email'
              maxLength={64}
              name='email'
              size={20}
              type='email'
              placeholder='john@company.com'
              required
            />
            <Button type='submit' size='big'>
              Generate keys
            </Button>
          </div>
        </form>
      </section>
      <section className={styles.snippetSection}>
        <CodeWindow
          codeCDN={`<script>
// Initialize an agent at application startup.
const botdPromise =
    import('https://openfpcdn.io/botd/v0.1')
    .then( Botd => Botd.load({
        token: '<your-token>',
        mode: 'allData'
    }))
// Get the bot detection result when you need it.
botdPromise
    .then(botd => botd.detect())
    .then(result => console.log(result))
    .catch(error => console.error(error))
</script>`}
          codeNPM={`import Botd from '@fpjs-incubator/botd-agent';

// Initialize an agent at application startup.
const botdPromise = Botd.load({
    token: "<token>",
    mode: "allData"
});

(async () => {
  // Get the bot detection result when you need it.
  const botd = await botdPromise
  const result = await botd.detect();
  console.log(result);
})();`}
        />
      </section>
    </Container>
  )
}
