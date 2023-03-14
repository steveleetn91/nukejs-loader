import { NukeJSCommandLineInterface } from "./NukeJSCommandLine.interface";

export default class NukeJSCommandLine implements NukeJSCommandLineInterface {
    constructor(private data : string) {}
    compiler(): string {
        this.data = this.data.replaceAll('<Print>{','${');
        this.data = this.data.replaceAll('Nuk{','${');
        return this.data;
    }
}