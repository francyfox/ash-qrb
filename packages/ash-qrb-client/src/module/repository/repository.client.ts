import createClient from 'openapi-fetch';
import { ENV } from '@root/env';
import { paths } from 'ash-qrb-server/openapi/api';
const ApiClient = createClient<paths>({ baseUrl: ENV.NEXT_API_URL });
export default ApiClient;
