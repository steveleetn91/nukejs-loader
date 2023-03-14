import NukeJSCompiler from "./NukeJSCompiler";
import { NukeLoaderInterface } from "./NukeLoaderInterface";

export class NukeLoader implements NukeLoaderInterface {
    constructor(private data : string) {
       
    }
    render() : string{
        const compiler : NukeJSCompiler = new NukeJSCompiler(this.data);
        this.data = compiler.init();
        this.data = compiler.hooks();
        this.data = compiler.texts();
        this.data = compiler.images();
        this.data = compiler.attributes();
        this.data = compiler.events();
        this.data = compiler.component();
        this.data = compiler.commandline();
        return this.data;
    }
}