import { HttpValueCollection } from '../util/HttpValueCollection';

export interface HttpClientRequest {
  url: string;
  method?: string;
  headers?: HttpValueCollection;
  body?: unknown;
}
