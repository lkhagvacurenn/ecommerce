import { useState } from "react";

const ContactForm = () => {
 
    const [contactForm,setContactForm] = useState({
        name:'',
        email:'',
        message:''
    });

    const handleChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]:e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        alert("successful");
        setContactForm({
             name:'',
            email:'',
            message:''
        });
    }
  return (
     <form onSubmit={handleSubmit} className='flex-grow max-w-[400px] min-w-[300px] flex flex-col gap-3 border-t-2 border-t-secondaryClr sm:border-t-0 mt-5 sm:mt-0'>
        <label htmlFor="name" className='font-bold block'>
            Full Name <br />
            <input value={contactForm.name} onChange={handleChange} className="w-full font-normal border border-black rounded-md outline-none p-1" type="text" name='name' id='name' required  />
        </label>
        <label htmlFor="email" className='font-bold'>
            Email Address <br />
            <input value={contactForm.email} onChange={handleChange} className="w-full font-normal border border-black rounded-md p-1 outline-none" type="email" name="email" id="email" required  />
        </label>
        <label htmlFor="message" className='font-bold'>
            Message <br />
            <textarea value={contactForm.message} onChange={handleChange} className="w-full font-normal p-1 resize-none border border-black rounded-md outline-none " name="message" id="message" spellCheck="false"  required />
        </label>
        <button type='submit' className="bg-secondaryClr text-white px-5 py-2 rounded-3xl hover:opacity-90 transition-transform hover:scale-110">
            Send Message
        </button>
    </form>
  )
}

export default ContactForm