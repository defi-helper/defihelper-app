import { Input } from '~/common/input'

export type TradeBuyProps = {
  className?: string
}

export const TradeBuy: React.VFC<TradeBuyProps> = () => {
  return (
    <div>
      <Input label="Amount" leftSide={<>BTC</>} rightSide={<>BTC</>} />
      <Input label="Market price" />
      <Input label="Trailing buy" />
      <Input label="Total" />
    </div>
  )
}
