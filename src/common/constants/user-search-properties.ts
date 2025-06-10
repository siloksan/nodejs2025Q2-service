export const USER_SEARCH_PROPERTIES = {
  ID: 'id',
  LOGIN: 'login',
} as const;

export type UserSearchProperty =
  (typeof USER_SEARCH_PROPERTIES)[keyof typeof USER_SEARCH_PROPERTIES];
