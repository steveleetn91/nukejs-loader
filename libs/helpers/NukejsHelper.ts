export default function getOnlyElement(data : string){
    return data.split('`');
}
export function isNukApp(data:string){
    return /\<NukApp>/.test(data) || /\<nukapp>/.test(data) ? true : false;
}
export function allowsElements(){
    return ["SPAN","DIV","P","B","IMG","CANVAS","UL","LI","OL",
    "AUDIO","SOURCE","VIDEO","AUDIO","INPUT","BUTTON","LABEL","FORM","SELECT","OPTION","TEXTAREA","HR","IFRAME","NUKAPP",'BOX'];
}