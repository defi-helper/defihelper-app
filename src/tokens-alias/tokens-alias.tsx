import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { Input } from '~/common/input'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './tokens-alias.css'
import * as model from './tokens-alias.model'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Select, SelectOption } from '~/common/select'
import {
  SortOrderEnum,
  TokenAliasFragment,
  TokenAliasLiquidityEnum,
  TokenAliasListSortInputTypeColumnEnum,
} from '~/api'

export const TokensAlias: React.VFC = () => {
  const [search, setSearch] = useState<undefined | string>(undefined)

  const tokens = useStore(model.$tokensAlias)

  useEffect(() => {
    model.fetchTokensAliasFx({
      pagination: {
        limit: 100,
      },
      filter: {
        search,
      },
      sort: {
        column: TokenAliasListSortInputTypeColumnEnum.CreatedAt,
        order: SortOrderEnum.Desc,
      },
    })
  }, [search])

  const handleUpdateTokenLiquidity = (
    token: TokenAliasFragment,
    liquidity: TokenAliasLiquidityEnum
  ) => {
    model.tokenAliasUpdateFx({
      id: token.id,
      input: {
        liquidity,
      },
    })
  }

  return (
    <AppLayout>
      <Typography variant="h3" className={styles.title}>
        Tokens alias
      </Typography>
      <div className={styles.grid}>
        <Paper radius={8} className={styles.root}>
          <div className={styles.searchBox}>
            <Input
              width="auto"
              type="text"
              placeholder="Search"
              className={styles.formInputSearch}
              onChange={(v) => setSearch(v.target.value)}
            />
          </div>

          <div className={clsx(styles.tableRow, styles.tableHeader)}>
            <Typography variant="body3" />
            <Typography variant="body3">Name</Typography>
            <Typography variant="body3">Liquidity</Typography>
          </div>
          <div>
            {tokens.map((token) => (
              <div className={styles.tableRow}>
                <Typography variant="body2">
                  <img
                    src={
                      token.logoUrl ??
                      'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                    }
                    alt={token.name}
                    className={styles.tokenLogo}
                  />
                </Typography>
                <Typography variant="body2">{token.name}</Typography>
                <Typography variant="body3">
                  <Dropdown
                    control={() => <ButtonBase>{token.liquidity}</ButtonBase>}
                    placement="left-start"
                    offset={[0, 4]}
                  >
                    <Select
                      clickableBackdrop
                      defaultValue={token.liquidity}
                      className={styles.liquiditySelect}
                      onChange={(e) =>
                        handleUpdateTokenLiquidity(
                          token,
                          e.target.value as TokenAliasLiquidityEnum
                        )
                      }
                    >
                      {Object.entries(TokenAliasLiquidityEnum).map(
                        ([label, value]) => (
                          <SelectOption key={value} value={value}>
                            {label}
                          </SelectOption>
                        )
                      )}
                    </Select>
                  </Dropdown>
                </Typography>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </AppLayout>
  )
}
