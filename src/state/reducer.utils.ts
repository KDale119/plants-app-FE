import {
    AnyAction,
    AsyncThunk,
    ActionReducerMapBuilder,
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

/**
 * Useful types for working with actions
 */
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

/**
 * Check if the async action type is rejected
 */
/* istanbul ignore next */
export function isRejectedAction (action: AnyAction) {
    return action.type.endsWith('/rejected');
}

/**
 * Check if the async action type is pending
 */
/* istanbul ignore next */
export function isPendingAction (action: AnyAction) {
    return action.type.endsWith('/pending');
}

/**
 * Check if the async action type is completed
 */
/* istanbul ignore next */
export function isFulfilledAction (action: AnyAction) {
    return action.type.endsWith('/fulfilled');
}