import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './StoreSlices/boardSlice';

export default configureStore({
    reducer: {
        board: boardReducer,
    }
});
