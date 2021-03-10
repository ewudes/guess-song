export const ActionType = {
  INCREMENT_MISTAKES: `game/incrementMistake`,
  INCREMENT_STEP: `game/incrementStep`,
  RESET_GAME: `game/reset`,
};

export const ActionCreate = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  })
};
