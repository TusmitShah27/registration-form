import React, { useState } from 'react'
import './forminputs.css';

const FormInputs = (props) => {
 
const [focused, setFocused] = useState(false)
const { label, onChange,errorMessage, id,values, type,...inputProps } = props;

const handleFocus = (e) =>{
    setFocused(true)
}

  return (
    <div className='forminputs'>
        <label htmlFor={id}>{label}</label>
        {type === 'radio' ? (
            <div className='radioMode'>
                    {values.map((value)=>(
                        <label key={value}>
                        <span>{errorMessage}</span> 
                            <input
                                {...inputProps}
                                type='radio'
                                value={value}
                                onChange={onChange}
                                checked= {inputProps.value === value}
                                onBlur={handleFocus}
                                focused={focused.toString()}

                            />
                            {value}
                        </label> 
                            
                ))}

            </div>
             ) : (
                <input  {...inputProps} onChange={onChange} type={type} onBlur={handleFocus} focused={focused.toString()}/>  
        ) }
        <span>{errorMessage}</span>
        
    </div>
  )
}

export default FormInputs