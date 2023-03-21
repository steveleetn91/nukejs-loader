export interface NukejsHooksInterface {
    beforeRender() : string;
    render() : string;
    reRender() : string;
    afterRender() : string;
    componentRender():string;
    registerCallback():string;
}