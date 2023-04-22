import getOnlyElement, { allowsElements, createNukeId, isNukApp } from "../helpers/NukejsHelper";
import NukeJSComponentInterface from "./NukeJSComponent.interface";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class NukejsCustomComponent implements NukeJSComponentInterface {
    constructor(private data: string) {

    }
    compiler() {
        let html = "";
        let components: Array<string> = [];
        getOnlyElement(this.data).forEach((item, index) => {
            if (isNukApp(item)) {
                const dom = new JSDOM(item);
                const initData = (root: any) => {
                    if (root.querySelectorAll("*").length > 0) {
                        root.querySelectorAll("*").forEach((item2: any, index2: number) => {
                            if (item2.nodeName) {
                                const nodeName: string = item2.nodeName;
                                if (!allowsElements().includes(nodeName)) {
                                    components.push(nodeName);
                                    const params = item2.getAttribute('params') ? ',' + item2.getAttribute('params') : '';
                                    item2.setAttribute('params', '');
                                    item2.innerHTML = `Nuk{${nodeName.toUpperCase()}(<Box>${item2.innerHTML}</Box>` + params + `)}`;
                                    // next depth 
                                    const miniLoop = (miniLoopitem : any,max : number) => {
                                        if(max >= 5) {
                                            return; 
                                        }    
                                        miniLoopitem.querySelectorAll("*").forEach((miniLoopitem: any, miniLoopitemindex: number) => {
                                            if (miniLoopitem.nodeName) {
                                                if (!allowsElements().includes(miniLoopitem.nodeName)) {
                                                    components.push(miniLoopitem.nodeName);
                                                    const params = miniLoopitem.getAttribute('params') ? ',' + miniLoopitem.getAttribute('params') : '';
                                                    miniLoopitem.setAttribute('params', '');
                                                    miniLoopitem.innerHTML = `Nuk{${miniLoopitem.nodeName.toUpperCase()}(<Box>${miniLoopitem.innerHTML}</Box>` 
                                                    + params + `)}`;
                                                    miniLoop(miniLoopitem,max + 1);
                                                }
                                            }
                                        });
                                    }
                                    miniLoop(item2,0);
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