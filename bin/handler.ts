#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

import {
    getCLIArgument,
    LogLevel,
    setupCLIDefaults,
    writeLoggerOutput
} from '@rtk/node-ts-cli-toolkit';

import * as fsExtra from 'fs-extra';

import {createLicenseSummary} from '../src/parser/create-license-summary';
import {Project} from '../src/types/project.type';

import {Dependency} from '../src/types/dependency.type';

setupCLIDefaults();

const cwd: string = getCLIArgument<string>('cwd') ?? '.';
const outputFile: string = path.join(
    cwd,
    getCLIArgument<string>('output-file') ?? 'license-handler-result.json'
);

let projectDirList: string | readonly string[] =
    getCLIArgument('project') ?? '.';
let parserList: string | readonly string[] = getCLIArgument('parser') ?? 'auto';

if (!Array.isArray(projectDirList)) {
    projectDirList = [projectDirList as string];
}

if (!Array.isArray(parserList)) {
    parserList = [parserList as string];
}

if (projectDirList.length > parserList.length) {
    const delta: number = projectDirList.length - parserList.length;

    writeLoggerOutput(
        LogLevel.Verbose,
        `Missing parsers for ${delta} working directories. Choosing 'auto'.`
    );

    parserList = parserList.concat(new Array(delta).fill('auto', 0, delta));
}

const projectList: Project[] = [];

const projectCount: number = projectDirList.length;
for (let index = 0; index < projectCount; index++) {
    projectList.push({
        root: projectDirList[index],
        parser: parserList[index]
    });
}

const dependencySummary: readonly (readonly Dependency[])[] =
    createLicenseSummary(projectList);

writeLoggerOutput(LogLevel.Verbose, `Ensuring output file: '${outputFile}'`);
fsExtra.ensureFileSync(outputFile);
fs.writeFileSync(outputFile, JSON.stringify(dependencySummary, null, 4), {
    encoding: 'utf-8'
});
writeLoggerOutput(LogLevel.Verbose, 'Successfully wrote output file');
