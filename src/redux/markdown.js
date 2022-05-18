/*
 * @Author: fei
 * @Date: 2018-02-07 16:30:35
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 11:08:51
 */
const initialState = {
    markdownContent: '',
    isPrinting: false,
    style: {
        fontFamily: 'Iosevka, TsangerJinKai01 W03',
        fontSize: 18,
    },
    viewMode: '11',
    editorElement: null
};
const TYPES = {
    CHANGE_MARKDOWN_CONTENT: 'CHANGE_MARKDOWN_CONTENT',
    CHANGE_IS_PRINTING: 'CHANGE_IS_PRINTING',
    CHANGE_VIEW_MODE: 'CHANGE_VIEW_MODE',
    CHANGE_FONT_FAMILY: 'CHANGE_FONT_FAMILY',
    CHANGE_FONT_SIZE: 'CHANGE_FONT_SIZE',
    CHANGE_EDITOR_ELEMENT: 'CHANGE_EDITOR_ELEMENT'
};
const reducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case TYPES.CHANGE_MARKDOWN_CONTENT:
            return { ...state, markdownContent: action.markdownContent };
        case TYPES.CHANGE_IS_PRINTING:
            return { ...state, isPrinting: action.isPrinting };
        case TYPES.CHANGE_VIEW_MODE:
            return { ...state, viewMode: action.viewMode };
        case TYPES.CHANGE_FONT_FAMILY:
            return { ...state, style: { ...state.style, fontFamily: action.fontFamily } };
        case TYPES.CHANGE_FONT_SIZE:
            return { ...state, style: { ...state.style, fontSize: action.fontSize } };
        case TYPES.CHANGE_EDITOR_ELEMENT:
            return { ...state, editorElement: action.editorElement };
        default:
            return state;
    }
}
const actions = {
    changeMarkdownContent() {
        return {
            type: TYPES.CHANGE_MARKDOWN_CONTENT,
            markdownContent: arguments[0]
        };
    },
    changeIsPrinting() {
        return {
            type: TYPES.CHANGE_IS_PRINTING,
            isPrinting: arguments[0]
        };
    },
    changeViewMode() {
        return {
            type: TYPES.CHANGE_VIEW_MODE,
            viewMode: arguments[0]
        };
    },
    changeFontFamily() {
        return {
            type: TYPES.CHANGE_FONT_FAMILY,
            fontFamily: arguments[0]
        };
    },
    changeFontSize() {
        return {
            type: TYPES.CHANGE_FONT_SIZE,
            fontSize: arguments[0],
        };
    },
    changeEditorElement() {
        return {
            type: TYPES.CHANGE_EDITOR_ELEMENT,
            editorElement: arguments[0]
        };
    }
};

export default reducer;
export { actions };
