import * as vscode from "vscode";
import { CompletionItemKind } from "vscode";

import { CharStreams, CommonTokenStream } from "antlr4ts";
import * as c3 from "antlr4-c3";

import { SystemVerilog2017Lexer as Lexer } from "./grammars/SystemVerilog2017Lexer";
import { SystemVerilog2017Parser as Parser } from "./grammars/SystemVerilog2017Parser";

import _keywords from "./data/keywords.json";
import _utilSysTaskFuncs from "./data/util_sys_task_funcs.json";
import _ioSysTaskFuncs from "./data/io_sys_task_funcs.json";
import _timingChecks from "./data/timing_checks.json";
import _backannotatations from "./data/backannotatations.json";
import _optSysTaskFuncs from "./data/opt_sys_task_funcs.json";
import _compilerDirectives from "./data/compiler_directives.json";
import _optCompilerDirectives from "./data/opt_compiler_directives.json";

interface CompletionItemData {
    [key: string]: {
        detail?: string;
        documentation?: string;
        preselect?: boolean;
    };
}

export class SystemVerilogCompletionProvider
    implements vscode.CompletionItemProvider
{
    private keywords = _keywords;
    private sysTaskFuncs = {
        ..._backannotatations,
        ..._utilSysTaskFuncs,
        ..._ioSysTaskFuncs,
    } as CompletionItemData;
    private optSysTaskFuncs = _optSysTaskFuncs as CompletionItemData;
    private timingChecks = _timingChecks as CompletionItemData;

    private enableKeywordsProvider: boolean;
    private enableSysTaskFuncsProvider: boolean;
    private enableOptSysTaskFuncsProvider: boolean;
    private enableTimingChecksProvider: boolean;

    constructor() {
        const config = vscode.workspace.getConfiguration("systemverilog");
        this.enableKeywordsProvider =
            config.get("enableKeywordsProvider") || false;
        this.enableSysTaskFuncsProvider =
            config.get("enableSysTaskFuncsProvider") || false;
        this.enableOptSysTaskFuncsProvider =
            config.get("enableOptSysTaskFuncsProvider") || false;
        this.enableTimingChecksProvider =
            config.get("enableTimingChecksProvider") || false;
    }

    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // When only "$" is typed, do not show any completion items
        const linePrefix = document
            .lineAt(position)
            .text.substring(0, position.character);
        if (linePrefix.endsWith("$")) {
            return [];
        }

        // Remove the last word from the line
        const offset = document.offsetAt(position);
        const text = document
            .getText()
            .substring(0, offset)
            .replace(/[a-zA-Z\$]+$/, "");

        // Lexer and parser
        const inputStream = new (CharStreams as any).fromString(text);
        const lexer = new Lexer(inputStream);
        const parser = new Parser(new CommonTokenStream(lexer));
        parser.removeErrorListeners();
        const result = parser.source_text();

        // Code completion core
        let core = new c3.CodeCompletionCore(parser);
        let candsPre = core.collectCandidates(Number.MAX_SAFE_INTEGER, result);

        // Candidates
        let cands: string[] = [];
        for (let cand of candsPre.tokens.keys()) {
            const displayName = parser.vocabulary.getDisplayName(cand);
            if (displayName.match(/^'[a-z_\$0-9]{2,}'$/)) {
                // Remove single quotes
                const keyword = displayName.substring(
                    1,
                    displayName.length - 1
                );
                cands.push(keyword);
            }
        }

        let items: vscode.CompletionItem[] = [];
        for (let cand of cands) {
            // If cand is a keyword
            if (this.keywords.includes(cand)) {
                if (this.enableKeywordsProvider) {
                    items.push(
                        new vscode.CompletionItem(
                            cand,
                            CompletionItemKind.Keyword
                        )
                    );
                }
            }
            // If cand is a system task/function
            else if (cand in this.sysTaskFuncs) {
                if (this.enableSysTaskFuncsProvider) {
                    const item = new vscode.CompletionItem(
                        cand,
                        CompletionItemKind.Function
                    );
                    item.detail = this.sysTaskFuncs[cand].detail;
                    item.documentation = new vscode.MarkdownString(
                        this.sysTaskFuncs[cand].documentation
                    );
                    item.preselect = this.sysTaskFuncs[cand].preselect;
                    items.push(item);
                }
            }
            // if cand is an optional system task/function
            else if (cand in this.optSysTaskFuncs) {
                if (this.enableOptSysTaskFuncsProvider) {
                    const item = new vscode.CompletionItem(
                        cand,
                        CompletionItemKind.Function
                    );
                    item.detail = this.optSysTaskFuncs[cand].detail;
                    item.documentation = new vscode.MarkdownString(
                        this.optSysTaskFuncs[cand].documentation
                    );
                    item.preselect = this.optSysTaskFuncs[cand].preselect;
                    items.push(item);
                }
            }
            // If cand is a timing check
            else if (cand in this.timingChecks) {
                if (this.enableTimingChecksProvider) {
                    const item = new vscode.CompletionItem(
                        cand,
                        CompletionItemKind.Function
                    );
                    item.detail = this.timingChecks[cand].detail;
                    item.documentation = new vscode.MarkdownString(
                        this.timingChecks[cand].documentation
                    );
                    item.preselect = this.timingChecks[cand].preselect;
                    items.push(item);
                }
            }
            // Special keywords
            else if (cand === "randomize" || cand === "sample") {
                if (this.enableKeywordsProvider) {
                    items.push(
                        new vscode.CompletionItem(
                            cand,
                            CompletionItemKind.Function
                        )
                    );
                }
            } else if (cand === "std" || cand === "$root" || cand === "$unit") {
                if (this.enableKeywordsProvider) {
                    items.push(
                        new vscode.CompletionItem(
                            cand,
                            CompletionItemKind.Module
                        )
                    );
                }
            } else if (cand === "option" || cand === "type_option") {
                if (this.enableKeywordsProvider) {
                    items.push(
                        new vscode.CompletionItem(
                            cand,
                            CompletionItemKind.Field
                        )
                    );
                }
            } else if (cand === "1step") {
                if (this.enableKeywordsProvider) {
                    items.push(
                        new vscode.CompletionItem(
                            cand,
                            CompletionItemKind.Keyword
                        )
                    );
                }
            }
            // Else, raise an error
            else {
                console.error(`Unknown candidate: ${cand}`);
            }
        }

        return items;
    }
}

