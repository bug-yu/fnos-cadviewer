/**
 * SDK 配置选项
 */
export interface TrimAppOptions {
    /**
     * 是否开启 debug 模式，开启后会输出日志
     */
    debug?: boolean;
}
export interface PlatformConfig {
    theme: 'dark' | 'light';
    language: string;
    appVersion?: string;
    systemVersion: string;
    format: {
        date?: string;
        time?: string;
    };
}
export interface HostSnapshot {
    status: string;
    host?: string;
    username?: string;
    currentSessionId?: string;
    sessions: Array<{
        id: string;
        label: string;
        host?: string;
        username?: string;
    }>;
    errorMessage?: string;
}
export interface FileDetailsOptions {
    admin?: boolean;
}
export type AppBridgeResponse<T> = {
    code: number;
    msg: string;
    data: T;
};
export type AuthorizeFileResult = boolean;
export type { AppAuthAuthorizeParams, AppAuthBaseParams, AppAuthCallbackError, AppAuthCallbackStatus, AppAuthMethod, AppAuthMethodParamsMap, AppAuthParams, AppAuthPickFileParams, AppAuthPickSharedFileParams, AppAuthResult, } from './app-auth';
