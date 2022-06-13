import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { Input } from '~/common/input'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import * as styles from './tokens-alias.css'
import * as model from './tokens-alias.model'
import { Select, SelectOption } from '~/common/select'
import {
  SortOrderEnum,
  TokenAliasFragment,
  TokenAliasLiquidityEnum,
  TokenAliasListSortInputTypeColumnEnum,
} from '~/api'
import { Checkbox } from '~/common/checkbox'
import { useQueryParams } from '~/common/hooks'
import { ButtonBase } from '~/common/button-base'

export const TokensAlias: React.VFC = () => {
  const searchParams = useQueryParams()

  const [search, setSearch] = useState<undefined | string>(
    searchParams.get('search') ?? undefined
  )
  const [onlyWithLogo, setOnlyWithLogo] = useState(false)
  const [page, setPage] = useState(1)
  const [onlyLiquidity, setOnlyLiquidity] = useState<
    TokenAliasLiquidityEnum | 'any'
  >('any')

  const tokens = useStore(model.$tokensAlias)

  useEffect(() => {
    model.fetchTokensAliasFx({
      pagination: {
        limit: 50,
        offset: 50 * page,
      },
      filter: {
        search,
        hasLogo: onlyWithLogo === true ? true : undefined,
        liquidity: onlyLiquidity === 'any' ? undefined : onlyLiquidity,
      },
      sort: {
        column: TokenAliasListSortInputTypeColumnEnum.CreatedAt,
        order: SortOrderEnum.Desc,
      },
    })
  }, [search, onlyWithLogo, onlyLiquidity, page])

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

  const handleChangePage = (toPage: number) => {
    setPage(toPage)
    window.scrollTo(0, 0)
  }

  const handleChangeOnlyWithLogo = (value: boolean) => {
    setOnlyWithLogo(value)
    setPage(1)
  }

  const handleChangeLiquidity = (value: TokenAliasLiquidityEnum | 'any') => {
    setOnlyLiquidity(value)
    setPage(1)
  }

  const handleChangeSearch = (value?: string) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <AppLayout>
      <Typography variant="h3" className={styles.title}>
        Tokens alias
      </Typography>
      <div className={styles.grid}>
        <Paper radius={8} className={styles.root}>
          <div className={styles.searchBox}>
            <Typography as="label" variant="body2">
              <Checkbox
                checked={onlyWithLogo}
                onChange={() => handleChangeOnlyWithLogo(!onlyWithLogo)}
              />{' '}
              Only with icon
            </Typography>

            <Select
              value={onlyLiquidity}
              onChange={(e) =>
                handleChangeLiquidity(e.target.value as TokenAliasLiquidityEnum)
              }
              className={styles.liquiditySelect}
            >
              <SelectOption key="any" value="any">
                Any
              </SelectOption>
              {Object.entries(TokenAliasLiquidityEnum).map(([label, value]) => (
                <SelectOption key={value} value={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>

            <Input
              width="auto"
              type="text"
              placeholder="Search"
              className={styles.formInputSearch}
              value={search}
              onChange={(v) => handleChangeSearch(v.target.value)}
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
                  <Select
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
                </Typography>
              </div>
            ))}
          </div>

          <ButtonBase onClick={() => handleChangePage(page + 1)}>
            next page(current {page})
          </ButtonBase>
        </Paper>
      </div>
    </AppLayout>
  )
}
