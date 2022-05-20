import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import accordionIcon from "../theme/icons/accordion.svg";

export default class AccordionUI extends Plugin {
  init() {
    console.log( 'AccordionUI#init() got called' );

    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("accordion", (locale) => {
      const command = editor.commands.get("insertAccordion");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Accordion"),
        icon: accordionIcon,
        tooltip: true,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, "execute", () => {
        editor.execute("insertAccordion");
      });

      return buttonView;
    });
  }
}
