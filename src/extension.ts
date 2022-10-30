import * as vscode from "vscode";
import {
    ComplierDirectivesProvider,
    // ConstantRangeProvider,
    SystemVerilogCompletionProvider,
} from "./completionProviders";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            "systemverilog",
            new ComplierDirectivesProvider()
        )
    );

    // context.subscriptions.push(
    //     vscode.languages.registerCompletionItemProvider(
    //         "systemverilog",
    //         constantRangeProvider,
    //         "0",
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "_",
    //         "$",
    //         "(",
    //         ")"
    //     )
    // );

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(
            "systemverilog",
            new SystemVerilogCompletionProvider(),
            "$"
        )
    );
}

export function deactivate() {}
