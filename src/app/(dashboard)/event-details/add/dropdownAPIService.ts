import { get, post } from "@/services/apiService";

export async function getCountry(endpoint: any) {
  // Replace with your API logic
  const response = await get(endpoint);

  return response;
}

export async function getState(endpoint: any, params: any) {
  const response = await post(endpoint, params);
  return response;
}

export async function getCity(endpoint: any, params: any) {
  const response = await post(endpoint, params);
  return response;
}

export async function getCategories(endpoint: any) {
  // Replace with your API logic
  const response = await get(endpoint);

  return response;
}
