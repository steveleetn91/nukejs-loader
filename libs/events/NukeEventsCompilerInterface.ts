export default interface NukeEventsCompilerInterface {
    compiler() : Promise<string>;
}