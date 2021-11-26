import type {Dependency} from './dependency.type';

export type DependencyParser = (projectRoot: string) => readonly Dependency[];
