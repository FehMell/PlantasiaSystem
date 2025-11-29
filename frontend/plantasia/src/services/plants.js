export async function createPlant(userId, searchName, nickname) {
  const response = await api.post(`/users/${userId}/plants`, {
    searchName,
    nickname
  });

  return response.data;
}
