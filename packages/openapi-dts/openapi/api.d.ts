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
        /** @description Auth as user */
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
        /** @description Create a new user */
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
         *         "id": 6621079200071680,
         *         "publicId": "G3QD0vmQWCVWysrZ9yMD4",
         *         "fullName": "SnqRY",
         *         "role": 100,
         *         "password": "nIK`oT",
         *         "phone": "7200428649",
         *         "status": 100,
         *         "tags": [
         *           "mouse"
         *         ],
         *         "qr": "6",
         *         "createdAt": "2025-03-18T22:27:13.118Z",
         *         "updatedAt": "2024-10-09T11:45:03.322Z",
         *         "hasMessenger": [
         *           "telegram",
         *           "whatsapp"
         *         ],
         *         "hideContacts": false,
         *         "companyId": 3935379262537728
         *       }
         *     } */
        usersOne: unknown;
        /** @example {
         *       "count": 5,
         *       "items": [
         *         {
         *           "id": 3014526609915904,
         *           "publicId": "b0mcmvT63kfTGt8F8Miu-",
         *           "fullName": "]9y[p",
         *           "role": 100,
         *           "password": "@kImWK",
         *           "phone": "7647285550",
         *           "status": 100,
         *           "tags": [
         *             "cat",
         *             "dog",
         *             "mouse"
         *           ],
         *           "qr": "6",
         *           "createdAt": "2023-07-31T21:49:09.539Z",
         *           "updatedAt": "2024-12-02T18:39:23.914Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 19171096133632
         *         },
         *         {
         *           "id": 8427945186033664,
         *           "publicId": "OBhD7B2Fy04ltWJxKFzhs",
         *           "fullName": "SmA0^",
         *           "role": 100,
         *           "password": "r$E`qH",
         *           "phone": "7337260831",
         *           "status": 100,
         *           "tags": [
         *             "dog",
         *             "cat",
         *             "mouse"
         *           ],
         *           "qr": "1",
         *           "createdAt": "2023-09-02T13:38:05.382Z",
         *           "updatedAt": "2024-02-26T01:25:31.627Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 3483388702883840
         *         },
         *         {
         *           "id": 1262811340603392,
         *           "publicId": "pecOtsF0BWPFrNB01z_j5",
         *           "fullName": "%J-rp",
         *           "role": 100,
         *           "password": "/qWnn|",
         *           "phone": "7750526474",
         *           "status": 100,
         *           "tags": [
         *             "mouse",
         *             "dog"
         *           ],
         *           "qr": "8",
         *           "createdAt": "2023-09-16T08:44:28.132Z",
         *           "updatedAt": "2024-08-16T03:08:42.009Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 541408668680192
         *         },
         *         {
         *           "id": 6071186591055872,
         *           "publicId": "VT1iFHK0gsvsttiYbK_jT",
         *           "fullName": "J6C(t",
         *           "role": 100,
         *           "password": "p>wf7'",
         *           "phone": "7887122264",
         *           "status": 100,
         *           "tags": [
         *             "cat",
         *             "dog"
         *           ],
         *           "qr": "9",
         *           "createdAt": "2024-06-03T21:12:53.372Z",
         *           "updatedAt": "2024-01-20T03:46:13.960Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 4843216966778880
         *         },
         *         {
         *           "id": 4639649813233664,
         *           "publicId": "gZuoSex6MaWKPg_g-KZJG",
         *           "fullName": "/HO$A",
         *           "role": 100,
         *           "password": "IHzKyb",
         *           "phone": "7224860144",
         *           "status": 100,
         *           "tags": [
         *             "mouse",
         *             "cat",
         *             "dog"
         *           ],
         *           "qr": "2",
         *           "createdAt": "2024-06-14T12:47:38.105Z",
         *           "updatedAt": "2023-09-09T20:07:55.729Z",
         *           "hasMessenger": [
         *             "telegram",
         *             "whatsapp"
         *           ],
         *           "hideContacts": false,
         *           "companyId": 542460723855360
         *         }
         *       ]
         *     } */
        usersMany: unknown;
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
                content: {
                    "application/json": Record<string, never>;
                    "multipart/form-data": Record<string, never>;
                    "text/plain": Record<string, never>;
                };
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
                content: {
                    "application/json": {
                        item: {
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
                    };
                    "multipart/form-data": {
                        item: {
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
                    };
                    "text/plain": {
                        item: {
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
                    };
                };
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
                content: {
                    "application/json": {
                        item: {
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
                    };
                    "multipart/form-data": {
                        item: {
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
                    };
                    "text/plain": {
                        item: {
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
                    };
                };
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
            /** @description Remove cookie */
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
