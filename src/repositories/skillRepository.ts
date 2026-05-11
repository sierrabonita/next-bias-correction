// TODO: new Error をカスタムエラークラスに置き換える
const getBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL が定義されていません");
  }
  return baseUrl;
};

export const fetchAllSkills = async () => {
  const res = await fetch(`${getBaseUrl()}/skills`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Infrastructure Error");
  }

  return res.json();
};
