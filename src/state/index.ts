import { ReducersMapObject } from '@reduxjs/toolkit';
import userReducer from "@/state/user.reducer";
import quizReducer from "@/state/quiz.reducer";

const rootReducer: ReducersMapObject = {
    user: userReducer,
    quiz: quizReducer
};

export default rootReducer;