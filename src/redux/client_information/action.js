export const saveClientName = (clientName) => {
  return {
    type: "SAVE_CLIENT_NAME",
    payload: clientName,
  };
};

export const clearClientName = () => {
  return {
    type: "CLEAR_CLIENT_NAME"
  }
}
