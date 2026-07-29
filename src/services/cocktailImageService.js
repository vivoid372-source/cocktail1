export async function generateCocktailPhoto(payload) {
  const response = await fetch('/api/generate-cocktail-image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      data?.error ||
        `成品照接口请求失败（HTTP ${response.status}）`,
    )
  }

  if (!data?.imageUrl) {
    throw new Error('图片接口没有返回有效图片。')
  }

  return data
}
