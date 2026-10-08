import { FilePickerParams, QueryConfig, ResponseData } from '@fn/micro-app-postmate';
export interface FlutterInAppWebView {
    callHandler: (fn: string, ...params: Array<string | undefined>) => Promise<string>;
    _platformReady?: boolean;
}
declare global {
    interface Window {
        flutter_inappwebview: FlutterInAppWebView;
        fnAppMessage?: (message: string) => void;
        _flutter_onAppObservableQueryResult?: (message: string | MobileObservableQueryResult<any>) => void;
        onAppHeaderGoBack?: () => boolean | number | string;
    }
}
export declare const initMobile: () => Promise<FlutterInAppWebView>;
export interface FnAppMessage<T> {
    reqId: string;
    method: string;
    result: T;
}
export declare const callHandler: <T>(flutterInAppWebView: FlutterInAppWebView, fn: string, ...params: Array<string | undefined>) => Promise<T | null>;
type ObservableObserver<T> = {
    next?: (value: T) => void;
    error?: (error: unknown) => void;
    complete?: () => void;
};
export type ObservableSubscription = {
    unsubscribe: () => void;
};
export type ObservableLike<T> = {
    subscribe: (observerOrNext?: ObservableObserver<T> | ((value: T) => void), error?: (error: unknown) => void, complete?: () => void) => ObservableSubscription;
};
type InternalObservableObserver<T> = {
    next: (value: T) => void;
    error: (error: unknown) => void;
    complete: () => void;
};
declare class SimpleObservable<T> implements ObservableLike<T> {
    private readonly subscribeFn;
    constructor(subscribeFn: (observer: InternalObservableObserver<T>) => void | (() => void));
    subscribe(observerOrNext?: ObservableObserver<T> | ((value: T) => void), error?: (error: unknown) => void, complete?: () => void): {
        unsubscribe: () => void;
    };
}
type MobileObservableQueryResult<T> = ResponseData<T> & {
    reqId: string;
    result?: string;
};
export declare function createMobileObservableQuery<T>(flutterInAppWebView: FlutterInAppWebView, params: any, config?: QueryConfig): SimpleObservable<ResponseData<T>>;
/**
 * App 端当前仅支持 title、multiple、directory 这 3 个参数。
 */
export declare function pickFilePromise(flutterInAppWebView: FlutterInAppWebView, params: FilePickerParams): Promise<string[] | undefined>;
export {};
