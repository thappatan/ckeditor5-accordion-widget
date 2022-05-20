import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  toWidgetEditable,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";

import InsertAccordionCommand from "./insertaccordioncommand";

import "../theme/accordion.css";

export default class AccordionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log("AccordionEditing#init() got called");

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      "insertAccordion",
      new InsertAccordionCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("accordion", {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block",
    });

    schema.register("accordionTitle", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "accordion",

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: "$block",
    });

    schema.register("accordionContent", {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: "accordion",

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: "$root",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      model: "accordion",
      view: {
        name: "details",
        classes: "accordion",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordion",
      view: {
        name: "details",
        classes: "accordion",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordion",
      view: (modelElement, { writer: viewWriter }) => {
        const container = viewWriter.createContainerElement("details", {
          class: "accordion",
        });

        return toWidget(container, viewWriter, {
          label: "accordion widget",
        });
      },
    });

    conversion.for("upcast").elementToElement({
      model: "accordionTitle",
      view: {
        name: "summary",
        classes: "accordion_title",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordionTitle",
      view: {
        name: "summary",
        classes: "accordion_title",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordionTitle",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const titleBlock = viewWriter.createEditableElement("summary", {
          class: "accordion_title",
        });

        return toWidgetEditable(titleBlock, viewWriter);
      },
    });

    conversion.for("upcast").elementToElement({
      model: "accordionContent",
      view: {
        name: "div",
        classes: "accordion_content",
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "accordionContent",
      view: {
        name: "div",
        classes: "accordion_content",
      },
    });
    conversion.for("editingDowncast").elementToElement({
      model: "accordionContent",
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const content = viewWriter.createEditableElement("div", {
          class: "accordion_content",
        });

        return toWidgetEditable(content, viewWriter);
      },
    });
  }
}
