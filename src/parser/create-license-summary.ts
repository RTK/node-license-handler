import * as fs from 'fs';

import {LogLevel, writeLoggerOutput} from '@rtk/node-ts-cli-toolkit';

import * as fsExtra from 'fs-extra';

import {projectParserDetector} from './project-parser-detector';
import {npmParser} from './npm/npm-parser';
import type {Dependency} from '../types/dependency.type';
import type {InternalParser} from '../types/internal-parser.type';
import type {Project} from '../types/project.type';

export function createLicenseSummary(projectList: readonly Project[]): readonly (readonly Dependency[])[] {
    const dependencyList: (readonly Dependency[])[] = [];

    for (const project of projectList) {
        let parser: InternalParser | string | null;
        if (project.parser === 'auto') {
            writeLoggerOutput(LogLevel.Verbose, `Determining parser for '${project.root}'`);
            parser = projectParserDetector(project.root);
            writeLoggerOutput(LogLevel.Verbose, `Determined parser: '${parser}'`);
        } else {
            parser = project.parser;
        }

        if (parser === null) {
            throw new Error(`Could not determine a parser for '${project.root}'`);
        }

        switch (parser) {
            case 'npm':
                dependencyList.push(npmParser(project.root));
        }
    }

    return dependencyList;
}
