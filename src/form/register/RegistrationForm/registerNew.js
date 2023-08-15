import { useState } from "react"
import React from 'react'
import './RegistrationForm.css';
import logo from '../../../assets/logo.jpeg'
import { db } from '../../../firebase'
import firebase from "firebase";


const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    NameofthePlayer: '',
    Email: '',
    MobileNumber: '',
    WhereDoYouLive: '',
    Age: '',
    Gender: '',
    Village: '',
    PlayedInNpl1orNpl2: '',
    Photo: null,
    PhotoOfPaymentDone: null,
  });

  const [loader,setLoader] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, files} = e.target;

    if(type === 'file'){
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    }else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
   

  
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    setLoader(true)
    // // Upload photos to Firebase Storage
    const storageRef = firebase.storage().ref();
    const photoRef = storageRef.child(formData.Photo.name);
    const paymentPhotoRef = storageRef.child(formData.PhotoOfPaymentDone.name);

    await Promise.all([
      photoRef.put(formData.Photo),
      paymentPhotoRef.put(formData.PhotoOfPaymentDone),
    ]);

    const photoURL = await photoRef.getDownloadURL();
    const paymentPhotoURL = await paymentPhotoRef.getDownloadURL();

    const customId = formData.NameofthePlayer

    //Upload data to Firebase Firestore..........
    db.collection("registration")
    .doc(customId)
    .set({
      NameofthePlayer:formData.NameofthePlayer,
      Email:formData.Email,
      MobileNumber:formData.MobileNumber,
      WhereDoYouLive:formData.WhereDoYouLive,
      Age:formData.Age,
      Gender:formData.Gender,
      Village:formData.Village,
      PlayedInNpl1orNpl2:formData.PlayedInNpl1orNpl2,
      Photo:photoURL,
      PhotoOfPaymentDone:paymentPhotoURL,
    })
    .then(() => {
      alert("Registration has been successfully done..");
      setLoader(false);
    })
    .catch((error) => {
      alert(error.message);
      setLoader(false);
    });

   setFormData({
    NameofthePlayer: '',
    Email: '',
    MobileNumber: '',
    WhereDoYouLive: '',
    Age: '',
    Gender: '',
    Village: '',
    PlayedInNpl1orNpl2: '',
    Photo: null,
    PhotoOfPaymentDone: null,
   });

    // API call to submit data to the Google Sheets...........
    // const formdatab = new FormData();

    // for (const key in formData){
    //   if(formData[key] instanceof File){
    //     formdatab.append(key,formData[key]);
    //   }else{
    //     formdatab.append(key,JSON.stringify(formData[key]));
    //   }
    // }

    // try{
    //   const response = await fetch(
    //     "https://script.google.com/macros/s/AKfycby77UuhvuJ4vn-JWpYvhSosa4qE8Q6R5OSSMWTO_ZJtr6I84BnbtdD0JSd-oyU81VIhTg/exec",
    //     {
    //       method:"POST",
    //       body:formdatab,
    //       headers:{
    //         'Content-Type': 'application/json'
    //       },
    //     });

    //     if (response.ok){
    //       console.log('Data Submitted:',response.data)
    //       setFormData({
    //         NameofthePlayer: '',
    //         Email: '',
    //         MobileNumber: '',
    //         WhereDoYouLive: '',
    //         Age: '',
    //         Gender: '',
    //         Village: '',
    //         PlayedInNpl1orNpl2: '',
    //         Photo: '',
    //         PhotoOfPaymentDone: '',
    //       });
    //     } 
    //     else{
    //       console.error("Error Submitting Data:",response)
    //     }
      
    // }catch (error){
    //   console.error('Error submitting data:',error)
    // }
  };

  return (
    <div className='registration-form'>
    {/* Logo */}
      <div className="logo">
        <img src={logo} style={{width:"130px",height:"130px",marginLeft:'34%'}} alt="logo"></img>
      </div> 
      <h1>Nagda Premier League (NPL-3.0)</h1>
      <h4 style={{textAlign:"center",color:"green"}}>Welcome to this year's Nagda Premiere League</h4>
        <div className="table">
           <table cellPadding={12} align="center" border={2}>
                <caption style={{marginBottom:'10px'}}>
                    Information
                </caption>
                  <tr>
                    <th>Mens</th>
                    <th>Females</th>
                    <th>Kids</th>
                  </tr>
                  <tr>
                    <td>Above 14yrs</td>
                    <td>Above 14yrs</td>
                    <td>Below 14yrs</td>
                  </tr>
                  <tr>
                    <td>Rs.400/- per player</td>
                    <td>Rs.300/- per player</td>
                    <td>Rs.200/- per player</td>
                  </tr>
           </table>
        </div>
          <table align="center" border={1} cellPadding={10} style={{marginTop:'12px',marginBottom:'10px'}}>
            <caption style={{marginBottom:'12px',fontSize:'16px',fontWeight:'bold'}} >
              Google Pay Number 
            </caption>
            <tr>
              <td>Tusmit Shah</td>
              <td>Vijay Nagda</td>
            </tr>
            <tr>
              <td>7039738033</td>
              <td>7045312026</td>
            </tr>
          </table>
          <h4 style={{textAlign:'center'}}>Note: Payment Screenshot should contain Full Name of the Player, For eg. Tusmit Naresh Shah/Nagda</h4>
          <h5 style={{textAlign:'center'}}>If any Issues while registering please message on below number <span style={{color:'blue'}}>Tusmit Shah - 7039738033 </span> </h5>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="forms">
        <div className='form-group'>
          <label htmlFor='NameofthePlayer'>Name of the Player</label>
          <input
            type='text'
            id='NameofthePlayer'
            name='NameofthePlayer'
            value={formData.NameofthePlayer}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Email'>Email-Id</label>
          <input
            type='email'
            id='Email'
            name='Email'
            value={formData.Email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='MobileNumber'>Mobile Number</label>
          <input
            type='text'
            id='MobileNumber'
            name='MobileNumber'
            value={formData.MobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='WhereDoYouLive'>Where do you live?</label>
          <input
            type='text'
            id='WhereDoYouLive'
            name='WhereDoYouLive'
            value={formData.WhereDoYouLive}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Age'>Age</label>
          <input
            type='text'
            id='Age'
            name='Age'
            value={formData.Age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-group' style={{alignItems:'center'}}>
          <label>Gender</label>
            <div className="radio">
                   <div className="radio_npl_wrap" style={{display:"flex",gap:"5px"}}>
                        <input
                          type='radio'
                          name='Gender'
                          value='Male'
                          checked={formData.Gender === 'Male'}
                          onChange={handleInputChange}
                        />{' '}
                        <label >
                          Male
                        </label>
                   </div>
                   <div className="radio_npl_wrap" style={{display:"flex",gap:"5px"}}>
                        <input
                          type='radio'
                          name='Gender'
                          value='Female'
                          checked={formData.Gender === 'Female'}
                          onChange={handleInputChange}
                        />{' '}
                        <label >
                          Female
                        </label>
                   </div>
                   <div className="radio_npl_wrap" style={{display:"flex",gap:"5px"}}>
                        <input
                          type='radio'
                          name='Gender'
                          value='Kids'
                          checked={formData.Gender === 'Kids'}
                          onChange={handleInputChange}
                        />{' '}
                        <label >
                          Kids
                        </label>
                   </div>
            </div>
        </div>
        <div className='form-group'>
            <label htmlFor='Village'>Village</label>
            <input
              type='text'
              id='Village'
              name='Village'
              value={formData.Village}
              onChange={handleInputChange}
              required
            />
        </div>
        <div className='form-group'>
                  <label>Played In NPL-1 or NPL-2?</label>
                  <div className="radio" style={{gap:"5px"}}>
                      <div className="radio_npl_wrap">
                            <input
                                type='radio'
                                name='PlayedInNpl1orNpl2'
                                value='NPL-1'
                                checked={formData.PlayedInNpl1orNpl2 === 'NPL-1'}
                                onChange={handleInputChange}
                              />{' '}
                            <label>
                            NPL-1
                            </label>
                        </div>
                     

                  <div className="radio_npl_wrap">
                          <input
                              type='radio'
                              name='PlayedInNpl1orNpl2'
                              value='NPL-2'
                              checked={formData.PlayedInNpl1orNpl2 === 'NPL-2'}
                              onChange={handleInputChange}
                            />{' '}
                          <label>
                          NPL-2
                          </label>
                   </div>

                  <div className="radio_npl_wrap">
                          <input
                              type='radio'
                              name='PlayedInNpl1orNpl2'
                              value='Both'
                              checked={formData.PlayedInNpl1orNpl2 === 'Both'}
                              onChange={handleInputChange}
                            />{' '}
                          <label>
                          Both
                          </label>
                    </div>

                    <div className="radio_npl_wrap">
                            <input
                                type='radio'
                                name='PlayedInNpl1orNpl2'
                                value='None'
                                checked={formData.PlayedInNpl1orNpl2 === 'None'}
                                onChange={handleInputChange}
                              />{' '}
                            <label>
                            None
                            </label>
                      </div>

              </div>
         </div>

        <div className='form-group'>
            <label htmlFor='Photo'>Self Photo</label>
            <input
              type='file'
              id='Photo'
              name='Photo'
              onChange={handleInputChange}
              required
            />
        </div>

        <div className='form-group'>
            <label htmlFor='PhotoOfPaymentDone'>Screenshot of Payment Done</label>
            <input
              type='file'
              id='PhotoOfPaymentDone'
              name='PhotoOfPaymentDone'
              onChange={handleInputChange}
              required
            />
        </div>
      
        {/* ... Repeat for other fields ... */}
        <button type='submit' style={{background : loader ? "#ccc" : "#007bff"}}>Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm