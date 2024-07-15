export interface paths {
    "/api/companies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get companies collection */
        get: operations["getApiCompanies"];
        put?: never;
        /** @description Insert item to companies */
        post: operations["postApiCompanies"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/companies/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get single item from companies by id */
        get: operations["getApiCompaniesById"];
        put?: never;
        post?: never;
        /** @description Delete item from companies */
        delete: operations["deleteApiCompaniesById"];
        options?: never;
        head?: never;
        /** @description Patch item from companies */
        patch: operations["patchApiCompaniesById"];
        trace?: never;
    };
    "/api/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get payments collection */
        get: operations["getApiPayments"];
        put?: never;
        /** @description Insert item to payments */
        post: operations["postApiPayments"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/payments/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get single item from payments by id */
        get: operations["getApiPaymentsById"];
        put?: never;
        post?: never;
        /** @description Delete item from payments */
        delete: operations["deleteApiPaymentsById"];
        options?: never;
        head?: never;
        /** @description Patch item from payments */
        patch: operations["patchApiPaymentsById"];
        trace?: never;
    };
    "/api/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get users collection */
        get: operations["getApiUsers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Get single item from users by id */
        get: operations["getApiUsersById"];
        put?: never;
        post?: never;
        /** @description Delete item from users */
        delete: operations["deleteApiUsersById"];
        options?: never;
        head?: never;
        /** @description Patch item from users */
        patch: operations["patchApiUsersById"];
        trace?: never;
    };
    "/api/auth/sign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiAuthSign-in"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/sign-up": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["postApiAuthSign-up"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/profile": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiAuthProfile"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/auth/sign-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiAuthSign-out"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getApiHealth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description Returns ok
         * @example ok
         */
        Health: string;
        /** @example {
         *       "code": 400,
         *       "message": "Error message"
         *     } */
        Error: {
            code: number;
            message: string;
        };
        /** @example {
         *       "item": {
         *         "id": 886230264840192,
         *         "publicId": "weCdSqtVKiksnUQBn-gqy",
         *         "fullName": "X*m_x",
         *         "role": 100,
         *         "password": "eMvS6j",
         *         "phone": "7433671162",
         *         "status": 100,
         *         "tags": [
         *           "mouse",
         *           "cat"
         *         ],
         *         "qr": "0",
         *         "createdAt": "2023-09-25T06:24:16.806Z",
         *         "updatedAt": "2025-04-04T21:13:21.308Z",
         *         "hasMessenger": [
         *           "telegram",
         *           "whatsapp"
         *         ],
         *         "hideContacts": false,
         *         "companyId": 6871087520415744
         *       }
         *     } */
        usersOne: {
            id: number;
            publicId: string;
            role: number | null;
            fullName: string;
            password: string | null;
            phone: string;
            status: number | null;
            hasMessenger: string[];
            tags: string[];
            hideContacts: boolean | null;
            qr: string | null;
            companyId: number | null;
            createdAt: Record<string, never> | null;
            updatedAt: Record<string, never> | null;
        };
        /** @example {
         *       "count": 5,
         *       "items": [
         *         {
         *           "id": 2569823355666432,
         *           "publicId": "M1cN_xp23i_K8_SlaY30e",
         *           "fullName": "_^A(^",
         *           "role": 100,
         *           "password": "/a}mU/",
         *           "phone": "7324651949",
         *           "status": 100,
         *           "tags": [
         *             "dog",
         *             "cat",
         *             "mouse"
         *           ],
         *           "qr": "4",
         *           "createdAt": "2025-04-22T21:38:07.201Z",
         *           "updatedAt": "2024-10-26T06:00:54.482Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 1987682471247872
         *         },
         *         {
         *           "id": 2295515490287616,
         *           "publicId": "w0sSu1HmzLZU6Au_Z4YiB",
         *           "fullName": "\"JZ6M",
         *           "role": 100,
         *           "password": "q\",XbP",
         *           "phone": "7453087983",
         *           "status": 100,
         *           "tags": [
         *             "mouse",
         *             "cat",
         *             "dog"
         *           ],
         *           "qr": "8",
         *           "createdAt": "2025-02-13T18:46:18.521Z",
         *           "updatedAt": "2024-11-12T16:04:21.650Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 4407756771557376
         *         },
         *         {
         *           "id": 7166092503941120,
         *           "publicId": "Oa7TJWEPmakGcru9oC3tz",
         *           "fullName": "v8J)H",
         *           "role": 100,
         *           "password": "-`f6}C",
         *           "phone": "7442232208",
         *           "status": 100,
         *           "tags": [
         *             "cat"
         *           ],
         *           "qr": "0",
         *           "createdAt": "2024-06-03T17:17:51.491Z",
         *           "updatedAt": "2025-03-30T19:21:15.641Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 2192215256334336
         *         },
         *         {
         *           "id": 6531294584373248,
         *           "publicId": "qnN3ujnBifAUbxfrHnRLb",
         *           "fullName": "p@5q(",
         *           "role": 100,
         *           "password": "@1+8l-",
         *           "phone": "7061884654",
         *           "status": 100,
         *           "tags": [
         *             "cat",
         *             "mouse"
         *           ],
         *           "qr": "4",
         *           "createdAt": "2023-12-25T11:54:45.711Z",
         *           "updatedAt": "2023-07-28T16:22:27.541Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 1038337565523968
         *         },
         *         {
         *           "id": 8745714924388352,
         *           "publicId": "OCz0gaoOjnG8FG6fh7Nbg",
         *           "fullName": "v7]@m",
         *           "role": 100,
         *           "password": "ozd<+)",
         *           "phone": "7399957962",
         *           "status": 100,
         *           "tags": [
         *             "dog"
         *           ],
         *           "qr": "8",
         *           "createdAt": "2023-10-17T19:50:10.379Z",
         *           "updatedAt": "2024-07-10T03:04:45.975Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 2902619808858112
         *         }
         *       ]
         *     } */
        usersMany: {
            count?: number;
            items?: {
                id: number;
                publicId: string;
                role: number | null;
                fullName: string;
                password: string | null;
                phone: string;
                status: number | null;
                hasMessenger: string[];
                tags: string[];
                hideContacts: boolean | null;
                qr: string | null;
                companyId: number | null;
                createdAt: Record<string, never> | null;
                updatedAt: Record<string, never> | null;
            };
        }[];
        paymentsOne: Record<string, never>;
        paymentsMany: Record<string, never>;
        companiesOne: Record<string, never>;
        companiesMany: Record<string, never>;
    };
    responses: {
        /** @description The specified resource was not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description Unauthorized */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getApiCompanies: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["companiesMany"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    postApiCompanies: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    id?: number;
                    publicId?: string;
                    name: string;
                    payments?: string[];
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                "multipart/form-data": {
                    id?: number;
                    publicId?: string;
                    name: string;
                    payments?: string[];
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                "text/plain": {
                    id?: number;
                    publicId?: string;
                    name: string;
                    payments?: string[];
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response. Item created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiCompaniesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["companiesOne"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    deleteApiCompaniesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patchApiCompaniesById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiPayments: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["paymentsMany"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    postApiPayments: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    id?: number;
                    name: string;
                    qr: string;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                "multipart/form-data": {
                    id?: number;
                    name: string;
                    qr: string;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
                "text/plain": {
                    id?: number;
                    name: string;
                    qr: string;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                };
            };
        };
        responses: {
            /** @description Successful response. Item created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiPaymentsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["paymentsOne"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    deleteApiPaymentsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patchApiPaymentsById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiUsers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["usersMany"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
        };
    };
    getApiUsersById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: components["schemas"]["usersOne"];
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    deleteApiUsersById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    patchApiUsersById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string | number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Error response */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "postApiAuthSign-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    phone: string;
                    password: string;
                };
                "multipart/form-data": {
                    phone: string;
                    password: string;
                };
                "text/plain": {
                    phone: string;
                    password: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "postApiAuthSign-up": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    id?: number;
                    publicId?: string;
                    role?: number | null;
                    fullName: string;
                    password?: string | null;
                    phone: string;
                    status?: number | null;
                    hasMessenger?: string[];
                    tags?: string[];
                    hideContacts?: boolean | null;
                    qr?: string | null;
                    companyId?: number | null;
                    createdAt?: Record<string, never> | null;
                    updatedAt?: Record<string, never> | null;
                };
                "multipart/form-data": {
                    id?: number;
                    publicId?: string;
                    role?: number | null;
                    fullName: string;
                    password?: string | null;
                    phone: string;
                    status?: number | null;
                    hasMessenger?: string[];
                    tags?: string[];
                    hideContacts?: boolean | null;
                    qr?: string | null;
                    companyId?: number | null;
                    createdAt?: Record<string, never> | null;
                    updatedAt?: Record<string, never> | null;
                };
                "text/plain": {
                    id?: number;
                    publicId?: string;
                    role?: number | null;
                    fullName: string;
                    password?: string | null;
                    phone: string;
                    status?: number | null;
                    hasMessenger?: string[];
                    tags?: string[];
                    hideContacts?: boolean | null;
                    qr?: string | null;
                    companyId?: number | null;
                    createdAt?: Record<string, never> | null;
                    updatedAt?: Record<string, never> | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiAuthProfile: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    "getApiAuthSign-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getApiHealth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: components["schemas"]["Health"];
        };
    };
}
