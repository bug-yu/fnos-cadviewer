/**
 * Logger 工具类 只有在 debug 模式下才会输出日志
 */
declare class Logger {
    private debug;
    /**
     * 设置 debug 模式
     *
     * @param enabled 是否启用 debug
     */
    setDebug(enabled: boolean): void;
    /**
     * 获取当前 debug 状态
     */
    isDebug(): boolean;
    /**
     * 输出日志（只在 debug 模式下）
     *
     * @param args 日志参数
     */
    log(...args: any[]): void;
    /**
     * 输出警告日志（只在 debug 模式下）
     *
     * @param args 日志参数
     */
    warn(...args: any[]): void;
    /**
     * 输出错误日志（只在 debug 模式下）
     *
     * @param args 日志参数
     */
    error(...args: any[]): void;
    /**
     * 输出信息日志（只在 debug 模式下）
     *
     * @param args 日志参数
     */
    info(...args: any[]): void;
}
export declare const logger: Logger;
export {};
