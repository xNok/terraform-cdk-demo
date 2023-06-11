import {load} from 'js-yaml';
import {readFileSync} from 'fs';

interface Config {
    imageId: string;
    imageSize: string;
    repoId: string;
}

export function fetchConfig(stack: string): Config {
    const yaml = load(readFileSync(stack + '.yaml', "utf8")) as Config;
    return yaml;
}
