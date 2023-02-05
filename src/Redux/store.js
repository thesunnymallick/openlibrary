
import {configureStore} from "@reduxjs/toolkit"
import { subjectReducer } from "./reducer"

const store=configureStore({
    reducer:{
        subjectValue:subjectReducer
    }
})

export default store;