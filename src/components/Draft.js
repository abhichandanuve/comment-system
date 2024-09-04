import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const [editorState, setEditorState] = useState(EditorState.createEmpty());

const onEditorStateChange = (editorState) => {
  setEditorState(editorState);
};

const handleSubmit = () => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const htmlContent = draftToHtml(rawContentState);
  console.log(htmlContent); // Save this HTML to Firestore
};
