export interface NukeJsInitInterface {
    compier(): string;
}
export class NukeJsInit implements NukeJsInitInterface {
    constructor(private data: string) {

    }
    compier(): string {
        this.data = `
        
        window.Nuke = {
            status : {},
            page: {}
        }
        
        ` + this.data;

        this.data  = this.data.replaceAll('$NukPage','window.Nuke.page');

        return this.data;
    }
}