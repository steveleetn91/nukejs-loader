export default function getOnlyElement(data : string){
    return data.split('`');
}
export function isNukApp(data:string){
    return /\<NukApp>/.test(data) || /\<nukapp>/.test(data) ? true : false;
}
export function allowsElements(){
    return ["SPAN","DIV","P","B","IMG","CANVAS","UL","LI","OL",
    "AUDIO","SOURCE","VIDEO","AUDIO","INPUT","BUTTON","LABEL","FORM","SELECT","OPTION","TEXTAREA","HR","IFRAME","NUKAPP",'BOX','A','H1','H2',
    ,'H3','H4','H5','H6','CODE','SCRIPT',"TABLE","TR","TD","TH","THEAD","E","EM","BR"];
}
export function createNukeId(){
    let id = () => {
        return Math.floor(Math.random() * 10);
    }
    let characters = ["a","b","c","d","e","f","g","h","u","i","o","p"];
    let out = "";
    for(let i=0;i<=25;i++) {
        out += characters[id()];
    }
    return out;
}