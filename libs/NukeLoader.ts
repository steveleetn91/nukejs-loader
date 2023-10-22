import NukeJSCompiler from "./NukeJSCompiler";
import { NukeLoaderInterface } from "./NukeLoaderInterface";

export class NukeLoader implements NukeLoaderInterface {
    constructor(private data : string) {
       
    }
    async render() : Promise<string>{
        const compiler : NukeJSCompiler = new NukeJSCompiler(this.data);
        this.data = await compiler.init();
        this.data = await compiler.events();
        this.data = await compiler.hooks();
        this.data = await compiler.texts();
        this.data = await compiler.images();
        this.data = await compiler.component();
        this.data = await compiler.commandline();
        return this.data;
    }
}