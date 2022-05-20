import AccordionEditing from './accordionediting';
import AccordionUi from './accordionui';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class AccordionBox extends Plugin {
  static get requires() {
	return [ AccordionUi, AccordionEditing ];
  }
}
