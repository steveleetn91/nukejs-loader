import NukeJSCommandLine from "./commandlines/NukeJSCommandLine";
import NukeJSComponent from "./components/NukeJSComponent";
import NukejsHooks from "./hooks/NukejsHooks";
import { NukeJsInit } from "./NukeJsInit";

interface NukeJSCompilerInterface {
    init(): string;
    hooks(): string;
    texts(): string;
    images(): string;
    attributes(): string;
    events(): string;
    component():string;
    commandline():string;
}
export default class NukeJSCompiler implements NukeJSCompilerInterface {
    constructor(private data : string) {}
    init(): string {
        let initData = new NukeJsInit(this.data);
        this.data = initData.compier();
        return this.data;
    }
    hooks(): string {
        let hooks = new NukejsHooks(this.data);
        this.data = hooks.beforeRender();
        this.data = hooks.render();
        this.data = hooks.afterRender();
        return this.data;
    }
    texts(): string {
        return this.data;
    }
    images(): string {
        return this.data;
    }
    attributes(): string {
        return this.data;
    }
    events(): string {
        return this.data;
    }
    component() : string{
        let component = new NukeJSComponent(this.data);
        this.data = component.compiler();
        return this.data;
    }
    commandline() : string{
        let commandline = new NukeJSCommandLine(this.data);
        this.data = commandline.compiler();
        return this.data;
    }
}