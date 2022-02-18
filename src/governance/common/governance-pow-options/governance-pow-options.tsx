import { ButtonBase } from '~/common/button-base'
import * as styles from './governance-pow-options.css'

const powOptions = [6, 8, 18]

export const GovernancePowOptions: React.VFC<{
  onClick: (option: string) => void
}> = (props) => {
  const handleOnClick = (option: number | string) => () => {
    if (typeof option === 'number') {
      return props.onClick(Array(option).fill(0).join(''))
    }

    const propmtValue = Number(
      // eslint-disable-next-line no-alert
      window.prompt('please! enter custom format')
    )

    if (!propmtValue) {
      // eslint-disable-next-line no-alert
      return window.alert('please! enter value')
    }

    if (Number.isNaN(propmtValue)) {
      // eslint-disable-next-line no-alert
      return window.alert('only numeric values are allowed')
    }

    const value = Array(propmtValue).fill(0).join('')

    props.onClick(value)
  }

  return (
    <div className={styles.pow}>
      {powOptions.map((option) => (
        <ButtonBase
          className={styles.powOption}
          key={option}
          onClick={handleOnClick(option)}
        >
          10<sup>{option}</sup>
        </ButtonBase>
      ))}
      <ButtonBase
        className={styles.powOption}
        onClick={handleOnClick('custom')}
      >
        custom
      </ButtonBase>
    </div>
  )
}
