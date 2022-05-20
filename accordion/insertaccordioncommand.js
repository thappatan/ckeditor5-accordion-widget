import Command from "@ckeditor/ckeditor5-core/src/command";

export default class InsertAccordionCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <simpleBox>*</simpleBox> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createAccordion(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "accordion"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createAccordion(writer) {
  const accordion = writer.createElement("accordion");
  const accordionTitle = writer.createElement("accordionTitle");
  const accordionContent = writer.createElement("accordionContent");

  writer.append(accordionTitle, accordion);
  writer.append(accordionContent, accordion);

  writer.appendElement("paragraph", accordionContent);

  return accordion;
}
