export interface IRequestBase {
    version?: 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8' | 'v9' | 'v10';
    endPoint?: string;
    params?: any;
}