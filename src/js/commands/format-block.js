import TextFormatCommand from './text-format';
import { getSelectionBlockElement, selectNode } from '../utils/selection-utils';
import { inherit } from 'content-kit-utils';

function FormatBlockCommand(options) {
  options = options || {};
  options.action = 'formatBlock';
  TextFormatCommand.call(this, options);
}
inherit(FormatBlockCommand, TextFormatCommand);

FormatBlockCommand.prototype.exec = function() {
  var tag = this.tag;
  // Brackets neccessary for certain browsers
  var value =  '<' + tag + '>';
  var blockElement = getSelectionBlockElement();
  // Allow block commands to be toggled back to a text block
  if(tag === blockElement.tagName.toLowerCase()) {
    throw new Error('Unimplemented: Type.BOLD.paragraph must be replaced');
    /*
    value = Type.PARAGRAPH.tag;
    */
  } else {
    // Flattens the selection before applying the block format.
    // Otherwise, undesirable nested blocks can occur.
    // TODO: would love to be able to remove this
    var flatNode = document.createTextNode(blockElement.textContent);
    blockElement.parentNode.insertBefore(flatNode, blockElement);
    blockElement.parentNode.removeChild(blockElement);
    selectNode(flatNode);
  }

  FormatBlockCommand._super.prototype.exec.call(this, value);
};

export default FormatBlockCommand;
