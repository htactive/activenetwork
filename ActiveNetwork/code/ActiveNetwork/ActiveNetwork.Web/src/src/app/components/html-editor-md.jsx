import React from 'react';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  KeyBindingUtil,
  Modifier,
  AtomicBlockUtils,
  Entity,
} from 'draft-js';

import {
  Editor,
  StringToTypeMap,
  Block,
  keyBindingFn,
  createEditorState,
  addNewBlockAt,
  beforeInput,
  getCurrentBlock,
  ImageSideButton,
  rendererFn,
  HANDLED,
  NOT_HANDLED
} from 'medium-draft';

import {
  setRenderOptions,
  blockToHTML,
  entityToHTML,
  styleToHTML,
} from 'medium-draft/lib/exporter.js';


const newTypeMap = StringToTypeMap;
newTypeMap['2.'] = Block.OL;

const {hasCommandModifier} = KeyBindingUtil;

/*
 A demo for example editor. (Feature not built into medium-draft as too specific.)
 Convert quotes to curly quotes.
 */
const DQUOTE_START = '“';
const DQUOTE_END = '”';
const SQUOTE_START = '‘';
const SQUOTE_END = '’';

const newBlockToHTML = (block) => {
  if (block.type === Block.ATOMIC) {
    if (block.text === 'E') {
      return {
        start: '<figure class="md-block-atomic md-block-atomic-embed">',
        end: '</figure>',
      };
    } else if (block.text === '-') {
      return <div className="md-block-atomic md-block-atomic-break">
        <hr/>
      </div>;
    }
  }
  return blockToHTML(block);
};

const newEntityToHTML = (entity, originalText) => {
  if (entity.type === 'embed') {
    return (
      <div>
        <a
          className="embedly-card"
          href={entity.data.url}
          data-card-controls="0"
          data-card-theme="dark"
        >Embedded ― {entity.data.url}
        </a>
      </div>
    );
  }
  return entityToHTML(entity, originalText);
};

const handleBeforeInput = (editorState, str, onChange) => {
  if (str === '"' || str === '\'') {
    const currentBlock = getCurrentBlock(editorState);
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const text = currentBlock.getText();
    const len = text.length;
    if (selectionState.getAnchorOffset() === 0) {
      onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      return HANDLED;
    } else if (len > 0) {
      const lastChar = text[len - 1];
      if (lastChar !== ' ') {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_END : SQUOTE_END)), 'transpose-characters'));
      } else {
        onChange(EditorState.push(editorState, Modifier.insertText(contentState, selectionState, (str === '"' ? DQUOTE_START : SQUOTE_START)), 'transpose-characters'));
      }
      return HANDLED;
    }
  }
  return beforeInput(editorState, str, onChange, newTypeMap);
};


class SeparatorSideButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const entityKey = Entity.create('separator', 'IMMUTABLE', {});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        '-'
      )
    );
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a separator"
        onClick={this.onClick}
      >
        <i className="fa fa-minus"/>
      </button>
    );
  }
}


class EmbedSideButton extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addEmbedURL = this.addEmbedURL.bind(this);
  }

  onClick() {
    const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
    this.props.close();
    if (!url) {
      return;
    }
    this.addEmbedURL(url);
  }

  addEmbedURL(url) {
    const entityKey = Entity.create('embed', 'IMMUTABLE', {url});
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        this.props.getEditorState(),
        entityKey,
        'E'
      )
    );
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add an Embed"
        onClick={this.onClick}
      >
        <i className="fa fa-code"/>
      </button>
    );
  }

}


class AtomicEmbedComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showIframe: false,
    };

    this.enablePreview = this.enablePreview.bind(this);
  }

  componentDidMount() {
    this.renderEmbedly();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
      this.renderEmbedly();
    }
  }

  getScript() {
    const script = document.createElement('script');
    script.async = 1;
    script.src = '//cdn.embedly.com/widgets/platform.js';
    script.onload = () => {
      window.embedly();
    };
    document.body.appendChild(script);
  }

  renderEmbedly() {
    if (window.embedly) {
      window.embedly();
    } else {
      this.getScript();
    }
  }

  enablePreview() {
    this.setState({
      showIframe: true,
    });
  }

  render() {
    const {url} = this.props.data;
    const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="dark">Embedded ― ${url}</a></div>`;
    return (
      <div className="md-block-atomic-embed">
        <div dangerouslySetInnerHTML={{__html: innerHTML}}/>
      </div>
    );
  }
}

const AtomicSeparatorComponent = (props) => (
  <hr />
);

const AtomicBlock = (props) => {
  const {blockProps, block} = props;
  const entity = Entity.get(block.getEntityAt(0));
  const data = entity.getInfor();
  const type = entity.getType();
  if (blockProps.components[type]) {
    const AtComponent = blockProps.components[type];
    return (
      <div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
        <AtComponent data={data}/>
      </div>
    );
  }
  return <p>Block of type <b>{type}</b> is not supported.</p>;
};


export class HTMLEditorByMD extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorEnabled: true,
      placeholder: this.props.placeholder || 'Write here...',
    };

    this.sideButtons = [{
      title: 'Image',
      component: ImageSideButton,
    }, {
      title: 'Embed',
      component: EmbedSideButton,
    }, {
      title: 'Separator',
      component: SeparatorSideButton,
    }];

    this.exporter = setRenderOptions({
      styleToHTML,
      blockToHTML: newBlockToHTML,
      entityToHTML: newEntityToHTML,
    });

  }

  componentDidMount() {
  }

  rendererFn(setEditorState, getEditorState) {
    const atomicRenderers = {
      embed: AtomicEmbedComponent,
      separator: AtomicSeparatorComponent,
    };
    const rFnOld = rendererFn(setEditorState, getEditorState);
    const rFnNew = (contentBlock) => {
      const type = contentBlock.getType();
      switch (type) {
        case Block.ATOMIC:
          return {
            component: AtomicBlock,
            editable: false,
            props: {
              components: atomicRenderers,
            },
          };
        default:
          return rFnOld(contentBlock);
      }
    };
    return rFnNew;
  }

  keyBinding(e) {
    if (hasCommandModifier(e)) {
      if (e.which === 83) {  /* Key S */
        return 'editor-save';
      }
      // else if (e.which === 74 /* Key J */) {
      //  return 'do-nothing';
      //}
    }
    if (e.altKey === true) {
      if (e.shiftKey === true) {
        switch (e.which) {
          /* Alt + Shift + L */
          case 76:
            return 'load-saved-data';
          /* Key E */
          // case 69: return 'toggle-edit-mode';
        }
      }
      if (e.which === 72 /* Key H */) {
        return 'toggleinline:HIGHLIGHT';
      }
    }
    return keyBindingFn(e);
  }

  handleKeyCommand(command) {
    if (command === 'editor-save') {
      window.localStorage['editor'] = JSON.stringify(convertToRaw(this.props.editorState.getCurrentContent()));
      window.ga('send', 'event', 'draftjs', command);
      return true;
    } else if (command === 'load-saved-data') {
      this.loadSavedData();
      return true;
    } else if (command === 'toggle-edit-mode') {
      this.toggleEdit();
    }
    return false;
  }

  renderHTML(e) {
    const currentContent = this.props.editorState.getCurrentContent();
    const eHTML = this.exporter(currentContent);
    var newWin = window.open(
      `${window.location.pathname}rendered.html`,
      'windowName', `height=${window.screen.height},width=${window.screen.wdith}`);
    newWin.onload = () => newWin.postMessage(eHTML, window.location.origin);
  }

  loadSavedData() {
    const data = window.localStorage.getItem('editor');
    if (data === null) {
      return;
    }
    try {
      const blockData = JSON.parse(data);
      console.log(blockData);
      this.props.onChange(EditorState.push(this.props.editorState, convertFromRaw(blockData)), this._editor.focus);
    } catch (e) {
      console.log(e);
    }
    window.ga('send', 'event', 'draftjs', 'load-data', 'localstorage');
  }

  toggleEdit(e) {
    this.setState({
      editorEnabled: !this.state.editorEnabled
    }, () => {
      window.ga('send', 'event', 'draftjs', 'toggle-edit', this.state.editorEnabled + '');
    });
  }

  handleDroppedFiles(selection, files) {
    window.ga('send', 'event', 'draftjs', 'filesdropped', files.length + ' files');
    const file = files[0];
    if (file.type.indexOf('image/') === 0) {
      // eslint-disable-next-line no-undef
      const src = URL.createObjectURL(file);
      this.props.onChange(addNewBlockAt(
        this.props.state.editorState,
        selection.getAnchorKey(),
        Block.IMAGE, {
          src,
        }
      ));
      return HANDLED;
    }
    return NOT_HANDLED
  }

  handleReturn(e) {
    // const currentBlock = getCurrentBlock(this.state.editorState);
    // var text = currentBlock.getText();
    return NOT_HANDLED;
  }

  render() {
    const {editorEnabled} = this.state;
    return (
      <Editor
        editorState={this.props.editorState}
        placeholder={this.state.placeholder}
        onChange={(v,c)=>this.props.onChange(v,c)}
        editorEnabled={editorEnabled}
        handleDroppedFiles={this.handleDroppedFiles.bind(this)}
        handleKeyCommand={this.handleKeyCommand.bind(this)}
        keyBindingFn={this.keyBinding.bind(this)}
        beforeInput={handleBeforeInput.bind(this)}
        handleReturn={this.handleReturn.bind(this)}
        sideButtons={this.sideButtons}
        rendererFn={this.rendererFn.bind(this)}
      />
    );
  }
}
;