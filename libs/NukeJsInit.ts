export interface NukeJsInitInterface {
    compier(): string;
}
export class NukeJsInit implements NukeJsInitInterface {
    constructor(private data: string) {

    }
    compier(): string {
        this.data = `
        
        window.Nuke = {
            status : {}
        }
        
        ` + this.data;
        return this.data;
    }
}