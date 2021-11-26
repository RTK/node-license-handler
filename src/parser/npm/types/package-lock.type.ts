import type {PackageLockV1Dependency} from './package-lock-v1-dependency.type';
import type {PackageLockV2Package} from './package-lock-v2-package.json';

export type PackageLock = PackageLockV1 | PackageLockV2;

export interface PackageLockV1 {
    readonly name: string;
    readonly version: string;
    readonly lockfileVersion: 1;
    readonly requires: boolean;
    readonly dependencies: Readonly<Record<string, PackageLockV1Dependency>>;
}

export interface PackageLockV2 {
    readonly name: string;
    readonly version: string;
    readonly lockfileVersion: 2;
    readonly requires: boolean;
    readonly packages: Readonly<Record<string, PackageLockV2Package>>;
}
