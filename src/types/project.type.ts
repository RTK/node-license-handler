import {InternalParser} from './internal-parser.type';

export interface Project {
    readonly root: string;
    readonly parser: InternalParser | string;
}
