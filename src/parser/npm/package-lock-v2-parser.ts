import * as fs from 'fs';
import * as path from 'path';

import type {Dependency} from '../../types/dependency.type';
import type {PackageLockV2} from './types/package-lock.type';
import type {PackageLockV2Package} from './types/package-lock-v2-package.json';

export function packageLockV2Parser(
    projectRoot: string,
    packageLockV2: PackageLockV2
): readonly Dependency[] {
    const mainPackage: PackageLockV2Package = packageLockV2.packages[''];

    if (!mainPackage) {
        throw new Error(
            'package-lock.json file does not contain the main package'
        );
    }

    return resolvePackageDependencyList(
        projectRoot,
        Object.entries(packageLockV2.packages),
        mainPackage
    );
}

function resolvePackageDependencyList(
    projectRoot: string,
    packageLockV2Entries: readonly [string, PackageLockV2Package][],
    entryPackage: PackageLockV2Package
): readonly Dependency[] {
    const dependencyList: Dependency[] = [];

    if (
        'dependencies' in entryPackage &&
        entryPackage.dependencies !== void 0
    ) {
        const dependencyEntryList: readonly [string, string][] = Object.entries(
            entryPackage.dependencies
        );

        for (const [dependency] of dependencyEntryList) {
            const packageEntry: [string, PackageLockV2Package] | null = packageLockV2Entries.find((packageLockV2Entry: [string, PackageLockV2Package]): boolean => {
                return packageLockV2Entry[0].startsWith(`node_modules/${dependency}`)
            }) ?? null;

            if (packageEntry) {
                dependencyList.push({
                    name: dependency,
                    version: packageEntry[1].version,
                    license: {
                        type: packageEntry[1].license,
                        text: getLicenseFromModule(projectRoot, packageEntry[0]) ?? void 0
                    }
                });
            }
        }
    }

    return dependencyList;
}

function getLicenseFromModule(projectRoot: string, moduleId: string): string | void {
    const modulePath: string = path.join(projectRoot, moduleId);

    if (fs.existsSync(modulePath)) {
        const licenseFilePath: string = path.join(modulePath, 'LICENSE');

        if (fs.existsSync(licenseFilePath)) {
            return fs.readFileSync(licenseFilePath).toString();
        }
    }
}
