import { ReducersMapObject } from '@reduxjs/toolkit';
import userReducer from "@/state/user.reducer";

const rootReducer: ReducersMapObject = {
    user: userReducer
};

export default rootReducer;