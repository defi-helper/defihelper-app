import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import IconButton from '@material-ui/core/IconButton'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core'

export type ProposalVoteProps = {
  className?: string
  onVote: () => void
  onUnvote: () => void
  voted?: boolean
}

const useStyles = makeStyles((theme) => ({
  upvote: {
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  voted: {
    color: theme.palette.warning.light,
  },
}))

export const ProposalVote: React.FC<ProposalVoteProps> = (props) => {
  const handleVoteUnvote = props.voted ? props.onUnvote : props.onVote

  const classes = useStyles()

  return (
    <div className={classes.upvote}>
      <IconButton
        size="small"
        onClick={handleVoteUnvote}
        className={clsx(props.voted && classes.voted)}
      >
        <ThumbUpAltIcon />
      </IconButton>
      <div>{props.children ?? 0}</div>
    </div>
  )
}
