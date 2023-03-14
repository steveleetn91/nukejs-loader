import { NukejsHooksInterface } from "./NukejsHooksInterface";

export default class NukejsHooks implements NukejsHooksInterface {
    constructor(private data : string) {
        
    }
    beforeRender(): string {
        return this.data += `
        window.beforeRender();`;
    }
    render(): string {
        this.reRender();
        this.componentRender();
        this.setStatus();
        return this.data += `
        document.body.innerHTML = render();`;
    }
    afterRender(): string {
        return this.data += `
        window.afterRender();`;
    }
    reRender(): string {
        return this.data += `
        window.Nuke.ReRender = function(){
            document.body.innerHTML = render();
        }`;
    }
    componentRender(): string {
        return this.data += `
        window.Nuke.ComponentRender = function(root_id,NukeElement){
            document.getElementById(root_id.toString()).innerHTML = NukeElement;
        }`;
    }
    setStatus(){
        return this.data += `
        window.Nuke.setStatus = function(key,value) {
            if( window.Nuke && window.Nuke.status && window.Nuke.status[key] ) {
                window.Nuke.status[key] = value;
                window.Nuke.ReRender();
            }
        }
        `;
    }
}