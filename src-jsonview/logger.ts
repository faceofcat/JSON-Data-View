namespace net.ndrei.json.logging {
    // TODO: make this an emum... maybe?
    export let level: "debug" | "info" | "warn" | "error" = "debug";

    const levels: {[level: string]: number} = {
        "debug": 0,
        "info": 1,
        "warn": 2,
        "error": 3
    };

    function expandArgs(message: string, args: any[]): { message: string, args: any[] } {
        const result = {
            message: message,
            args: args
        };

        const indicesToRemove: number[] = [];
        result.message = result.message.replace(/{(\d+)}/g, (match, rawNumber) => {
            if (typeof rawNumber != "undefined") {
                const number = Number(rawNumber);
                if (typeof result.args[number] != undefined) {
                    if (!indicesToRemove.some(x => x == number)) {
                        indicesToRemove.push(number);
                    }
                    return result.args[number];
                }
            };
            return match;
        });
        if (indicesToRemove.length > 0) {
            result.args = result.args.filter((a, i) => {
                return indicesToRemove.every(x => x != i);
            });
        }

        return result;
    }

    function outputMessage(level: number, cb: (message: any, ...optional: any[]) => void, message: string, ...args: any[]): boolean {
        if ((level >= (levels[logging.level])) && cb && message) {
            const finalMessage = expandArgs(message, args);
            cb(finalMessage.message, ...(finalMessage.args || []));
            return true;
        }
        return false;
    }

    function isDebugLevel() {
        return level == "debug";
    }

    export class Log {
        private prefix: string;
        private static sections: string[] = [];

        constructor(private category: string, prefixPattern = "[{0}]: ") {
            this.prefix = expandArgs(prefixPattern, [category]).message;
        }

        debug(message: string, ...args: any[]): boolean {
            return (console && console.debug)
                ? outputMessage(levels["debug"], console.debug, this.prefix + (message || ''), ...args)
                : false;
        }

        info(message: string, ...args: any[]): boolean {
            return (console && console.info) 
                ? outputMessage(levels["info"], console.info, this.prefix + (message || ''), ...args)
                : false;
        }
        
        warn(message: string, ...args: any[]): boolean {
            return (console && console.warn) 
                ? outputMessage(levels["message"], console.warn, this.prefix + (message || ''), ...args)
                : false;
        }
        
        error(message: string, ...args: any[]): boolean {
            return (console && console.error) 
                ? outputMessage(levels["error"], console.error, this.prefix + (message || ''), ...args)
                : false;
        }

        enterSection(sectioName: string) {
            Log.enterSection(sectioName, this);
        }

        private static enterSection(sectionName: string, log: Log): void {
            if (console && console.group) {
                Log.sections.push(sectionName);
                console.group(sectionName);
                if (console.time) {
                    console.time(sectionName);
                }
            }
            else if (log) {
                log.debug("'console.group' not defined.");
            }
        }

        leaveSection(sectionName: string = undefined) {
            Log.leaveSection(sectionName, this);
        }

        private static leaveSection(sectionName: string = undefined, log: Log): void {
            if (console && console.groupEnd) {
                let topSection = undefined;
                do {
                    if (Log.sections.length == 0) {
                        if (log) {
                            log.debug("Logging section '{0}' not found.", sectionName);
                        }
                        return;
                    }
                    topSection = Log.sections.pop();
                    sectionName = sectionName || topSection;
                } while (sectionName != topSection);

                if (console.timeEnd) {
                    console.timeEnd(sectionName);
                }
                console.groupEnd();
            }
            else if (log) {
                log.debug("'console.groupEnd' not defined.");
            }
        }
    }
}