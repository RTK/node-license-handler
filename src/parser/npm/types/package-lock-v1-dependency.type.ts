export interface PackageLockV1Dependency {
    readonly version: string;

    readonly from?: string;
    readonly resolved?: string;
    readonly integrity?: string;
    readonly dev?: boolean;
    readonly requires?: Record<string, string>;
    readonly dependencies?: Record<string, PackageLockV1Dependency>;
}
