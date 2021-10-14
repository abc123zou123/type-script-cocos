import { IBuildTaskOption } from '../../@types';
import { IBuildResult } from '../../@types';
import { csEditor } from '../utils';

import { copyFilesByItem, FileItem } from "../lib/file";
import { dirname, join } from 'path';

import * as android from '../lib/android'

import { writeClassName } from "../lib/service";

interface IOptions {
    commonTest1: number;
    commonTest2: 'opt1' | 'opt2';
    webTestOption: boolean;
}

const PACKAGE_NAME = 'cocos-fitness';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'cocos-fitness': IOptions;
    };
}

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError = true;

export async function load() {
    // console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    // allAssets = await Editor.Message.request('asset-db', 'query-assets');
}

export async function onBeforeBuild(options: ITaskOptions) {
    // Todo some thing
    // log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
}

export async function onBeforeCompressSettings(options: ITaskOptions, result: IBuildResult) {
    // const pkgOptions = options.packages[PACKAGE_NAME];
    // if (pkgOptions.webTestOption) {
    //     console.debug('webTestOption', true);
    // }
    // // Todo some thing
    // console.debug('get settings test', result.settings);
}

export async function onAfterCompressSettings(options: ITaskOptions, result: IBuildResult) {
    // Todo some thing
    let enableNexGim = await csEditor.readProjectProfile("enableNexGim") as boolean;
    let destRoot = dirname(result.paths.dir);
    if (enableNexGim) {
        // 写入 service.json
        writeClassName(result.paths.dir, "ServiceFitnessNexGim");

        let items = [{
            src: join(__dirname, "./resource/sdk/android/fitness-ble.aar"),
            dest: join(destRoot, "proj/libservice/libs/fitness-ble.aar")
        },{
            src: join(__dirname, "./resource/sdk/android/fitness-nexgim.aar"),
            dest: join(destRoot, "proj/libservice/libs/nexgim-ble.aar")
        }, {
            src: join(__dirname, "./resource/src/android/ServiceFitnessNexGim.java"),
            dest: join(destRoot, "proj/libservice/src/com/cocos/service/ServiceFitnessNexGim.java")
        }] as FileItem[];
        copyFilesByItem(items, true);
        
        // 添加权限
        let manifestPath = join(destRoot, "/proj/libservice/AndroidManifest.xml")
        android.addUsesPermission(manifestPath, "BLUETOOTH");
        android.addUsesPermission(manifestPath, "BLUETOOTH_ADMIN");
        android.addUsesPermission(manifestPath, "ACCESS_COARSE_LOCATION");
        android.addUsesPermission(manifestPath, "ACCESS_FINE_LOCATION");

        // 添加依赖
        let serviceBuildGradle = join(destRoot, 'proj/libservice/build.gradle');
        android.insertDependency(serviceBuildGradle, 'implementation "com.android.support:appcompat-v7:23.4.0"');
    }
}

export async function onAfterBuild(options: ITaskOptions, result: IBuildResult) {
    // change the uuid to test
    // const uuidTestMap = {
    //     image: '57520716-48c8-4a19-8acf-41c9f8777fb0',
    // }
    // for (const name of Object.keys(uuidTestMap)) {
    //     // const uuid = uuidTestMap[name];
    //     // console.debug(`containsAsset of ${name}`, result.containsAsset(uuid));
    //     // console.debug(`getAssetPathInfo of ${name}`, result.getAssetPathInfo(uuid));
    //     // console.debug(`getRawAssetPaths of ${name}`, result.getRawAssetPaths(uuid));
    //     // console.debug(`getJsonPathInfo of ${name}`, result.getJsonPathInfo(uuid));
    // }
}

export function unload() {
    // console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
}
