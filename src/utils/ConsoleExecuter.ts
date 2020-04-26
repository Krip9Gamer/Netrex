/***
 *      _   _      _
 *     | \ | |    | |
 *     |  \| | ___| |_ _ __ _____  __
 *     | . ` |/ _ \ __| '__/ _ \ \/ /
 *     | |\  |  __/ |_| | |  __/>  <
 *     |_| \_|\___|\__|_|  \___/_/\_\
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 */
import Server from '@/server/Server';
import ConsoleLogger from './ConsoleLogger';
const stdin = process.openStdin();

class ConsoleExecuter {
    private server: Server;
    private logger: ConsoleLogger;

    constructor(server: Server) {
        this.server = server;
        this.logger = new ConsoleLogger('[>] %output');
        this.register();
    }

    private register(): void {
        stdin.on('data', (d) => {
            const msg: string = d.toString();
            const cmd: string = msg.split(' ')[0];
            
            if (this.server.commands.has(cmd)) {
                this.server.commands.get(cmd);
            } else {
                this.logger.write('Invalid command');
            }
        });
    }
}

export default ConsoleExecuter;