import { TrimAppOptions } from '../types';
import { OSConnection } from './index';
export declare function probeExtensionHost(options?: TrimAppOptions): Promise<boolean>;
export declare function connectToExtensionHost(): Promise<OSConnection>;
