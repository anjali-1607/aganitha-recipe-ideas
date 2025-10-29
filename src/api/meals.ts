import axios from "axios";
const BASE = "https://www.themealdb.com/api/json/v1/1";

export async function filterByIngredient(ingredient: string) {
  const url = `${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`;
  const { data } = await axios.get(url);
  return data.meals ?? [];
}

export async function searchByName(q: string) {
  const url = `${BASE}/search.php?s=${encodeURIComponent(q)}`;
  const { data } = await axios.get(url);
  return data.meals ?? [];
}

export async function getMeal(id: string) {
  const { data } = await axios.get(`${BASE}/lookup.php?i=${id}`);
  return data.meals?.[0] ?? null;
}
