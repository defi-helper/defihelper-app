import { gql } from 'urql'

export const PROTOCOL_SOCIAL_POSTS = gql`
  query ProtocolSocialPosts(
    $filter: ProtocolFilterInputType!
    $pagination: ProtocolSocialPostListPaginationInputType = {
      limit: 3
      offset: 0
    }
  ) {
    protocol(filter: $filter) {
      socialPosts(
        sort: [{ column: createdAt, order: desc }]
        pagination: $pagination
      ) {
        list {
          id
          provider
          title
          content
          link
          createdAt
        }
        pagination {
          count
        }
      }
    }
  }
`
