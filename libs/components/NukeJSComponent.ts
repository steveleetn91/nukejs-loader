import getOnlyElement, { allowsElements, createNukeId, isNukApp } from "../helpers/NukejsHelper";
import NukeJSComponentInterface from "./NukeJSComponent.interface";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class NukejsCustomComponent implements NukeJSComponentInterface {
    constructor(private data: string) {

    }
    compiler() {
        let html = "";
        
        getOnlyElement(this.data).forEach((item,index) => {
            if(isNukApp(item)) { 
                const dom = new JSDOM(item);
                const initData = (root : any) => {
                    if(root.querySelectorAll("*").length > 0 ) {
                        root.querySelectorAll("*").forEach((item2 : any,index2:number) => {
                            if(item2.nodeName) {
                                const nodeName : string = item2.nodeName;
                                if(!allowsElements().includes(nodeName)) {
                                    const params = item2.getAttribute('params') ? ','+item2.getAttribute('params') : '';
                                    item2.setAttribute('params','');
                                    item2.innerHTML = `Nuk{${nodeName.toUpperCase()}(<Box>${item2.innerHTML}</Box>`+ params +`)}`;
                                    // next depth 
                                    item2.querySelectorAll("*").forEach((item3 : any,index3:number) => {
                                        if(item3.nodeName) {
                                            const nodeName3 : string = item3.nodeName;
                                            if(!allowsElements().includes(nodeName3)) {
                                                const params3 = item3.getAttribute('params') ? ','+item3.getAttribute('params') : '';
                                                item3.setAttribute('params','');
                                                item3.innerHTML = `Nuk{${nodeName3.toUpperCase()}(<Box>${item3.innerHTML}</Box>`+ params3 +`)}`;
                                                // next depth 
                                                item3.querySelectorAll("*").forEach((item4 : any,index4:number) => {
                                                    if(item4.nodeName) {
                                                        const nodeName4 : string = item4.nodeName;
                                                        if(!allowsElements().includes(nodeName4)) {
                                                            const params4 = item3.getAttribute('params') ? ','+item4.getAttribute('params') : '';
                                                            item4.setAttribute('params','');
                                                            item4.innerHTML = `Nuk{${nodeName4.toUpperCase()}(<Box>${item4.innerHTML}</Box>`+ params4 +`)}`;
                                                        } 
                                                    }
                                                });    
                                            } 
                                        }
                                    });    
                                } 
                            }
                        });    
                    }
                    
                }
                initData(dom.window.document.body);
                html += dom.window.document.body.innerHTML;
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
        const customs = new NukejsCustomComponent(this.data);
        this.data = customs.compiler();
        
        return this.data;
    }
}