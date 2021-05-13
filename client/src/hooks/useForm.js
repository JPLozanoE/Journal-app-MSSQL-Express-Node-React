import { useState } from 'react';

// Se utiliza así
//   const [{title,details,category},handleInputchange,reset,setValues]=useForm({
//    title:'',
//    details:'',
//    category: ''
//  });

export const useForm = (initialState={}) => {

    const [values, setValues] = useState(initialState)

    const reset =()=>{
        setValues(initialState);
    }

    const handleInputChange = ({target})=>{

        setValues({
            ...values,
            [target.name]:target.value})
    }
    return [values,handleInputChange,reset,setValues]
}
