import * as vscode from "vscode";
import { CompletionItemKind } from "vscode";

import { CharStreams, CommonTokenStream, ConsoleErrorListener } from "antlr4ts";
import * as c3 from "antlr4-c3";

import { SystemVerilog2017Lexer as Lexer } from "./grammars/SystemVerilog2017Lexer";
import { SystemVerilog2017Parser as Parser } from "./grammars/SystemVerilog2017Parser";

import utilSysTaskFuncs from "./data/util_sys_task_funcs.json";
import ioSysTaskFuncs from "./data/io_sys_task_funcs.json";
import timingChecks from "./data/timing_checks.json";
import backannotatations from "./data/backannotatations.json";
import optSysTaskFuncs from "./data/opt_sys_task_funcs.json";
import compilerDirectives from "./data/compiler_directives.json";
import optCompilerDirectives from "./data/opt_compiler_directives.json";

interface SysTaskFunc {
    [key: string]: {
        detail?: string;
        documentation: string;
    };
}

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
    private sysTaskFuncs = {
        ...utilSysTaskFuncs,
        ...ioSysTaskFuncs,
        ...optSysTaskFuncs,
    } as SysTaskFunc;

    public provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context: vscode.CompletionContext
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        console.log("SystemVerilogCompletionProvider provideCompletionItems");

        // When only "$" is typed, do not show any completion items
        const linePrefix = document
            .lineAt(position)
            .text.substring(0, position.character);
        console.log(linePrefix);
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
        let cands = core.collectCandidates(Number.MAX_SAFE_INTEGER, result);

        // Keywords
        let keywords: string[] = [];
        for (let cand of cands.tokens.keys()) {
            const displayName = parser.vocabulary.getDisplayName(cand);
            if (displayName.match(/^'[a-z_\$]{2,}'$/)) {
                // Remove single quotes
                const keyword = displayName.substring(
                    1,
                    displayName.length - 1
                );
                keywords.push(keyword);
            }
        }

        // If the keyword is in sysTaskFuncs, add the detail and documentation
        // Test if the keyword is in sysTaskFuncs
        return keywords.map((keyword) => {
            if (keyword in this.sysTaskFuncs) {
                const item = new vscode.CompletionItem(
                    keyword,
                    CompletionItemKind.Function
                );
                item.detail = this.sysTaskFuncs[keyword].detail;
                item.documentation = new vscode.MarkdownString(
                    this.sysTaskFuncs[keyword].documentation
                );
                return item;
            } else {
                return new vscode.CompletionItem(
                    keyword,
                    CompletionItemKind.Keyword
                );
            }
        });
    }
}

export class ComplierDirectivesProvider
    implements vscode.CompletionItemProvider
{
    private disableComplierDirectivesProvider: boolean;
    private enableOptComplierDirectivesProvider: boolean;

    constructor() {
        const config = vscode.workspace.getConfiguration("systemverilog");
        this.disableComplierDirectivesProvider =
            config.get("disableComplierDirectivesProvider") || false;
        this.enableOptComplierDirectivesProvider =
            config.get("enableOptComplierDirectivesProvider") || false;
    }

    provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        console.log("ComplierDirectivesProvider provideCompletionItems");

        if (this.disableComplierDirectivesProvider) {
            return [];
        }

        // When only "`" is typed, do not show any completion items
        // When there are other words before "`", do not show any completion items
        const linePrefix = document
            .lineAt(position)
            .text.substring(0, position.character);

        if (!linePrefix.match(/^\s*`\w+/)) {
            return [];
        }

        const complierDirectives: Array<any> = this
            .enableOptComplierDirectivesProvider
            ? [...compilerDirectives, ...optCompilerDirectives]
            : compilerDirectives;

        return buildCompletionItems(
            complierDirectives,
            CompletionItemKind.Keyword
        );
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
