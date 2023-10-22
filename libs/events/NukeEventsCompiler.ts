import NukeConvertEvent from "./NukeConvertEvent";
import NukeEventsCompilerInterface from "./NukeEventsCompilerInterface";

export default class NukeEventsCompiler implements NukeEventsCompilerInterface {
    constructor(private data : string) {}
    async compiler(): Promise<string> {
        this.data = this.data.replaceAll('click="','onclick="');
        this.data = this.data.replaceAll("click='","onclick='");
        const convertEvent = new NukeConvertEvent(this.data);
        return await convertEvent.compiler();
    }
}