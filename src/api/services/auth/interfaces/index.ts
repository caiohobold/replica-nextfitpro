export interface IRefreshTokenResponse {
    data: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
    };
}

export interface ITokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

export interface IToken {
    username: string;
    password: string;
    codigoTenant: number;
    codigoUnidade: number;
    grant_type?: string;
}
