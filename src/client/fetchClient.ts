import { HttpClient } from './HttpClient';
import { HttpClientRequest } from './HttpClientRequest';
import { HttpClientResponse } from './HttpClientResponse';
import { foldHeaders } from '../util/foldHeaders';
import { HttpValueCollection } from '../util/HttpValueCollection';
import { addValue } from '@fmtk/value-collection';

export type FetchLike = typeof fetch;

export function makeFetchClient(fetchImpl: FetchLike): HttpClient {
  return async (req: HttpClientRequest): Promise<HttpClientResponse> => {
    const { body, headers = {}, method = body ? 'POST' : 'GET', url } = req;

    if (
      typeof body !== 'undefined' &&
      typeof body !== 'string' &&
      body !== null
    ) {
      throw new Error(`expected body to be string, undefined or null`);
    }

    const response = await fetchImpl(url, {
      method,
      headers: foldHeaders(headers),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: body as any,
    });

    const responseBody = await response.text();
    let responseHeaders: HttpValueCollection = {};

    response.headers.forEach((value, name): void => {
      responseHeaders = addValue(responseHeaders, name, value);
    });

    const ret = {
      status: response.status,
      headers: responseHeaders,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      body: responseBody as any,
    };
    return ret;
  };
}
