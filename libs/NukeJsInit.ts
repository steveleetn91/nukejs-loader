export interface NukeJsInitInterface {
    compier(): Promise<string>;
}
export class NukeJsInit implements NukeJsInitInterface {
    constructor(private data: string) {
    }
    async compier(): Promise<string> {
        this.data  = this.data.replaceAll('$NukPage','window.Nuke.page');
        return this.data;
    }
}