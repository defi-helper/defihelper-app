import { yupResolver } from '@hookform/resolvers/yup'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TokenFragment,
  TokenPriceFeedCoingeckoAddressType,
  TokenPriceFeedCoingeckoIdType,
  TokenPriceFeedCoingeckoPlatformEnum,
} from '~/api'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import * as styles from './tokens-create-token-dialog.css'
import { tokensCreateTokenSchema } from './tokens-create-token-dialog.validation'
import * as model from '../tokens.model'

type PriceFeedPayload =
  | {
      coingeckoId: TokenPriceFeedCoingeckoIdType
    }
  | { coingeckoAddress: TokenPriceFeedCoingeckoAddressType }
  | undefined

interface FormValues {
  alias?: string
  name: string
  decimals: number
  symbol: string
  priceFeed: PriceFeedPayload
}

export type TokensCreateTokenDialogProps = {
  onCancel: () => void
  onConfirm: (values: FormValues) => void
  token: TokenFragment
}

export const TokensCreateTokenDialog: React.VFC<TokensCreateTokenDialogProps> =
  (props) => {
    const { token } = props
    const tokensAlias = useStore(model.$tokensAlias)
    const [priceFeed, setPriceFeed] = useState(
      token.priceFeed?.type ?? 'coingeckoId'
    )

    console.info(token.priceFeed?.type)

    const [tokenAliasSearch, setTokenAliasSearch] = useState<
      undefined | string
    >(token.alias?.name)

    const { register, handleSubmit, formState, setValue } = useForm<{
      alias?: string
      name: string
      decimals: number
      symbol: string
      priceFeed: PriceFeedPayload
    }>({
      defaultValues: {
        alias: token.alias?.id,
        name: token.name,
        decimals: token.decimals,
        symbol: token.symbol,
        priceFeed: undefined,
      },
      resolver: yupResolver(tokensCreateTokenSchema),
    })

    const setPriceFeedHandler = (feed: string) => {
      setPriceFeed(feed)
    }

    useEffect(() => {
      model.fetchTokensAliasFx({
        pagination: {
          limit: 100,
        },
        filter: {
          search: tokenAliasSearch,
        },
      })
    }, [tokenAliasSearch])

    return (
      <Dialog className={styles.root}>
        <Typography variant="body2" weight="semibold" className={styles.title}>
          Edit token
        </Typography>

        <form onSubmit={handleSubmit((values) => props.onConfirm(values))}>
          <Input
            {...register('name')}
            label="Name"
            className={styles.formField}
            defaultValue={token.name}
            helperText={formState.errors.name?.message}
            error={Boolean(formState.errors.name?.message)}
          />

          <Input
            {...register('symbol')}
            label="Symbol"
            className={styles.formField}
            defaultValue={token.symbol}
            helperText={formState.errors.symbol?.message}
            error={Boolean(formState.errors.symbol?.message)}
          />

          <Input
            {...register('decimals')}
            label="Decimals"
            className={styles.formField}
            defaultValue={token.decimals}
            helperText={formState.errors.decimals?.message}
            error={Boolean(formState.errors.decimals?.message)}
          />

          <Select
            defaultValue={token.alias?.id}
            onChange={(e) => setValue('alias', e.target.value)}
            label="Alias"
            className={styles.formField}
            clickableBackdrop
            header={
              <Input
                placeholder="Search"
                defaultValue={tokenAliasSearch}
                onChange={(e) => setTokenAliasSearch(e.target.value)}
                className={styles.tokenAliasSearchInput}
              />
            }
          >
            {tokensAlias.map((alias) => (
              <SelectOption
                renderValue={alias.name}
                key={alias.id}
                value={alias.id}
              >
                {alias.logoUrl ? (
                  <img
                    alt={alias.name}
                    className={styles.aliasIcon}
                    src={alias.logoUrl}
                  />
                ) : (
                  <div className={styles.aliasIconPlaceholder} />
                )}
                [{alias.liquidity.toUpperCase()}] {alias.name}
              </SelectOption>
            ))}
          </Select>

          <Select
            defaultValue={token.priceFeed?.type}
            label="Price feed"
            onChange={(v) => setPriceFeedHandler(v.target.value)}
            className={styles.formField}
          >
            <SelectOption key="coingeckoId" value="coingeckoId">
              coingeckoId
            </SelectOption>

            <SelectOption key="coingeckoAddress" value="coingeckoAddress">
              coingeckoAddress
            </SelectOption>
          </Select>

          {priceFeed === 'coingeckoId' && (
            <Input
              {...register('priceFeed.coingeckoId.id')}
              type="text"
              label="Coin id"
              className={styles.formField}
            />
          )}

          {priceFeed === 'coingeckoAddress' && (
            <>
              <Select
                onChange={(e) =>
                  setValue(
                    'priceFeed.coingeckoAddress.platform',
                    e.target.value as never
                  )
                }
                label="Platform"
                className={styles.formField}
              >
                {Object.values(TokenPriceFeedCoingeckoPlatformEnum).map((v) => (
                  <SelectOption key={v} value={v}>
                    {v}
                  </SelectOption>
                ))}
              </Select>

              <Input
                {...register('priceFeed.coingeckoAddress.address')}
                type="text"
                label="Address"
                className={styles.formField}
              />
            </>
          )}

          <Button type="submit">Save</Button>
        </form>
      </Dialog>
    )
  }
