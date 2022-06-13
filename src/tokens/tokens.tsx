import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  BlockchainEnum,
  SortOrderEnum,
  TokenAliasLiquidityEnum,
  TokenFragment,
  TokenListQuerySortInputTypeColumnEnum,
} from '~/api/_generated-types'
import { ButtonBase } from '~/common/button-base'
import { useDialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { AppLayout } from '~/layouts'
import { networksConfig } from '~/networks-config'
import { TokensCreateTokenDialog } from './tokens-create-token-dialog/tokens-create-token-dialog'
import * as styles from './tokens.css'
import * as model from './tokens.model'
import { paths } from '~/paths'

export const Tokens: React.VFC = () => {
  const [openTokenDialog] = useDialog(TokensCreateTokenDialog)
  const [network, setNetwork] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<undefined | string>(undefined)
  const [tokenAlias, setTokenAlias] = useState<undefined | string>(undefined)
  const [page, setPage] = useState(1)

  const tokens = useStore(model.$tokens)
  const tokensAlias = useStore(model.$tokensAlias)

  const [tokenAliasSearch, setTokenAliasSearch] = useState<undefined | string>(
    undefined
  )

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

  useEffect(() => {
    model.fetchTokensFx({
      pagination: {
        limit: 50,
        offset: 50 * page,
      },
      filter: {
        tokenAlias,
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
  }, [network, search, tokenAlias, page])

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

  const handleUpdateTokenLiquidity = (
    token: TokenFragment,
    liquidity: TokenAliasLiquidityEnum
  ) => {
    if (!token.alias) return
    model.tokenAliasUpdateFx({
      id: token.alias.id,
      input: {
        liquidity,
      },
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    setPage(1)
  }, [network, search, tokenAlias])

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

            <Select
              onChange={(e) => setTokenAlias(e.target.value)}
              value={tokenAlias}
              className={styles.formInputSearch}
              placeholder="Alias"
              header={
                <Input
                  placeholder="Search"
                  defaultValue={tokenAliasSearch}
                  onChange={(e) => setTokenAliasSearch(e.target.value)}
                  className={styles.formInputSearch}
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
                  [{alias.liquidity.toUpperCase()}] {alias.name.substr(0, 30)}
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
            <Typography variant="body3">Type</Typography>
            <Typography variant="body3">Name</Typography>
            <Typography variant="body3">Smbl</Typography>
            <Typography variant="body3">Dcmls</Typography>
            <Typography variant="body3">Ntwrk</Typography>
            <Typography variant="body3">Price feed</Typography>
            <Typography variant="body3">Alias</Typography>
            <Typography variant="body3" />
          </div>
          <div>
            {tokens.map((token) => (
              <div className={styles.tableRow}>
                <Typography variant="body2">
                  <Select
                    defaultValue={token.alias?.liquidity}
                    className={styles.liquiditySelect}
                    onChange={(e) => {
                      handleUpdateTokenLiquidity(
                        token,
                        e.target.value as TokenAliasLiquidityEnum
                      )
                    }}
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
                <Typography variant="body2">
                  <Link
                    target="_blank"
                    href={`${
                      networksConfig[token.network]?.explorerUrl
                    }/address/${token.address}`}
                  >
                    {token.name}
                  </Link>
                </Typography>
                <Typography variant="body3">{token.symbol}</Typography>
                <Typography variant="body3">{token.decimals}</Typography>
                <Typography variant="body3">
                  {networksConfig[token.network]?.title}
                </Typography>
                <Typography variant="body3">
                  {token.priceFeed?.type ?? '-'}
                </Typography>

                <Typography variant="body3">
                  <ButtonBase
                    as={ReactRouterLink}
                    to={`${paths.tokensAlias}?search=${token.alias?.id}`}
                  >
                    {token.alias ? token.alias.name : '-'}
                  </ButtonBase>
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

          <ButtonBase onClick={() => setPage(page + 1)}>
            next page(current {page})
          </ButtonBase>
        </Paper>
      </div>
    </AppLayout>
  )
}