export class ComplierDirectivesProvider
    implements vscode.CompletionItemProvider
{
    private enableComplierDirectivesProvider: boolean;
    private enableOptComplierDirectivesProvider: boolean;

    constructor() {
        const config = vscode.workspace.getConfiguration("systemverilog");
        this.enableComplierDirectivesProvider =
            config.get("enableComplierDirectivesProvider") || false;
        this.enableOptComplierDirectivesProvider =
            config.get("enableOptComplierDirectivesProvider") || false;
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // When only "`" is typed, do not show any completion items
        // When there are other words before "`", do not show any completion items
        const linePrefix = document
            .lineAt(position)
            .text.substring(0, position.character);

        if (!linePrefix.match(/^\s*`\w+/)) {
            return [];
        }

        // For each key in compilerDirectives, create a CompletionItem
        let items: vscode.CompletionItem[] = [];
        if (this.enableComplierDirectivesProvider) {
            const compilerDirectives =
                _compilerDirectives as CompletionItemData;
            for (let key in compilerDirectives) {
                const item = new vscode.CompletionItem(
                    key,
                    CompletionItemKind.Keyword
                );
                item.detail = compilerDirectives[key].detail;
                item.documentation = new vscode.MarkdownString(
                    compilerDirectives[key].documentation
                );
                item.preselect = compilerDirectives[key].preselect;
                items.push(item);
            }
        }

        if (this.enableOptComplierDirectivesProvider) {
            const optCompilerDirectives =
                _optCompilerDirectives as CompletionItemData;
            for (let key in optCompilerDirectives) {
                const item = new vscode.CompletionItem(
                    key,
                    CompletionItemKind.Keyword
                );
                item.detail = optCompilerDirectives[key].detail;
                item.documentation = new vscode.MarkdownString(
                    optCompilerDirectives[key].documentation
                );
                item.preselect = optCompilerDirectives[key].preselect;
                items.push(item);
            }
        }

        return items;
    }
}

// export class ConstantRangeProvider implements vscode.CompletionItemProvider {
//     private disableConstantRangeProvider: boolean;

//     constructor() {
//         this.disableConstantRangeProvider =
//             vscode.workspace
//                 .getConfiguration("systemverilog")
//                 .get("disableConstantRangeProvider") || false;
//     }

//     _matchRange(linePrefix: string) {
//         // left..right => [left:right]
//         if (!linePrefix.includes("..")) {
//             return null;
//         }
//         const pattern =
//             /(?<left>([0-9a-zA-Z_\`\$\+\-\*\/\(\)])+)\.\.(?<right>([0-9a-zA-Z_\`\$\+\-\*\/\(\)])+)/;
//         const match = pattern.exec(linePrefix);

//         if (!match || !match.groups) {
//             return null;
//         }

//         return {
//             matchString: match[0],
//             replaceString: `[${match.groups.left}:${match.groups.right}]`,
//             len: match[0].length,
//         };
//     }

//     _matchDeclaration(linePrefix: string) {
//         // logic.8 => logic [7:0]
//         // logic.NUM.WIDTH => logic [NUM-1:0][WIDTH-1:0]

//         const match = /\s*([0-9a-zA-Z_\`\.]+)$/.exec(linePrefix);
//         if (!match || !match[1]) {
//             return null;
//         }
//         const matchString = match[1];

//         const netTypes = [
//             { name: "supply0", expandTo: "supply0" },
//             { name: "supply1", expandTo: "supply1" },
//             { name: "tri", expandTo: "tri" },
//             { name: "triand", expandTo: "triand" },
//             { name: "trior", expandTo: "trior" },
//             { name: "trireg", expandTo: "trireg" },
//             { name: "tri0", expandTo: "tri0" },
//             { name: "tri1", expandTo: "tri1" },
//             { name: "uwire", expandTo: "uwire" },
//             { name: "wire", expandTo: "wire" },
//             { name: "wand", expandTo: "wand" },
//             { name: "wor", expandTo: "wor" },
//         ];
//         const intAtomTypes = [
//             { name: "byte", expandTo: "byte" },
//             { name: "shortint", expandTo: "shortint" },
//             { name: "int", expandTo: "int" },
//             { name: "longint", expandTo: "longint" },
//             { name: "integer", expandTo: "integer" },
//             { name: "time", expandTo: "time" },
//         ];
//         const intVecTypes = [
//             { name: "bit", expandTo: "bit" },
//             { name: "logic", expandTo: "logic" },
//             { name: "reg", expandTo: "reg" },
//         ];
//         const abbrTypes = [
//             // Abbr for most common types
//             { name: "b", expandTo: "bit" },
//             { name: "l", expandTo: "logic" },
//             { name: "r", expandTo: "reg" },
//             { name: "w", expandTo: "wire" },
//             // Input
//             { name: "input", expandTo: "input" },
//             { name: "inputwire", expandTo: "input wire" },
//             { name: "inputlogic", expandTo: "input logic" },
//             { name: "i", expandTo: "input" },
//             { name: "iw", expandTo: "input wire" },
//             { name: "il", expandTo: "input logic" },
//             // Output
//             { name: "output", expandTo: "output" },
//             { name: "outputwire", expandTo: "output wire" },
//             { name: "outputreg", expandTo: "output reg" },
//             { name: "outputlogic", expandTo: "output logic" },
//             { name: "o", expandTo: "output" },
//             { name: "ow", expandTo: "output wire" },
//             { name: "or", expandTo: "output reg" },
//             { name: "ol", expandTo: "output logic" },
//             // Inout
//             { name: "inout", expandTo: "inout" },
//             { name: "inoutwire", expandTo: "inout wire" },
//             { name: "inoutreg", expandTo: "inout reg" },
//             { name: "inoutlogic", expandTo: "inout logic" },
//             { name: "io", expandTo: "inout" },
//             { name: "iow", expandTo: "inout wire" },
//             { name: "ior", expandTo: "inout reg" },
//             { name: "iol", expandTo: "inout logic" },
//         ];
//         const allTypes = [
//             ...netTypes,
//             ...intAtomTypes,
//             ...intVecTypes,
//             ...abbrTypes,
//         ];
//         const tokens = matchString.split(".");
//         if (tokens.length < 2) {
//             return null;
//         }
//         const type = allTypes.find((t) => t.name === tokens[0]);
//         if (!type) {
//             return null;
//         }

//         // replace the first token with the expanded type
//         let replaceString = type.expandTo + " ";

//         // For each tokens, check if it matches the pattern. If not, return null.
//         const pattern = /\d+|(\`)?[_a-zA-Z][_a-zA-Z0-9]*/;
//         const ranges = tokens.slice(1);

//         for (let i = 0; i < ranges.length; i++) {
//             if (!pattern.test(ranges[i])) {
//                 return null;
//             }
//             const num = parseInt(ranges[i], 10);
//             if (num) {
//                 replaceString += `[${num - 1}:0]`;
//             } else {
//                 replaceString += `[${ranges[i]}-1:0]`;
//             }
//         }

//         replaceString += " ";
//         return {
//             matchString,
//             replaceString,
//             len: matchString.length,
//         };
//     }

//     provideCompletionItems(
//         document: vscode.TextDocument,
//         position: vscode.Position,
//         token: vscode.CancellationToken,
//         context: vscode.CompletionContext
//     ) {
//         if (this.disableConstantRangeProvider) {
//             return [];
//         }
//         const linePrefix = document
//             .lineAt(position)
//             .text.substring(0, position.character);

//         const matchRangeResult = this._matchRange(linePrefix);
//         if (matchRangeResult) {
//             const item = new vscode.CompletionItem(
//                 matchRangeResult.matchString,
//                 vscode.CompletionItemKind.Property
//             );
//             item.detail = "SystemVerilog Range Abbreviation";
//             item.documentation = new vscode.MarkdownString().appendCodeblock(
//                 matchRangeResult.replaceString,
//                 "systemverilog"
//             );
//             item.insertText = matchRangeResult.replaceString;
//             item.range = new vscode.Range(
//                 position.line,
//                 position.character - matchRangeResult.len,
//                 position.line,
//                 position.character
//             );
//             return Promise.resolve(new vscode.CompletionList([item], true));
//         }
//         const matchDeclarationResult = this._matchDeclaration(linePrefix);
//         if (matchDeclarationResult) {
//             const item = new vscode.CompletionItem(
//                 matchDeclarationResult.matchString,
//                 vscode.CompletionItemKind.Property
//             );
//             item.detail = "SystemVerilog Range Abbreviation";
//             item.documentation = new vscode.MarkdownString().appendCodeblock(
//                 matchDeclarationResult.replaceString,
//                 "systemverilog"
//             );
//             item.insertText = matchDeclarationResult.replaceString;
//             item.range = new vscode.Range(
//                 position.line,
//                 position.character - matchDeclarationResult.len,
//                 position.line,
//                 position.character
//             );
//             return Promise.resolve(new vscode.CompletionList([item], true));
//         }
//         return [];
//     }
// }
