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
  private async run(): Promise<string> {
    const convertedParamsCPN = this.content.replace(/(params=){([^}]+)}/g, '$1"$2"');
    return convertedParamsCPN;
  }
}
