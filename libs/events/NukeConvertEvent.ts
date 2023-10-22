interface NukeConvertEventInterface {
    compiler(): Promise<string>;
}
export default class NukeConvertEvent implements NukeConvertEventInterface {
    constructor(private content: string) {}
    async compiler(): Promise<string> {
        let content = "";
        content = await this.run();
        return content;
    }
    private async run() : Promise<string> {
        let hasOpen = 0;
        let onElement = 0;
        let content = "";
        const data = await this.content.split("\n");
        await data.forEach(async (item,index) => {
            /**
             * Component
             */
            if(item.includes('<')){
                onElement += 1;
            }
            if(onElement >= 1 ) {
                if(item.includes('={') || item.includes('= {') || item.includes('=  {')) {
                    hasOpen += 1;
                    item = item.replace('={','="');
                    item = item.replace('= {','="');
                    item = item.replace('=  {','="');
                }
            }
            if(hasOpen >= 1 && onElement >= 1) {
                hasOpen -= 1;
                item = item.replace('}','"');
            }
            if(onElement >= 1 && item.includes('/>')) {
                onElement -= 1;
            }
            if(onElement >= 1 && item.includes('</')) {
                onElement -= 1;
            }
            content += item;
        });
        return content;
    }
}