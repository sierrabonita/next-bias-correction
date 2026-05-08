export const fetchSkills = async () => {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error('API_BASE_URL が定義されていません');
  }

  const res = await fetch(`${baseUrl}/skills`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("skills データの取得に失敗しました");

  return res.json();
};
