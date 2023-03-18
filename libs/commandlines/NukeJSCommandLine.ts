import { NukeJSCommandLineInterface } from "./NukeJSCommandLine.interface";

export default class NukeJSCommandLine implements NukeJSCommandLineInterface {
    constructor(private data : string) {}
    compiler(): string {
        this.data = this.data.replaceAll('<Print>{','${');
        this.data = this.data.replaceAll('Nuk{','${');
        this.data = this.data.replaceAll('<NukApp>','<div>');
        this.data = this.data.replaceAll('</NukApp>','</div>');
        this.data = this.data.replaceAll('<Box>','<div>');
        this.data = this.data.replaceAll('</Box>','</div>');
        this.data = this.data.replaceAll('<nukapp>','<div>');
        this.data = this.data.replaceAll('</nukapp>','</div>');
        this.data = this.data.replaceAll('<box>','<div>');
        this.data = this.data.replaceAll('</box>','</div>');
        this.data = this.data.replaceAll('&gt;','>');
        this.data = this.data.replaceAll('&lt;','<');
        return this.data;
    }
}