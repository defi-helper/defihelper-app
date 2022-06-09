import { useState } from 'react'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import * as styles from './automation-notify-contract-event-dialog.css'

export type AutomationConditionActionsDialogProps = {
  onConfirm: () => void
  onCancel: () => void
}

interface Platform {
  events: Array<{ name: string }>
  name: string
  id: string
}

export const AutomationNotifyContractEventDialog: React.VFC<AutomationConditionActionsDialogProps> =
  () => {
    const [message, setMessage] = useState(
      'Fill the field above, I will try to find the contract'
    )
    const [activePlatform, setActivePlatform] = useState<string | null>(null)
    const [choosenEvents, setChoosenEvents] = useState<Array<string>>([])
    const [foundPlatforms, setFoundPlatforms] = useState<Record<
      string,
      Platform
    > | null>(null)

    const networks = {
      ethereum: {
        name: 'Ethereum',
        resolver: async (address: string): Promise<Platform | null> => {
          const response = await fetch(
            `https://api.etherscan.io/api/?module=contract&action=getabi&address=${address}`
          ).then((v) => v.json())
          let parsedAbi: null | Array<any>
          try {
            parsedAbi = JSON.parse(response?.result)
          } catch {
            parsedAbi = null
          }

          if (!Array.isArray(parsedAbi)) {
            return null
          }

          return {
            events: parsedAbi.filter((item) => item.type === 'event'),
            name: 'Ethereum',
            id: 'ethereum',
          }
        },
      },
    }

    const handleChangeAddress = async (address: string) => {
      await Promise.all([setActivePlatform(null), setFoundPlatforms(null)])

      if (!address.match(/(\b0x[a-f0-9]{40}\b)/g)) {
        setMessage("Please check the contract's address")
        return
      }

      setMessage('Wait little bit...')
      const results = await Promise.all(
        Object.values(networks).map((network) => network.resolver(address))
      )
      const platforms = results.reduce<Record<string, Platform>>(
        (prev, curr) => {
          if (curr === null) {
            return prev
          }

          return {
            ...prev,
            [curr.id]: curr,
          }
        },
        {}
      )

      setFoundPlatforms(platforms)
      if (Object.values(platforms).length) {
        setMessage(
          Object.values(platforms).length > 1
            ? 'Now choose the network and events, please'
            : 'Now choose the events please'
        )

        if (Object.values(platforms).length === 1)
          setActivePlatform(Object.values(platforms)[0]?.id ?? null)
        return
      }

      setMessage("Unfortunately, I didn't found any contracts :(")
    }

    return (
      <Dialog className={styles.root}>
        <Typography className={styles.title}>
          Follow the blockchain events
        </Typography>

        <Input
          placeholder="Contract address"
          onChange={(e) => handleChangeAddress(e.target.value)}
        />

        <Typography variant="body3" className={styles.firstStepHelper}>
          {message}
        </Typography>

        {foundPlatforms && Object.values(foundPlatforms).length > 1 && (
          <Select label="Network" className={styles.contractPlatformSelect}>
            {Object.values(foundPlatforms).map((platform: Platform) => (
              <SelectOption value={platform.id}>{platform.name}</SelectOption>
            ))}
          </Select>
        )}

        {activePlatform && foundPlatforms && (
          <Select
            label="Notify me when X happens"
            multiple
            className={styles.contractEventSelect}
            onChange={(e) => setChoosenEvents(e.target.value.split(','))}
          >
            {foundPlatforms[activePlatform]?.events.map((event) => (
              <SelectOption value={event.name}>{event.name}</SelectOption>
            ))}
          </Select>
        )}

        <div className={styles.buttonWrapper}>
          <Button disabled={!choosenEvents.length} color="green" size="small">
            Follow
          </Button>
        </div>
      </Dialog>
    )
  }
