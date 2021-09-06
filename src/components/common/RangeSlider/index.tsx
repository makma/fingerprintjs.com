import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './RangeSlider.module.scss'

export interface SliderValue {
  label: string
  value: number
}

interface RangeSliderProps {
  currentValue: number // index for range slider
  values: SliderValue[]
  config: {
    min: number
    max: number
  }
  handleValueChange: (arg0: number) => void
  onlyCurrentValue?: boolean
}

export default function RangeSlider({
  currentValue,
  values,
  config: { min, max },
  handleValueChange,
  onlyCurrentValue,
}: RangeSliderProps) {
  const thumbSize = onlyCurrentValue ? 22 : 18

  const handleSliderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    handleValueChange(newValue)
    setSliderOffsetCss(calculateSliderOffset(min, max, newValue))
  }

  const calculateSliderOffset = (min: number, max: number, value: number) => {
    const ratio = ((value - min) * 100) / (max - min)
    // Input thumb offset: https://stackoverflow.com/a/49122957
    const leftOffsetCss = `calc(${ratio}% + ${thumbSize / 2}px - ${(thumbSize * ratio) / 100}px)`

    return leftOffsetCss
  }

  const [sliderOffsetCss, setSliderOffsetCss] = useState(calculateSliderOffset(min, max, currentValue))

  return (
    <div
      className={classNames(styles.slider, { [styles.sliderOnlyCurrent]: onlyCurrentValue })}
      style={{ '--left': sliderOffsetCss, '--thumb-size': `${thumbSize}px` } as React.CSSProperties}
    >
      {!onlyCurrentValue && (
        <>
          <span className={styles.output}>{values[currentValue].label}</span>
          <label htmlFor='billingSlider' className={styles.label}>
            {values.map(({ label }) => (
              <span key={`slider_label_${label}`} className={styles.text}>
                {label}
              </span>
            ))}
          </label>
        </>
      )}
      <div className={classNames(styles.inputContainer, { [styles.containerOnlyCurrent]: onlyCurrentValue })}>
        <input
          className={classNames(styles.input, { [styles.inputOnlyCurrent]: onlyCurrentValue })}
          type='range'
          min={min}
          max={max}
          value={currentValue}
          name='billing-slider'
          aria-label='Price slider'
          onChange={handleSliderValueChange}
        />
      </div>
      {onlyCurrentValue && (
        <label htmlFor='billingSlider' className={styles.onlyCurrentLabel}>
          {values.map(({ label }) => (
            <span key={`slider_label_${label}`} className={styles.onlyCurrentText}>
              {label}
            </span>
          ))}
        </label>
      )}
    </div>
  )
}
