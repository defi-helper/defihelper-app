import { useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useGate, useStore } from 'effector-react'
import { useLocalStorage, useMedia, useMount } from 'react-use'
import LazyLoad, { LazyLoadProps } from 'react-lazyload'
import Joyride, { CallBackProps, STATUS, Step } from '@defihelper/react-joyride'

import { AppLayout } from '~/layouts'
import { PortfolioTotalWorth } from './portfolio-total-worth'
import { PortfolioCoinBalance } from './portfolio-coin-balance'
import { Head } from '~/common/head'
import { Typography } from '~/common/typography'
import { PortfolioMetricCards } from './portfolio-metric-cards'
import { PortfolioWallets } from './portfolio-wallets/portfolio-wallets'
import { PortfolioAssets } from './portfolio-assets'
import {
  useOnTokenMetricUpdatedSubscription,
  useOnWalletMetricUpdatedSubscription,
} from './common'
import { PortfolioDeployedContracts } from './portfolio-deployed-contracts'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Loader } from '~/common/loader'
import { authModel } from '~/auth'
import { PortfolioExchanges } from '~/portfolio/portfolio-exchanges'
import {
  SettingsContactFormDialog,
  SettingsSuccessDialog,
  useOnWalletCreatedSubscription,
} from '~/settings/common'
import { OnboardTooltip } from '~/common/onboard-tooltip'
import { theme } from '~/common/theme'
import { ReactComponent as DollarIcon } from '~/assets/icons/dollar.svg'
import { ReactComponent as EasyIcon } from '~/assets/icons/easy.svg'
import { ReactComponent as WifiIcon } from '~/assets/icons/wifi.svg'
import { Button } from '~/common/button'
import { Paper } from '~/common/paper'
import { Icon } from '~/common/icon'
import { Progress } from '~/common/progress'
import { analytics } from '~/analytics'
import { UserContactBrokerEnum } from '~/api'
import { useDialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { CanDemo } from '~/auth/can-demo'
import { ButtonBase } from '~/common/button-base'
import { dateUtils } from '~/common/date-utils'
import * as settingsContacts from '~/settings/settings-contacts/settings-contact.model'
import * as styles from './portfolio.css'
import * as model from './portfolio.model'

export type PortfolioProps = unknown

const HEIGHT = 300

const STEPS: (Step & { action?: () => JSX.Element; closeButton?: string })[] = [
  {
    target: '.tracked_balance',
    content: 'Here you can see tokens in your wallets + staked tokens',
    placement: 'bottom',
    disableBeacon: true,
  },
  {
    target: `.tracked_apy`,
    content: 'Track average APY from staked tokens',
    placement: 'bottom',
  },
  {
    target: `.assets`,
    content: 'You assets across all chains',
    placement: 'top',
  },
  {
    target: `.wallets`,
    content: 'Connect as many wallets as you want',
    placement: 'bottom',
    closeButton: 'okay, thanks',
  },
]

const INSTRUCTION = [
  {
    title: 'Work offline',
    text: (
      <>
        Portfolio manager works even without a wallet connected: get analysis of
        protocols and token, recieve investment recommendations and management
        even before you connect
      </>
    ),
    icon: WifiIcon,
  },
  {
    title: 'Easy to use. Easy to earn',
    text: (
      <>
        Create automated investment strategies without having to know coding:
        <Typography variant="inherit" className={styles.green}>
          &apos;Take Profit&apos;, &apos;Stop Loss&apos;, &apos;Send a
          Notification If
        </Typography>{' '}
        &lt;Condition&gt; and many others already available at automation wizard
      </>
    ),
    icon: EasyIcon,
  },
  {
    title: 'Earn more. Much more',
    text: (
      <>
        The auto-staking feature increases your profits by restaking tokens
        exactly when rewards are higher than the fees. Earn up to{' '}
        <Typography variant="inherit" className={styles.green}>
          168%
        </Typography>{' '}
        more!
      </>
    ),
    icon: DollarIcon,
  },
]

const VIDEO_UD = 'VYgoIHapVEM'

const ForceRenderOrLazyLoad = (
  props: LazyLoadProps & { forceRender: boolean }
) => {
  const [alreadyRendered, setAlreadyRendered] = useState(false)

  useMount(() => {
    if (!props.forceRender) return

    setAlreadyRendered(props.forceRender)
  })

  return props.forceRender || alreadyRendered ? (
    <div className={props.className}>{props.children}</div>
  ) : (
    <LazyLoad height={HEIGHT} {...props} />
  )
}

const PortfolioNameEditor: React.FC<{
  name: string
  onChange: (name: string) => void
}> = (props) => {
  const [toggle, setToggle] = useState(false)
  const [name, setName] = useState(props.name === '' ? 'Portfolio' : props.name)

  const handleSave = () => {
    props.onChange(name)
    setToggle(false)
  }

  if (!toggle) {
    return (
      <Typography variant="h3" className={styles.title}>
        {name}{' '}
        <ButtonBase onClick={() => setToggle(true)}>
          <Icon icon="edit" className={styles.editIcon} />
        </ButtonBase>
      </Typography>
    )
  }

  return (
    <>
      <Input
        placeholder="Portfolio name"
        value={name}
        className={styles.nameInput}
        onChange={(e) => setName(e.target.value)}
        maxLength={64}
      />

      <CanDemo>
        <Button
          className={styles.nameInputSaveButton}
          size="small"
          onClick={handleSave}
        >
          Save
        </Button>
      </CanDemo>
      <Button
        className={styles.nameInputCancelButton}
        size="small"
        onClick={() => setToggle(false)}
      >
        Cancel
      </Button>
    </>
  )
}

export const Portfolio: React.VFC<PortfolioProps> = () => {
  const portfolioCollected = useStore(model.$portfolioCollected)
  const loading = useStore(model.fetchPortfolioCollectedFx.pending)
  const [openContactForm] = useDialog(SettingsContactFormDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)

  const userReady = useStore(authModel.$userReady)
  const user = useStore(authModel.$user)

  const isDesktop = useMedia('(min-width: 960px)')

  const contactList = useStore(settingsContacts.$userContactList)
  const contactListLoading = useStore(
    settingsContacts.fetchUserContactListFx.pending
  )

  const [runLocalStorage, setLocalStorage] = useLocalStorage(
    'portfolioOnBoarding',
    true
  )
  const [run, setRun] = useState(false)

  const handleUpdatePortfolioName = async (name: string) => {
    if (!user) return
    await model.updatePortfolioNameFx({ id: user.id, input: { name } })
  }

  useEffect(() => {
    if (!portfolioCollected || !runLocalStorage || !isDesktop) return

    setRun(portfolioCollected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioCollected, runLocalStorage, isDesktop])

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status } = data

    if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
      setLocalStorage(false)
      setRun(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useGate(model.PortfolioGate)

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])

  useOnTokenMetricUpdatedSubscription(({ data }) => {
    if (data?.onTokenMetricUpdated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)
  useOnWalletMetricUpdatedSubscription(({ data }) => {
    if (data?.onWalletMetricUpdated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)
  useOnWalletCreatedSubscription(({ data }) => {
    if (data?.onWalletCreated.id) {
      model.portfolioUpdated()
      settingsWalletModel.updated()
    }
  }, variables)

  const handleOpenContactForm = (broker: UserContactBrokerEnum) => async () => {
    try {
      if (!user) return

      if (broker === UserContactBrokerEnum.Telegram) {
        const data = await settingsContacts.createUserContactFx({
          address: '',
          broker,
          name: 'telegram',
        })

        await openSuccess({
          type: broker,
          confirmationCode: data.confirmationCode,
        })

        analytics.log('settings_email_connect_click')
      } else {
        const result = await openContactForm({
          defaultValues: {
            broker,
          },
        })
        analytics.log('settings_email_save_click')

        const data = await settingsContacts.createUserContactFx({
          ...result,
          broker,
          name: result.address ?? 'telegram',
        })

        await openSuccess({
          type: broker,
          confirmationCode: data.confirmationCode,
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const contactsMap = contactList.reduce((acc, contact) => {
    acc.set(contact.broker, contact)

    return acc
  }, new Map<UserContactBrokerEnum, typeof contactList[number]>())

  const telegram = contactsMap.get(UserContactBrokerEnum.Telegram)
  const email = contactsMap.get(UserContactBrokerEnum.Email)
  const leftDays = user?.portfolioCollectingFreezedAt
    ? Math.round(dateUtils.leftDays(user.portfolioCollectingFreezedAt))
    : null

  return (
    <AppLayout title="Portfolio">
      <Head title="Portfolio" />
      {loading && !portfolioCollected && (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      )}

      {portfolioCollected && (
        <>
          <Joyride
            run={run}
            steps={STEPS}
            continuous
            scrollToFirstStep
            callback={handleJoyrideCallback}
            disableCloseOnEsc
            disableOverlayClose
            disableOverlay
            floaterProps={{
              styles: {
                arrow: {
                  color: theme.colors.common.green1,
                },
              },
            }}
            tooltipComponent={OnboardTooltip}
          />

          <PortfolioNameEditor
            name={user?.name ?? ''}
            onChange={(name) => handleUpdatePortfolioName(name)}
          />

          <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
            <PortfolioMetricCards className={styles.cards} />
          </ForceRenderOrLazyLoad>
          {!(
            telegram?.address ||
            contactListLoading ||
            !userReady ||
            !leftDays
          ) && (
            <Paper radius={8} className={styles.connectTelegram}>
              <Typography variant="body2" family="mono">
                Connect Telegram to receive up-to-date information about your
                portfolio
              </Typography>
              <Button
                size="small"
                className={styles.connectTelegramButton}
                onClick={handleOpenContactForm(UserContactBrokerEnum.Telegram)}
              >
                CONNECT TELEGRAM
              </Button>
            </Paper>
          )}
          <div className={clsx(styles.grid, styles.section)}>
            <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
              <PortfolioTotalWorth />
            </ForceRenderOrLazyLoad>
            <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
              <PortfolioCoinBalance />
            </ForceRenderOrLazyLoad>
          </div>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioAssets className="assets" />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioWallets className="wallets" />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad
            forceRender={Boolean(runLocalStorage)}
            className={styles.section}
          >
            <PortfolioDeployedContracts />
          </ForceRenderOrLazyLoad>
          <ForceRenderOrLazyLoad forceRender={Boolean(runLocalStorage)}>
            <PortfolioExchanges />
          </ForceRenderOrLazyLoad>
        </>
      )}
      {!loading && !portfolioCollected && (
        <>
          <Typography variant="h3" className={styles.title}>
            Portfolio
          </Typography>
          <div className={styles.generatingBody}>
            {!isDesktop && (
              <div className={styles.generatingMobile}>
                <Typography
                  variant="body2"
                  className={styles.generatingMobileText}
                >
                  You portfolio is generating now. For now you can take a look
                  at DFH features and leave your contacts - we&apos;ll send a
                  notification when your portfolio is ready.
                </Typography>
                <Typography
                  variant="body3"
                  family="mono"
                  transform="uppercase"
                  className={styles.generatingMobileTitle}
                >
                  generating...
                </Typography>
                <Progress loading={!portfolioCollected} />
              </div>
            )}
            {isDesktop && (
              <Typography
                variant="h3"
                family="mono"
                transform="uppercase"
                className={styles.generatingTitle}
              >
                Your portfolio is generating now...
              </Typography>
            )}
            <div className={styles.instructions}>
              {INSTRUCTION.map((instructionItem) => (
                <Paper
                  key={instructionItem.title}
                  radius={8}
                  className={styles.instructionCard}
                >
                  <Typography className={styles.instructionCardTitle}>
                    {instructionItem.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={styles.instructionCardText}
                  >
                    {instructionItem.text}
                  </Typography>
                  <instructionItem.icon
                    className={styles.instructionCardIcon}
                  />
                </Paper>
              ))}
            </div>
            {(!email || !telegram) && (
              <Paper radius={8} className={styles.contacts}>
                <Typography variant="body2" className={styles.contactsText}>
                  No need to wait while your portfolio is generating. We&apos;ll
                  send you daily updates of your portfolio value via telegram or
                  email. No spam, we promise.
                </Typography>
                {!telegram && (
                  <Button
                    size="small"
                    className={styles.contactsButton}
                    onClick={handleOpenContactForm(
                      UserContactBrokerEnum.Telegram
                    )}
                  >
                    <Icon icon="telegram" width="20" height="20" /> connect
                    telegram
                  </Button>
                )}
                {!email && (
                  <Button
                    size="small"
                    className={styles.contactsButton}
                    onClick={handleOpenContactForm(UserContactBrokerEnum.Email)}
                  >
                    <Icon icon="email" width="20" height="20" /> connect email
                  </Button>
                )}
              </Paper>
            )}
            <div className={styles.videoWrap}>
              <iframe
                className={styles.video}
                scrolling="no"
                title="This is a unique title"
                src={`https://www.youtube.com/embed/${VIDEO_UD}?autoplay=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </>
      )}
    </AppLayout>
  )
}
