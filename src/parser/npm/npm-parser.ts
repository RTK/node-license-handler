import * as fs from 'fs';
import * as path from 'path';

import {packageLockV2Parser} from './package-lock-v2-parser';
import type {PackageLock} from './types/package-lock.type';

import type {Dependency} from '../../types/dependency.type';

export function npmParser(projectRoot: string): readonly Dependency[] | never {
    const packageLockFileContents: string = fs
        .readFileSync(path.join(projectRoot, 'package-lock.json'))
        .toString();
    const packageLockObj: PackageLock = JSON.parse(packageLockFileContents);

    if (packageLockObj.lockfileVersion === 1) {
        throw new Error(
            'package-lock.json files with version 1 are not supported right now'
        );
    } else if (packageLockObj.lockfileVersion === 2) {
        return packageLockV2Parser(projectRoot, packageLockObj);
    }

    throw new Error(`Unsupported package-lock.json version`);
}
