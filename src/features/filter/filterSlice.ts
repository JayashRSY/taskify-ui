import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ITask } from '../../interfaces/ITask'
import { IColumn } from '../../interfaces/IColumn'

export interface FilterState {
    filteredTasks?: ITask[];
    filteredColumns?: IColumn[]
}

const initialState: FilterState = {
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilteredTasks: (state, action: PayloadAction<ITask[]>) => {
            state.filteredTasks = action.payload
        },
        setFilteredColumns: (state, action: PayloadAction<IColumn[]>) => {
            state.filteredColumns = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFilteredTasks, setFilteredColumns } = filterSlice.actions

export default filterSlice.reducer