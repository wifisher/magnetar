import { PlainObject, PluginWriteAction } from '@magnetarjs/core';
import { SimpleStoreOptions, MakeRestoreBackup } from '../CreatePlugin';
export declare function writeActionFactory(data: {
    [collectionPath: string]: Map<string, PlainObject>;
}, simpleStoreOptions: SimpleStoreOptions, actionName: 'merge' | 'assign' | 'replace', makeBackup?: MakeRestoreBackup): PluginWriteAction;
