export interface Dependency {
    readonly name: string;
    readonly version: string;
    readonly license: {
        type?: string;
        text?: string;
    };
    readonly dependencyList?: readonly Dependency[];
}
