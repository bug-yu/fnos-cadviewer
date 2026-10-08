import { OSConfig, OSMethods, ConnectionResult, FilePickerParams } from '@fn/micro-app-postmate';
import { AppBridgeResponse, AuthorizeFileResult, FileDetailsOptions, HostSnapshot, PlatformConfig, TrimAppOptions } from '../types';
type HostMethods = OSMethods & {
    setExitPageTips: (params?: {
        title?: string;
        content?: string;
    }) => void;
    openFileManager: (path: string) => void;
    openFileManagerApp?: (path: string) => void;
    openFile: (path: string) => void;
    openAppSetting: () => void;
    pickUserFile: (params?: FilePickerParams) => Promise<AppBridgeResponse<string[]>>;
    pickSharedFile: (params?: Omit<FilePickerParams, 'directory'>) => Promise<AppBridgeResponse<string[]>>;
    showFileDetails: (paths: string[], options?: FileDetailsOptions) => void;
    authorizeUserFile: (path: string) => Promise<AppBridgeResponse<AuthorizeFileResult>>;
    authorizeSharedFile: (path: string) => Promise<AppBridgeResponse<AuthorizeFileResult>>;
    refreshToken: () => Promise<void>;
    getPlatformConfig: () => Promise<PlatformConfig>;
    getHostSnapshot: () => Promise<HostSnapshot>;
    close: () => void;
};
export type OSConnection = ConnectionResult<HostMethods, OSConfig>;
export declare const initWeb: (options?: TrimAppOptions) => Promise<OSConnection>;
export {};
