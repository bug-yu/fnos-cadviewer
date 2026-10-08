import { FilePickerParams } from '@fn/micro-app-postmate';
export declare const appAuthMethodRouteMap: {
    readonly pickFile: "pick-file";
    readonly pickUserFile: "pick-user-file";
    readonly pickSharedFile: "pick-shared-file";
    readonly authorizeUserFile: "authorize-user-file";
    readonly authorizeSharedFile: "authorize-shared-file";
};
export type AppAuthMethod = keyof typeof appAuthMethodRouteMap;
export type AppAuthRouteMethod = (typeof appAuthMethodRouteMap)[AppAuthMethod];
export type AppAuthPickRouteMethod = Extract<AppAuthRouteMethod, 'pick-file' | 'pick-user-file' | 'pick-shared-file'>;
export type AppAuthAuthorizeRouteMethod = Extract<AppAuthRouteMethod, 'authorize-user-file' | 'authorize-shared-file'>;
export type AppAuthCallbackStatus = 'success' | 'cancel' | 'error';
export type AppAuthCallbackError = 'access_denied';
export interface AppAuthBaseParams {
    appName: string;
    redirectUri?: string;
    state?: string;
}
export interface AppAuthPickFileParams extends AppAuthBaseParams {
    directory?: boolean;
    accept?: string[];
    sidebarGroup?: FilePickerParams['sidebarGroup'];
}
export interface AppAuthPickSharedFileParams extends AppAuthBaseParams {
    sidebarGroup?: FilePickerParams['sidebarGroup'];
}
export interface AppAuthAuthorizeParams extends AppAuthBaseParams {
    path: string;
}
export interface AppAuthMethodParamsMap {
    pickFile: AppAuthPickFileParams;
    pickUserFile: AppAuthPickFileParams;
    pickSharedFile: AppAuthPickSharedFileParams;
    authorizeUserFile: AppAuthAuthorizeParams;
    authorizeSharedFile: AppAuthAuthorizeParams;
}
export type AppAuthParams<TMethod extends AppAuthMethod = AppAuthMethod> = AppAuthMethodParamsMap[TMethod];
export interface AppAuthResult {
    status?: AppAuthCallbackStatus;
    error?: AppAuthCallbackError;
    method?: AppAuthMethod;
    appName?: string;
    state?: string;
    path?: string[];
}
export declare function createAppAuthPath(routeMethod: AppAuthRouteMethod): string;
export declare function buildAppAuthUrl<TMethod extends AppAuthMethod>(baseUrl: string, method: TMethod, params: AppAuthParams<NoInfer<TMethod>>, locationOrigin?: string): string;
export declare function parseAppAuthCallback(input?: string | URL | URLSearchParams): {
    status: AppAuthResult["status"];
    error: AppAuthResult["error"];
    method: "pickFile" | "pickUserFile" | "pickSharedFile" | "authorizeUserFile" | "authorizeSharedFile" | undefined;
    appName: string | undefined;
    state: string | undefined;
    path: string[] | undefined;
};
