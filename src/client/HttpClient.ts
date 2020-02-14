import { HttpClientRequest } from './HttpClientRequest';
import { HttpClientResponse } from './HttpClientResponse';

export interface HttpClient {
  (request: HttpClientRequest): PromiseLike<HttpClientResponse>;
}
