import getOnlyElement, { allowsElements, isNukApp } from "../helpers/NukejsHelper";
import NukeJSComponentInterface from "./NukeJSComponent.interface";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class NukejsDefaultComponent implements NukeJSComponentInterface {
    constructor(private data: string) {

    }
    compiler() {
        this.data = this.data.replaceAll('<NukApp>', '`<NukApp>');
        this.data = this.data.replaceAll('</NukApp>', '</NukApp>`');
        this.data = this.data.replaceAll('<Box>', '`<Box>');
        this.data = this.data.replaceAll('</Box>', '</Box>`');
        this.data = this.data.replaceAll('<nukapp>', '`<nukapp>');
        this.data = this.data.replaceAll('</nukapp>', '</nukapp>`');
        this.data = this.data.replaceAll('<box>', '`<box>');
        this.data = this.data.replaceAll('</box>', '</box>`');
        return this.data;
    }
}

class NukejsCustomComponent implements NukeJSComponentInterface {
    constructor(private data: string) {

    }
    compiler() {
        let html = "";
        
        getOnlyElement(this.data).forEach((item,index) => {
            if(isNukApp(item)) { 
                const dom = new JSDOM(item);
                const initData = (root : any) => {
                    root.querySelectorAll("*").forEach((item2 : any,index:number) => {
                        if(item2.nodeName) {
                            const nodeName : string = item2.nodeName;
                            if(!allowsElements().includes(nodeName)) {
                                let childData = item2.innerHTML;
                                const params = item2.getAttribute('params') ? ','+item2.getAttribute('params') : '';
                                item2.setAttribute('params','')
                                childData = childData.replaceAll('<Box>','<div>');
                                childData = childData.replaceAll('</Box>','</div>');
                                item2.innerHTML = `Nuk{${nodeName.toUpperCase()}(<Box>${childData}</Box>`+ params +`)}`;
                            }
                        }
                    });
                }
                initData(dom.window.document.body);
                const defaults = new NukejsDefaultComponent(dom.window.document.body.innerHTML.toString());
                html += defaults.compiler();
            } else {
                html += item;
            }
        });
        this.data = html.trim();
        return this.data;
    }
}

export default class NukeJSComponent implements NukeJSComponentInterface {
    constructor(private data: string) {

    }
    compiler() {
        const defaults = new NukejsDefaultComponent(this.data);
        this.data = defaults.compiler();
        const customs = new NukejsCustomComponent(this.data);
        this.data = customs.compiler();
        
        return this.data;
    }
}