import React, { useState } from 'react'
import FormInputs from '../../components/FormInputs'

const Register = () => {
    
    const [formdata , setformdata] = useState({
        nameofthePlayer:"",
        email:"",
        mobileNumber:"",
        whereDoYouLive:"",
        age:"",
        gender:"",
        village:"",
        playedInNpl1orNpl2:"",
        photo:"",
        photoOfPaymentDone:""

    });

    const inputs = [
        {
            id:1,
            name:"nameofthePlayer",
            type:"text",
            placeholder:"For example. Tusmit Naresh Shah/Nagda",
            errorMessage :"Please enter players full name",
            label: "Full Name of the Player",
            required:true
        },
        {
            id:2,
            name:"email",
            type:"text",
            placeholder:"Email-Id",
            errorMessage :"Please enter valid email address",
            label: "Email-Id",
            required:true

        },
        {
            id:3,
            name:"mobileNumber",
            type:"text",
            placeholder:"WhatsApp Mobile Number",
            errorMessage :"Please enter valid WhatsApp Number",
            label: "Mobile Number",
            required:true

        },
        {
            id:4,
            name:"whereDoYouLive",
            type:"text",
            placeholder:"For example. Dombivli",
            errorMessage :"Please enter valid location",
            label: "Where do you Live?",
            required:true

        },
        {
            id:5,
            name:"age",
            type:"text",
            placeholder:"Age",
            errorMessage :"Please enter your age",
            label: "Age",
            required:true

        },
        {
            id:6,
            name:"village",
            type:"text",
            placeholder:"For example. Bhojay",
            errorMessage :"Please enter your village",
            label: "Village in Kutch",
            required:true

        },
        {
            id:7,
            name:"gender",
            type:"radio",
            placeholder:"Gender",
            label: "Gender",
            values:["Male","Female","Kids"],
            errorMessage:"Fields cannot be empty",
            required:true
        },
      
        {
            id:8,
            name:"playedInNpl1orNpl2",
            type:"radio",
            placeholder:"Played in NPL-1 or NPL-2 or Both",
            label: "Played in NPL-1 or NPL-2 or Both",
            values:["NPL-1","NPL-2","Both","None"],
            errorMessage:"Fields cannot be empty",
            required:true

        },
        {
            id:9,
            name:"photo",
            type:"file",
            placeholder:"Self Photo",
            errorMessage :"Please enter your self photo",
            label: "Photo",
            required:true

        },
        {
            id:10,
            name:"photoOfPaymentDone",
            type:"file",
            placeholder:"Please Mention players name in your Google Pay Note while paying",
            label: "Screenshot/Photo of Payment Done",
            errorMessage :"Please enter your screenshot with Players name on your google pay note",
            subtitle:"Note: While doing the payment please mention the players name in the (Note) of you app like Google Pay/ PhonePe",
            required:true

        }
        
        
    ]
   
    const handleSubmit = (e) =>{
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(Object.fromEntries(data.entries()))
    }

    const onChangeValue = (e) =>{
            setformdata({...formdata,[e.target.name]:e.target.value})
    }


  return (
    <div className='app'>
        
            <form onSubmit={handleSubmit}>
                <h1>Registration Form</h1>
                    <div className='form-container'>
                            <div className='grid-1'>
                                {inputs.slice(0, Math.ceil(inputs.length / 2)).map((input) => (
                                <FormInputs key={input.id} {...input} value={formdata[input.name]} onChange={onChangeValue} />
                                ))}
                            </div>
                            <div className='grid-2'> 
                                {inputs.slice(Math.ceil(inputs.length / 2)).map((input) => (
                                <FormInputs key={input.id} {...input} value={formdata[input.name]} onChange={onChangeValue} />
                                ))}
                            </div>
                    </div>
                <button>Submit</button>
            </form>
    </div>
  )
}

export default Register
