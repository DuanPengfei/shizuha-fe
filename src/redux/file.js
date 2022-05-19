/*
 * @Author: fei
 * @Date: 2018-02-07 16:30:35
 * @Last Modified by: huaiyu
 * @Last Modified time: 2022-05-18 21:19:53
 */
const initialState = {
    files: [],
};
const TYPES = {
    UPDATE_FILES: 'UPDATE_FILES',
};
const reducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case TYPES.UPDATE_FILES:
            return { ...state, files: action.files };
        default:
            return state;
    }
}
const actions = {
    updateFiles() {
        return {
            type: TYPES.UPDATE_FILES,
            files: arguments[0],
        };
    },
};

export default reducer;
export { actions };
