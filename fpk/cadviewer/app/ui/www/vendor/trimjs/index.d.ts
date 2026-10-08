import { AuthorizeFileResult, FileDetailsOptions, HostSnapshot, PlatformConfig, TrimAppOptions } from './types';
import { AppAuthMethod, AppAuthParams, AppAuthResult } from './app-auth';
import { ObservableLike } from './mobile/index';
import { AppBridgeResponse, OpenAppParams, ResponseData, FilePickerParams, QueryConfig } from '@fn/micro-app-postmate';
export type { FilePickerParams, QueryConfig, ResponseData } from '@fn/micro-app-postmate';
/**
 * nas 应用 SDK
 *
 * @trim/app - NAS 应用 SDK
 */
export type { PlatformConfig, TrimAppOptions } from './types';
export type { HostSnapshot } from './types';
export type { AppBridgeResponse, AuthorizeFileResult, FileDetailsOptions } from './types';
export type { AppAuthAuthorizeParams, AppAuthBaseParams, AppAuthCallbackError, AppAuthCallbackStatus, AppAuthMethod, AppAuthMethodParamsMap, AppAuthParams, AppAuthPickFileParams, AppAuthPickSharedFileParams, AppAuthResult, } from './types';
/**
 * Trim App 实例类
 */
export declare class TrimApp {
    private options;
    private flutterInAppWebView;
    private osConnector;
    private initPromise;
    private appApiVersion?;
    isWeb: boolean;
    isStandaloneWeb: boolean;
    constructor(options?: TrimAppOptions);
    private init;
    private getWebMethods;
    private loadAppMessage;
    private initMobileAppApi;
    private assertMobileAppApi;
    private isAtLeastVersion;
    private parseVersion;
    callAppMethod<T>(fn: string, ...params: Array<string | undefined>): Promise<T | null>;
    /**
     * 等待初始化完成
     *
     * @returns Promise
     */
    ready(): Promise<void>;
    /**
     * 获取配置
     */
    getOptions(): TrimAppOptions;
    /**
     * 更新配置
     */
    setOptions(options: Partial<TrimAppOptions>): void;
    /**
     * 获取平台配置
     */
    getPlatformConfig(): Promise<PlatformConfig>;
    getHostSnapshot(): Promise<HostSnapshot>;
    getAppAuthBaseUrl(): Promise<string>;
    buildAppAuthUrl<TMethod extends AppAuthMethod>(method: TMethod, params: AppAuthParams<NoInfer<TMethod>>): Promise<string>;
    openAppAuth<TMethod extends AppAuthMethod>(method: TMethod, params: AppAuthParams<NoInfer<TMethod>>, options?: {
        target?: string;
        features?: string;
    }): Promise<string>;
    parseAppAuthCallback(input?: string | URL | URLSearchParams): AppAuthResult;
    /**
     * setTitle - 设置标题
     *
     * @param title 标题文本
     */
    setTitle(title: string): Promise<void>;
    /**
     * setExitPageTips - 设置退出页面提示
     *
     * @param params 提示参数
     */
    setExitPageTips(params?: {
        title?: string;
        content?: string;
    }): Promise<unknown>;
    /**
     * 通过应用打开某个文件
     */
    openFile(path: string): Promise<unknown>;
    /**
     * 打开文件管理器
     */
    openFileManager(path: string): Promise<unknown>;
    showFileDetails(paths: string[], options?: FileDetailsOptions): Promise<unknown>;
    authorizeUserFile(path: string): Promise<AppBridgeResponse<AuthorizeFileResult> | undefined>;
    authorizeSharedFile(path: string): Promise<AppBridgeResponse<AuthorizeFileResult> | undefined>;
    /**
     * 打开当前应用在系统中的应用设置页
     */
    openAppSetting(): Promise<unknown>;
    /**
     * 打开应用
     *
     * @param anchor 锚点
     */
    openApp(anchor: string): Promise<unknown>;
    /**
     * 打开自定义应用
     *
     * @param appName 自定义应用标识
     * @param options 自定义应用配置和打开参数
     */
    openCustomApp(appName: string, options: OpenAppParams): Promise<void>;
    /**
     * 打开外部链接 App 端通过系统浏览器打开，Web 端沿用 window.open 行为
     */
    openURL(url: string, target?: string, features?: string): Promise<unknown>;
    /**
     * 关闭应用
     */
    close(): Promise<unknown>;
    /**
     * 请求接口
     */
    query<T>(params: any, config: QueryConfig & {
        observable: true;
    }): Promise<ObservableLike<ResponseData<T>>>;
    query<T>(params: any, config?: QueryConfig): Promise<ResponseData<T>>;
    refreshToken(): Promise<void>;
    /**
     * 监听事件（仅 Web 平台）
     */
    $on(event: string, cb: (...args: any[]) => void): Promise<void>;
    /**
     * 取消监听事件（仅 Web 平台）
     */
    $off(event: string, cb: (...args: any[]) => void): Promise<void>;
    /**
     * 监听一次事件（仅 Web 平台）
     */
    $once(event: string, cb: (...args: any[]) => void): Promise<void>;
    /**
     * 选择文件
     */
    pickFile(params: FilePickerParams): Promise<string[] | undefined>;
    /**
     * 选择用户文件并授权给当前应用
     */
    pickUserFile(params?: FilePickerParams): Promise<AppBridgeResponse<string[]> | undefined>;
    /**
     * 选择共享文件并授权给当前应用
     */
    pickSharedFile(params?: Omit<FilePickerParams, 'directory'>): Promise<AppBridgeResponse<string[]> | undefined>;
}
export default TrimApp;
