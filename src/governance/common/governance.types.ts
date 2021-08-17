export type GovernanceActionArguments = Record<
  string,
  { value: string; type: string }
>

export type GovernanceAction = {
  arguments: GovernanceActionArguments
  contract: string
  method: string
}
