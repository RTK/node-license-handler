import * as fs from 'fs';
import * as path from 'path';

import type {InternalParser} from '../types/internal-parser.type';

export function projectParserDetector(
    projectRoot: string
): InternalParser | null {
    if (checkForNodeProject(projectRoot)) {
        return 'npm';
    } else if (checkForAndroidProject(projectRoot)) {
        return 'android';
    } else if (checkForIOSProject(projectRoot)) {
        return 'ios';
    }

    return null;
}

function checkForAndroidProject(projectRoot: string): boolean {
    return fs.existsSync(path.join(projectRoot, 'app/src/AndroidManifest.xml'));
}

function checkForIOSProject(projectRoot: string): boolean {
    const fileList: readonly string[] = fs.readdirSync(projectRoot);

    for (const file of fileList) {
        if (file.endsWith('.xcodeproj')) {
            return true;
        }
    }

    return false;
}

function checkForNodeProject(projectRoot: string): boolean {
    return fs.existsSync(path.join(projectRoot, 'package.json'));
}
