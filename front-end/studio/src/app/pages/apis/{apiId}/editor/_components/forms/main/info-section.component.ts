/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Oas20Document, OasDocument, OasInfo} from "oai-ts-core";
import {
    createChangeDescriptionCommand,
    createChangePropertyCommand,
    createChangeVersionCommand,
    ICommand
} from "oai-ts-commands";
import {CommandService} from "../../../_services/command.service";


@Component({
    moduleId: module.id,
    selector: "info-section",
    templateUrl: "info-section.component.html",
    encapsulation: ViewEncapsulation.None
})
export class InfoSectionComponent {

    @Input() document: OasDocument;

    constructor(private commandService: CommandService) {}

    public info(): OasInfo {
        return this.document.info;
    }

    /**
     * returns the version.
     */
    public version(): string {
        if (this.info()) {
            return this.info().version;
        } else {
            return null;
        }
    }

    /**
     * returns the description.
     */
    public description(): string {
        if (this.info()) {
            return this.info().description;
        } else {
            return null;
        }
    }

    /**
     * Called when the user changes the version.
     * @param newVersion
     */
    public onVersionChange(newVersion: string): void {
        console.info("[InfoSectionComponent] User changed the version to: ", newVersion);
        let command: ICommand = createChangeVersionCommand(this.document, newVersion);
        this.commandService.emit(command);
    }

    /**
     * Called when the user changes the description.
     * @param newDescription
     */
    public onDescriptionChange(newDescription: string): void {
        console.info("[InfoSectionComponent] User changed the description.");
        let command: ICommand = createChangeDescriptionCommand(this.document, newDescription);
        this.commandService.emit(command);
    }

    /**
     * Called when the user changes the "consumes".
     * @param newValue
     */
    public onConsumesChange(newValue: string[]): void {
        console.info("[InfoSectionComponent] User changed the consumes to: ", newValue);
        let command: ICommand = createChangePropertyCommand<string[]>(this.document, this.document, "consumes", newValue);
        this.commandService.emit(command);
    }

    /**
     * Called when the user changes the "produces".
     * @param newValue
     */
    public onProducesChange(newValue: string[]): void {
        console.info("[InfoSectionComponent] User changed the produces to: ", newValue);
        let command: ICommand = createChangePropertyCommand<string[]>(this.document, this.document, "produces", newValue);
        this.commandService.emit(command);
    }

    public consumes(): string[] {
        return (this.document as Oas20Document).consumes;
    }

    public produces(): string[] {
        return (this.document as Oas20Document).produces;
    }

}
