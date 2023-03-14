import { NukeLoader } from "./libs/NukeLoader";

export default function NukeLoaderIndex(data : string) : string {
    let render = new NukeLoader(data);
    return render.render();
}