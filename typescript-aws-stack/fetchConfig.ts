import {load} from 'js-yaml';
import {readFileSync} from 'fs';
import fetch from 'node-fetch';

interface Config {
    imageId: string;
    imageSize: string;
    repoId: string;
}

export function fetchConfig(stack: string): Config {
    const yaml = load(readFileSync(stack + '.yaml', "utf8")) as Config;
    return yaml;
}

export async function fetchConfigApi(stack: string): Promise<Config> {
    const response = await fetch('https://api.example.com/' + stack);
    const config = await response.json() as Config;
    return config
}




