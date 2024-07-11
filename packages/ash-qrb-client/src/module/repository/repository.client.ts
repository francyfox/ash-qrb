import createClient from 'openapi-fetch';
import { ENV } from '@root/env';
import { paths } from 'ash-qrb-server/openapi/api';
const client = createClient<paths>({ baseUrl: ENV.NEXT_API_URL });
export default client;
