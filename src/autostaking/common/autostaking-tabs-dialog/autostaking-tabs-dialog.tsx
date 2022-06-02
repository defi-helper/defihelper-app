import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNProgress } from '@tanem/react-nprogress'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-tabs-dialog.css'
import { Icon } from '~/common/icon'

export type AutostakingTabsDialogProps = {
  onConfirm: () => void
}

enum Tabs {
  transfer,
  deposit,
  success,
}

const LENGTH = 20

const Loader = (props: { loading: boolean }) => {
  const { progress } = useNProgress({
    isAnimating: props.loading,
  })

  if (!props.loading) return <></>

  return (
    <div className={styles.loader}>
      {Array.from({ length: LENGTH }, (_, i) => i).map((index) => (
        <div
          key={index}
          className={clsx(
            styles.loaderItem,
            Math.floor(progress * LENGTH) >= index && styles.loaderItemActive
          )}
        />
      ))}
    </div>
  )
}

export const AutostakingTabsDialog: React.VFC<AutostakingTabsDialogProps> = (
  props
) => {
  const { register, handleSubmit } = useForm<{ amount: string }>()
  const [loading] = useState(false)

  const [currentTab, setCurrentTab] = useState(Tabs.transfer)

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const handleOnSubmit = handleSubmit((formValues) => {
    console.log(formValues)

    setCurrentTab(Tabs.deposit)
  })

  const handleDeposit = () => {
    setCurrentTab(Tabs.success)
  }

  const handleConfirm = () => {
    props.onConfirm()
  }

  const handlers: Record<number, () => void> = {
    [Tabs.deposit]: handleDeposit,
    [Tabs.success]: handleConfirm,
  }

  return (
    <Dialog className={styles.root}>
      <div className={styles.header}>
        <Typography
          variant="body2"
          transform="uppercase"
          className={clsx(
            styles.tab,
            currentTab === Tabs.transfer && styles.tabActive
          )}
          as={ButtonBase}
          onClick={handleChangeTab(Tabs.transfer)}
        >
          TRANSFER
        </Typography>
        <Typography
          variant="body2"
          transform="uppercase"
          className={clsx(
            styles.tab,
            (currentTab === Tabs.deposit || currentTab === Tabs.success) &&
              styles.tabActive
          )}
          as={ButtonBase}
          onClick={handleChangeTab(Tabs.deposit)}
        >
          Deposit
        </Typography>
      </div>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.content}>
          {currentTab === Tabs.transfer && (
            <>
              <Typography variant="body2" className={styles.subtitle}>
                Transfer your{' '}
                <Link color="blue" href="/">
                  APE-LP
                </Link>{' '}
                tokens to your personal contract to enable automation.
              </Typography>
              {!loading && (
                <>
                  <NumericalInput
                    label={<span>amount</span>}
                    className={styles.input}
                    {...register('amount')}
                  />
                  <Typography variant="body2">
                    Don&apos;t have LP tokens? Buy LP tokens (ZAP) from a single
                    token in 1 click
                  </Typography>
                </>
              )}
              <Loader loading={loading} />
            </>
          )}
          {currentTab === Tabs.deposit && (
            <>
              <Typography variant="body2" className={styles.subtitle}>
                To start earning rewards you need to stake your tokens to the
                protocol&apos;s contract.
              </Typography>
              <Loader loading={loading} />
            </>
          )}
          {currentTab === Tabs.success && (
            <div className={styles.success}>
              <Icon
                icon="checkboxCircle"
                width="100"
                height="100"
                className={styles.successIcon}
              />
              <Typography align="center">
                Your succesfully deposited your tokens! DeFiHelper will start to
                run your automation soon.
              </Typography>
            </div>
          )}
        </div>
        <Button
          type={currentTab === Tabs.transfer ? 'submit' : 'button'}
          size="small"
          className={styles.button}
          onClick={handlers[currentTab]}
        >
          {currentTab === Tabs.transfer && 'Transfer'}
          {currentTab === Tabs.deposit && 'Deposit'}
          {currentTab === Tabs.success && 'ok'}
        </Button>
      </form>
    </Dialog>
  )
}
