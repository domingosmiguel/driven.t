import { requestError } from '@/errors';
import { RequestError } from '@/protocols';
import axios from 'axios';

async function get(url: string) {
  try {
    const result = await axios.get(url);
    return result;
  } catch (error) {
    const { status, statusText } = error.response as RequestError;

    return requestError(status, statusText);
  }
}

export const request = {
  get,
};
