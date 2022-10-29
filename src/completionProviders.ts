import * as vscode from "vscode";
import { CompletionItemKind } from "vscode";

import { CharStreams, CommonTokenStream, ConsoleErrorListener } from "antlr4ts";
import * as c3 from "antlr4-c3";

import { SystemVerilogLexer as Lexer } from "./grammars/SystemVerilogLexer";
import { SystemVerilogParser as Parser } from "./grammars/SystemVerilogParser";

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

export class SystemVerilogCompletionProvider
    implements vscode.CompletionItemProvider
{
    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        const offset = document.offsetAt(position);
        const text = document
            .getText()
            .substring(0, offset)
            .replace(/[a-zA-Z]+$/, "");

        console.log("text: " + text);

        // Lexer and parser
        const inputStream = new (CharStreams as any).fromString(text);
        const lexer = new Lexer(inputStream);
        const parser = new Parser(new CommonTokenStream(lexer));
        parser.removeErrorListeners();
        const result = parser.source_text();

        // Code completion core
        let core = new c3.CodeCompletionCore(parser);
        let cands = core.collectCandidates(Number.MAX_SAFE_INTEGER, result);

        // Keywords
        let keywords: string[] = [];
        for (let cand of cands.tokens.keys()) {
            const name = parser.vocabulary.getDisplayName(cand);
            if (name.match(/^'[a-z_\$]{2,}'$/)) {
                keywords.push(name.substring(1, name.length - 1));
            }
        }

        console.log("keywords:", keywords);
        console.log("number:", keywords.length);

        return buildCompletionItems(
            keywords.map((k) => {
                return { name: k };
            }),
            CompletionItemKind.Keyword
        );
    }
}

// export class KeywordsProvider implements vscode.CompletionItemProvider {
//     private disableKeywordsProvider: boolean;

//     constructor() {
//         this.disableKeywordsProvider =
//             vscode.workspace
//                 .getConfiguration("systemverilog")
//                 .get("disableKeywordsProvider") || false;
//     }

//     provideCompletionItems(
//         document: vscode.TextDocument,
//         position: vscode.Position,
//         token: vscode.CancellationToken
//     ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
//         if (this.disableKeywordsProvider) {
//             return [];
//         }
//         const linePrefix = document
//             .lineAt(position)
//             .text.substring(0, position.character);

//         return buildCompletionItems([], CompletionItemKind.Keyword);
//     }
// }

// export class SysTaskFuncsProvider implements vscode.CompletionItemProvider {
//     private disableSysTaskFuncsProvider: boolean;
//     private enableOptSysTaskFuncsProvider: boolean;

//     constructor() {
//         const config = vscode.workspace.getConfiguration("systemverilog");
//         this.disableSysTaskFuncsProvider =
//             config.get("disableSysTaskFuncsProvider") || false;
//         this.enableOptSysTaskFuncsProvider =
//             config.get("enableOptSysTaskFuncsProvider") || false;
//     }

//     provideCompletionItems(
//         document: vscode.TextDocument,
//         position: vscode.Position,
//         token: vscode.CancellationToken
//     ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
//         if (this.disableSysTaskFuncsProvider) {
//             return [];
//         }

//         const linePrefix = document
//             .lineAt(position)
//             .text.substring(0, position.character);

//         // If the word is after a dot, return []
//         if (linePrefix.match(/\.\w*$/)) {
//             return [];
//         }

//         // When only "$" is typed, do not show any completion items
//         const pattern = /(?<![a-z])\$$/;
//         if (pattern.test(linePrefix)) {
//             return [];
//         }

//         const sysTaskFuncs: Array<any> = [
//             ...utilSysTaskFuncs.sim_ctrl,
//             ...utilSysTaskFuncs.sim_time,
//             ...utilSysTaskFuncs.timescale,
//             ...utilSysTaskFuncs.conversion,
//             ...utilSysTaskFuncs.data_query,
//             ...utilSysTaskFuncs.arr_query,
//             ...utilSysTaskFuncs.math,
//             ...utilSysTaskFuncs.bit_vector,
//             ...utilSysTaskFuncs.severity,
//             ...utilSysTaskFuncs.assert_ctrl,
//             ...utilSysTaskFuncs.sample_value,
//             ...utilSysTaskFuncs.coverage,
//             ...utilSysTaskFuncs.prob_dist,
//             ...utilSysTaskFuncs.stoch_analysis,
//             ...utilSysTaskFuncs.pla_modeling,
//             ...utilSysTaskFuncs.misc,
//             ...ioSysTaskFuncs.display,
//             ...ioSysTaskFuncs.file_io,
//             ...ioSysTaskFuncs.mem_load,
//             ...ioSysTaskFuncs.mem_dump,
//             ...ioSysTaskFuncs.cmd_line,
//             ...ioSysTaskFuncs.vcd,
//             ...backannotatations,
//         ];

//         const sysTaskFuncsAll = this.enableOptSysTaskFuncsProvider
//             ? [...sysTaskFuncs, ...optSysTaskFuncs]
//             : sysTaskFuncs;

//         return buildCompletionItems(
//             sysTaskFuncsAll,
//             CompletionItemKind.Function
//         );
//     }
// }

// export class TimingChecksProvider implements vscode.CompletionItemProvider {
//     private disableTimingChecksProvider: boolean;

//     constructor() {
//         this.disableTimingChecksProvider =
//             vscode.workspace
//                 .getConfiguration("systemverilog")
//                 .get("disableTimingChecksProvider") || false;
//     }

//     provideCompletionItems(
//         document: vscode.TextDocument,
//         position: vscode.Position,
//         token: vscode.CancellationToken
//     ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
//         if (this.disableTimingChecksProvider) {
//             return [];
//         }

//         const linePrefix = document
//             .lineAt(position)
//             .text.substring(0, position.character);

//         // If the word is after a dot, return []
//         if (linePrefix.match(/\.\w*$/)) {
//             return [];
//         }

//         // When only "$" is typed, do not show any completion items
//         const pattern = /(?<![a-z])\$$/;
//         if (pattern.test(linePrefix)) {
//             return [];
//         }

//         return buildCompletionItems(timingChecks, CompletionItemKind.Property);
//     }
// }

// export class ComplierDirectivesProvider
//     implements vscode.CompletionItemProvider
// {
//     private disableComplierDirectivesProvider: boolean;
//     private enableOptComplierDirectivesProvider: boolean;

//     constructor() {
//         const config = vscode.workspace.getConfiguration("systemverilog");
//         this.disableComplierDirectivesProvider =
//             config.get("disableComplierDirectivesProvider") || false;
//         this.enableOptComplierDirectivesProvider =
//             config.get("enableOptComplierDirectivesProvider") || false;
//     }

//     provideCompletionItems(
//         document: vscode.TextDocument,
//         position: vscode.Position,
//         token: vscode.CancellationToken
//     ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
//         if (this.disableComplierDirectivesProvider) {
//             return [];
//         }

//         // When only "`" is typed, do not show any completion items
//         const linePrefix = document
//             .lineAt(position)
//             .text.substring(0, position.character);

//         if (/\S\`\w*$/.test(linePrefix)) {
//             return [];
//         }

//         const complierDirectives: Array<any> = this
//             .enableOptComplierDirectivesProvider
//             ? [...compilerDirectives, ...optCompilerDirectives]
//             : compilerDirectives;

//         return buildCompletionItems(
//             complierDirectives,
//             CompletionItemKind.Keyword
//         );
//     }
// }

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
