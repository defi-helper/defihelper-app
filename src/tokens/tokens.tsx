import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import {
  BlockchainEnum,
  SortOrderEnum,
  TokenFragment,
  TokenListQuerySortInputTypeColumnEnum,
} from '~/api/_generated-types'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { networksConfig } from '~/networks-config'
import { TokensCreateTokenDialog } from './tokens-create-token-dialog/tokens-create-token-dialog'
import * as styles from './tokens.css'
import * as model from './tokens.model'

export const Tokens: React.VFC = () => {
  const [openTokenDialog] = useDialog(TokensCreateTokenDialog)
  const [network, setNetwork] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<undefined | string>(undefined)

  const tokens = useStore(model.$tokens)

  useEffect(() => {
    model.fetchTokensFx({
      pagination: {
        limit: 100,
      },
      filter: {
        search,
        blockchain: {
          network,
          protocol: BlockchainEnum.Ethereum,
        },
      },
      sort: {
        column: TokenListQuerySortInputTypeColumnEnum.CreatedAt,
        order: SortOrderEnum.Desc,
      },
    })
  }, [network, search])

  const handleEditToken = async (token: TokenFragment) => {
    try {
      const result = await openTokenDialog({ token })

      model.tokenUpdateFx({
        id: token.id,
        input: result,
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AppLayout>
      <Typography variant="h3" className={styles.title}>
        Tokens
      </Typography>
      <div className={styles.grid}>
        <Paper radius={8} className={styles.root}>
          <div className={styles.searchBox}>
            <Select
              value={network}
              onChange={(e) =>
                setNetwork(e.target.value === '' ? undefined : e.target.value)
              }
              placeholder="Network"
              className={styles.formInputSearch}
              clearable
            >
              {Object.values(networksConfig).map((v) => (
                <SelectOption key={String(v.chainId)} value={String(v.chainId)}>
                  {`${String(v.chainId)} ${v.title}`}
                </SelectOption>
              ))}
            </Select>
            <Input
              width="auto"
              type="text"
              placeholder="Search"
              className={styles.formInputSearch}
              onChange={(v) => setSearch(v.target.value)}
            />
          </div>

          <div className={clsx(styles.tableRow, styles.tableHeader)}>
            <Typography variant="body3">Name</Typography>
            <Typography variant="body3">Smbl</Typography>
            <Typography variant="body3">Dcmls</Typography>
            <Typography variant="body3">Ntwrk</Typography>
            <Typography variant="body3">Price feed</Typography>
          </div>
          <div>
            {tokens.map((token) => (
              <div className={styles.tableRow}>
                <Typography variant="body2">{token.name}</Typography>
                <Typography variant="body3">{token.symbol}</Typography>
                <Typography variant="body3">{token.decimals}</Typography>
                <Typography variant="body3">{token.network}</Typography>
                <Typography variant="body3">
                  {token.priceFeed?.type ?? '-'}
                </Typography>

                <Typography variant="body3" align="right">
                  <ButtonBase
                    className={styles.editButton}
                    onClick={() => handleEditToken(token)}
                  >
                    Edit
                  </ButtonBase>
                </Typography>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </AppLayout>
  )
}
