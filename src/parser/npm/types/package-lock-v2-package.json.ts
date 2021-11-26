export interface PackageLockV2Package {
    readonly version: string;

    readonly dependencies?: Readonly<Record<string, string>>;
    readonly devDependencies?: Readonly<Record<string, string>>;
    readonly peerDependencies?: Readonly<Record<string, string>>;

    readonly license?: string;
    readonly name?: string;
    readonly resolved?: string;
    readonly integrity?: string;
    readonly dev?: boolean;
    readonly engines?: Readonly<Record<string, string>>;
}
