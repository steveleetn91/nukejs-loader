import { NukejsHooksInterface } from "./NukejsHooksInterface";

export default class NukejsHooks implements NukejsHooksInterface {
    private isPage : boolean = true;
    constructor(private data : string) {
        if(/\window.Nuke.page/.test(this.data)) {
            this.isPage = true;
        } else {
            this.isPage = false;
        }
    }
    beforeRender(): string {
        if(this.isPage === false ) {
            return this.data;
        }
        return this.data += `
        if(window.Nuke.page.beforeRender) {
            window.Nuke.page.beforeRender();
        }
        `;
    }
    render(): string {
        if(this.isPage === false ) {
            return this.data;
        }
        this.reRender();
        this.componentRender();
        this.setStatus();
        return this.data += `
        if(window.Nuke.page.render) {
            document.body.innerHTML = window.Nuke.page.render();
        } else {
            alert("WRONG! YOU NEED IMPLEMENT [RENDER] FUNCTION")
        }
        `;
    }
    afterRender(): string {
        if(this.isPage === false ) {
            return this.data;
        }
        return this.data += `
        if(window.Nuke.page.afterRender) {window.Nuke.page.afterRender()}
        `;
    }
    reRender(): string {
        if(this.isPage === false ) {
            return this.data;
        }
        return this.data += `
        window.Nuke.ReRender = function(){
            document.body.innerHTML = window.Nuke.page.render();
        }`;
    }
    componentRender(): string {
        if(this.isPage === false ) {
            return this.data;
        }
        return this.data += `
        window.Nuke.ComponentRender = function(root_id,NukeElement){
            if(document.getElementById(root_id.toString())) {
                 document.getElementById(root_id.toString()).innerHTML = NukeElement;
            }
        }`;
    }
    setStatus(){
        if(this.isPage === false ) {
            return this.data;
        }
        return this.data += `
        window.Nuke.setStatus = function(key,value) {
            if( window.Nuke.page && window.Nuke.page.status && window.Nuke.page.status[key] ) {
                window.Nuke.page.status[key] = value;
                window.Nuke.ReRender();
            } else {
                alert("WRONG! NOT FOUND STATUS KEY ["+ key + "]");
            }
        }
        `;
    }
    
}