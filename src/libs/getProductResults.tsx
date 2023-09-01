import { base_url } from '@/config/constants';

export default async function getProductResults() {

  const response = await fetch(base_url + '/api/products');

  return response.json();

}
