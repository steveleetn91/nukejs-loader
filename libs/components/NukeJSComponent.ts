import NukeJSComponentInterface from "./NukeJSComponent.interface";

export default class NukeJSComponent implements NukeJSComponentInterface {
    constructor(private data:string) {
        
    }
    compiler(){
        this.data = this.data.replaceAll('<NukApp>','`<NukApp>');
        this.data = this.data.replaceAll('</NukApp>','</NukApp>`');
        this.data = this.data.replaceAll('<Box>','`<Box>');
        this.data = this.data.replaceAll('</Box>','</Box>`');
        this.data = this.data.replaceAll('click="','onclick="');
        this.data = this.data.replaceAll("click='","onclick='");
        return this.data;
    }
}