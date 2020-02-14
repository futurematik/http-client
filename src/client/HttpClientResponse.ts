import { HttpValueCollection } from '../util/HttpValueCollection';

export interface HttpClientResponse {
  status: number;
  headers: HttpValueCollection;
  body?: unknown;
}
