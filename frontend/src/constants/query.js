import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    getAllUsers {
      id
      stories {
        caption
        duration
        id
        img
        mediaType
        timestamp
        viewed
        viewedAt
      }
      name
      img
    }
  }
`;

export const VIEW_STORY_MUTATION = gql`
  mutation ViewStory($storyId: ID!) {
    viewStory(storyId: $storyId) {
      id
      duration
      caption
      img
      mediaType
      timestamp
      viewed
      viewedAt
    }
  }
`;
