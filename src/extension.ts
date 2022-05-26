import * as vscode from "vscode";
import { CompletionItemKind } from "vscode";

import keywords from "./data/keywords.json";
import utilSysTaskFuncs from "./data/util_sys_task_funcs.json";
import ioSysTaskFuncs from "./data/io_sys_task_funcs.json";
import timingChecks from "./data/timing_checks.json";
import backannotatations from "./data/backannotatations.json";
import optSysTaskFuncs from "./data/opt_sys_task_funcs.json";
import compilerDirectives from "./data/compiler_directives.json";
import optCompilerDirectives from "./data/opt_compiler_directives.json";

const buildCompletionItems = (arr: Array<any>, kind: CompletionItemKind) => {
    return arr.map((elem) => {
        const item = new vscode.CompletionItem(elem.name, kind);
        if (elem.detail) {
            item.detail = elem.detail;
        }
        if (elem.documentation) {
            item.documentation = new vscode.MarkdownString(elem.documentation);
        }
        if (elem.preselect) {
            item.preselect = true;
        }
        if (elem.insertText) {
            item.insertText = new vscode.SnippetString(elem.insertText);
        }
        if (elem.deprecated) {
            item.tags = [vscode.CompletionItemTag.Deprecated];
        }
        return item;
    });
};

export function activate(context: vscode.ExtensionContext) {
    // Keywords completion
    const disableKeywordsProvider = vscode.workspace
        .getConfiguration("systemverilog")
        .get("disableKeywordsProvider");

    if (!disableKeywordsProvider) {
        const keywordsProvider =
            vscode.languages.registerCompletionItemProvider("systemverilog", {
                provideCompletionItems(
                    document: vscode.TextDocument,
                    position: vscode.Position,
                    token: vscode.CancellationToken,
                    context: vscode.CompletionContext
                ) {
                    return buildCompletionItems(
                        keywords,
                        CompletionItemKind.Keyword
                    );
                },
            });
        context.subscriptions.push(keywordsProvider);
    }

    // System tasks and functions completion
    const disableSysTaskFuncsProvider = vscode.workspace
        .getConfiguration("systemverilog")
        .get("disableSysTaskFuncsProvider");

    const enableOptSysTaskFuncsProvider = vscode.workspace
        .getConfiguration("systemverilog")
        .get("enableOptSysTaskFuncsProvider");

    if (!disableSysTaskFuncsProvider) {
        const sysTaskFuncsProvider =
            vscode.languages.registerCompletionItemProvider("systemverilog", {
                provideCompletionItems(
                    document: vscode.TextDocument,
                    position: vscode.Position,
                    token: vscode.CancellationToken,
                    context: vscode.CompletionContext
                ) {
                    // When only "$" is typed, do not show any completion items
                    const linePrefix = document
                        .lineAt(position)
                        .text.substring(0, position.character);
                    const pattern = /(?<![a-z])\$$/;
                    if (pattern.test(linePrefix)) {
                        return undefined;
                    }

                    const sysTaskFuncs: Array<any> = [
                        ...utilSysTaskFuncs.sim_ctrl,
                        ...utilSysTaskFuncs.sim_time,
                        ...utilSysTaskFuncs.timescale,
                        ...utilSysTaskFuncs.conversion,
                        ...utilSysTaskFuncs.data_query,
                        ...utilSysTaskFuncs.arr_query,
                        ...utilSysTaskFuncs.math,
                        ...utilSysTaskFuncs.bit_vector,
                        ...utilSysTaskFuncs.severity,
                        ...utilSysTaskFuncs.assert_ctrl,
                        ...utilSysTaskFuncs.sample_value,
                        ...utilSysTaskFuncs.coverage,
                        ...utilSysTaskFuncs.prob_dist,
                        ...utilSysTaskFuncs.stoch_analysis,
                        ...utilSysTaskFuncs.pla_modeling,
                        ...utilSysTaskFuncs.misc,
                        ...ioSysTaskFuncs.display,
                        ...ioSysTaskFuncs.file_io,
                        ...ioSysTaskFuncs.mem_load,
                        ...ioSysTaskFuncs.mem_dump,
                        ...ioSysTaskFuncs.cmd_line,
                        ...ioSysTaskFuncs.vcd,
                        ...backannotatations,
                    ];

                    const sysTaskFuncsAll = enableOptSysTaskFuncsProvider
                        ? [...sysTaskFuncs, ...optSysTaskFuncs]
                        : sysTaskFuncs;

                    return buildCompletionItems(
                        sysTaskFuncsAll,
                        CompletionItemKind.Function
                    );
                },
            });
        context.subscriptions.push(sysTaskFuncsProvider);
    }

    // Timing checks completion
    const disableTimingChecksProvider = vscode.workspace
        .getConfiguration("systemverilog")
        .get("disableTimingChecksProvider");

    if (!disableTimingChecksProvider) {
        const timingChecksProvider =
            vscode.languages.registerCompletionItemProvider("systemverilog", {
                provideCompletionItems(
                    document: vscode.TextDocument,
                    position: vscode.Position,
                    token: vscode.CancellationToken,
                    context: vscode.CompletionContext
                ) {
                    // When only "$" is typed, do not show any completion items
                    const linePrefix = document
                        .lineAt(position)
                        .text.substring(0, position.character);
                    const pattern = /(?<![a-z])\$$/;
                    if (pattern.test(linePrefix)) {
                        return undefined;
                    }

                    const timingChecksAll: Array<any> = timingChecks;

                    return buildCompletionItems(
                        timingChecksAll,
                        CompletionItemKind.Property
                    );
                },
            });
        context.subscriptions.push(timingChecksProvider);
    }

    // Compiler directives completion
    const disableComplierDirectivesProvider = vscode.workspace
        .getConfiguration("systemverilog")
        .get("disableComplierDirectivesProvider");

    if (!disableComplierDirectivesProvider) {
        const complierDirectivesProvider =
            vscode.languages.registerCompletionItemProvider("systemverilog", {
                provideCompletionItems(
                    document: vscode.TextDocument,
                    position: vscode.Position,
                    token: vscode.CancellationToken,
                    context: vscode.CompletionContext
                ) {
                    // When only "`" is typed, do not show any completion items
                    const linePrefix = document
                        .lineAt(position)
                        .text.substring(0, position.character);
                    const pattern = /(?<![a-z])\`$/;
                    if (pattern.test(linePrefix)) {
                        return undefined;
                    }

                    const compilerDirectivesAll = [
                        ...compilerDirectives,
                        ...optCompilerDirectives,
                    ];

                    return buildCompletionItems(
                        compilerDirectivesAll,
                        CompletionItemKind.Keyword
                    );
                },
            });
        context.subscriptions.push(complierDirectivesProvider);
    }
}

export function deactivate() {}
