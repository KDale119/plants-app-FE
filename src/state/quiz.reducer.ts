import {createAsyncThunk, createSlice, isFulfilled, isPending} from '@reduxjs/toolkit';
import axios, { axiosCatch } from "./axios-utils";
import {QuizRequest} from "@/models/quiz.model";

const initialState = {
    loading: false
};

export const createQuiz = createAsyncThunk('quiz/submit', async (quiz: QuizRequest) => {
    return axios.post('/quiz', JSON.stringify(quiz)).catch(axiosCatch);
});

export const getQuizById = createAsyncThunk('quiz/get', async (quizId: number) => {
    return axios.get(`/quiz/${quizId}`).catch(axiosCatch);
});

export const getQuizByUsername = createAsyncThunk('quiz/list', async (username: string) => {
    return axios.get(`/quiz/results/${username}`).catch(axiosCatch);
});

export const QuizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addMatcher(isFulfilled(createQuiz, getQuizById, getQuizByUsername), (state, action) => {
                return {
                    ...state,
                    loading: false,
                };
            })
            .addMatcher(isPending(createQuiz, getQuizById, getQuizByUsername), (state) => {
                return {
                    ...state,
                    loading: true,
                };
            })
    }
});

export default QuizSlice.reducer;
export const selectQuizLoading = (state: any): boolean => state.quiz.loading;