import NukeJSComponentInterface from "./NukeJSComponent.interface";

export default class NukeJSComponent implements NukeJSComponentInterface {
    constructor(private data:string) {
        
    }
    compiler(){
        this.data = this.data.replaceAll('<NukApp>','`<div>');
        this.data = this.data.replaceAll('</NukApp>','</div>`');
        this.data = this.data.replaceAll('<Box>','`<div>');
        this.data = this.data.replaceAll('</Box>','</div>`');
        return this.data;
    }
}