import { exec } from "child_process";
import { readFile } from "fs";
import { promisify } from "util";
import { isToday } from "date-fns";

const fileRead = promisify(readFile);

type CommandsType = {
    date: string,
    command: string
}[]



const init = async () => {
    const commands = await fileRead(__dirname + '/commands', 'utf-8').then(data => data.split('\n'));
    const commandsList: CommandsType = commands.map(current => {
        const splitCommands = current.split(' ');
        const date = splitCommands[splitCommands.length - 1]
        splitCommands.pop();
        const command = splitCommands.join(' ')
        return {
            date,
            command
        }
    })


    commandsList.forEach(async (opt) => {
        if (!opt.date) return;
        const itIsToday = isToday(new Date(opt.date));
        if (!itIsToday) return
        exec(opt.command, (error, stdout, stderror) => {
            if (error) return console.log(`A error: ${error}`);

            console.log(stdout);
        });

    })



}




init();