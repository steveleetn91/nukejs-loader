import NukeEventsCompilerInterface from "./NukeEventsCompilerInterface";

export default class NukeEventsCompiler implements NukeEventsCompilerInterface {
    constructor(private data : string) {}
    compiler(): string {
        this.data = this.data.replaceAll('click="','onclick="');
        this.data = this.data.replaceAll("click='","onclick='");
        return this.data;
    }
}