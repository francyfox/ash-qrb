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
    schemas: never;
    responses: never;
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
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
