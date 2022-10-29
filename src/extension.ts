import * as vscode from "vscode";
import {
    // KeywordsProvider,
    // SysTaskFuncsProvider,
    // TimingChecksProvider,
    // ComplierDirectivesProvider,
    // ConstantRangeProvider,
    SystemVerilogCompletionProvider,
} from "./completionProviders";

export function activate(context: vscode.ExtensionContext) {
    // const keywordsProvider = new KeywordsProvider();
    // const sysTaskFuncsProvider = new SysTaskFuncsProvider();
    // const timingChecksProvider = new TimingChecksProvider();
    // const complierDirectivesProvider = new ComplierDirectivesProvider();
    // const constantRangeProvider = new ConstantRangeProvider();

    // context.subscriptions.push(
    //     vscode.languages.registerCompletionItemProvider(
    //         "systemverilog",
    //         keywordsProvider
    //     )
    // );

    // context.subscriptions.push(
    //     vscode.languages.registerCompletionItemProvider(
    //         "systemverilog",
    //         sysTaskFuncsProvider
    //     )
    // );

    // context.subscriptions.push(
    //     vscode.languages.registerCompletionItemProvider(
    //         "systemverilog",
    //         timingChecksProvider
    //     )
    // );

    // context.subscriptions.push(
    //     vscode.languages.registerCompletionItemProvider(
    //         "systemverilog",
    //         complierDirectivesProvider
    //     )
    // );

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
            new SystemVerilogCompletionProvider()
        )
    );

    console.log("extension activated");
}

export function deactivate() {}
