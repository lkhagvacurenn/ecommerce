import React from 'react'

const About = () => {
  return (
    <div className='text-justify'>
        <article className='pb-10 max-w-[500px]'>
            <h2 className='font-bold text-2xl'>About us</h2>
            <p>We not only help you design exceptional products, but also make it easy for you
                to share your designs with more like-minded people.
            </p>
        </article>
        <div className='sm:flex justify-between gap-10 pb-10'>
            <img className="sm:w-[40%] rounded-md" src="../../public/about/image0.png" alt="" />
            <article className='max-w-[500px]'>
               <h2 className='font-bold text-2xl'>Provide fashionable and qualified products</h2>
                <p>
                    Already millions of people are very satisfied by thi. s page builder and the number is growing more and more. Technolog developing, requirements are increasing. Riode has brought.
                </p> 
            </article>
        </div>
        <div className='sm:flex justify-between gap-10 pb-10'>
            <img className="sm:w-[40%] sm:order-2 rounded-md" src="../../public/about/image.png" alt="" />
            <article className='order-1 max-w-[500px]'>
               <h2 className='font-bold text-2xl'>Provide fashionable and qualified products</h2>
                <p>
                    Already millions of people are very satisfied by thi. s page builder and the number is growing more and more. Technolog developing, requirements are increasing. Riode has brought.
                </p> 
            </article>
        </div>
        <div >
            <h2 className='font-bold text-2xl'>Get in touch with us</h2>
            <div className='sm:flex justify-between gap-10'>
                    <div>
                    <p className='flex flex-col pb-1'><h3 className='font-bold'>Address</h3><span>Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</span></p>
                    <p className='flex flex-col pb-1'><h3 className='font-bold'>Email</h3><a href='mailto:nexton@example.com'>nexton@example.com</a></p>
                    <p className='flex flex-col pb-1'><h3 className='font-bold'>Phone</h3><a href='tel:000-123-456-7890'>000-123-456-7890</a></p>
                    <p className='flex flex-col pb-1'>
                        <h3 className='font-bold'>Socials</h3>
                        <ul className='flex gap-1'>
                            <li>
                                <a href="https://facebook.com">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_34_6381)">
                                    <g clip-path="url(#clip1_34_6381)">
                                    <path d="M13.7999 23.8412V15.5294H16.5704L17.0999 12.0706H13.7999V9.84705C13.7999 8.89411 14.2587 7.97647 15.741 7.97647H17.241V5.04706C16.3352 4.89411 15.4469 4.81764 14.5763 4.81764C11.8587 4.81764 10.0763 6.47647 10.0763 9.45882V12.0706H7.05868V15.5294H10.0763V23.8412C4.39398 22.9588 0.0351562 18.0176 0.0351562 12.0706C0.0351562 5.50588 5.36457 0.158813 11.9469 0.158813C18.5116 0.158813 23.8587 5.50588 23.8587 12.0706C23.8587 18.0176 19.4999 22.9588 13.7999 23.8412Z" fill="#4676ED"/>
                                    <path d="M13.7998 15.5294V23.8412C13.1998 23.9352 12.5821 23.9823 11.9468 23.9823C11.3115 23.9823 10.688 23.9352 10.0762 23.8412V15.5294H7.05859V12.0706H10.0762V9.4588C10.0762 6.47645 11.8586 4.81763 14.5762 4.81763C15.4468 4.81763 16.3351 4.89409 17.2409 5.04704V7.97645H15.7409C14.2586 7.97645 13.7998 8.8941 13.7998 9.84704V12.0706H17.0998L16.5704 15.5294H13.7998Z" fill="white"/>
                                    </g>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_34_6381">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    <clipPath id="clip1_34_6381">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>

                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_34_6519)">
                                    <path d="M23.8979 11.905C23.8979 18.466 18.5715 23.81 11.9929 23.81C5.41428 23.81 0.0878906 18.466 0.0878906 11.905C0.0878906 5.32639 5.41428 0 11.9929 0C18.5715 0 23.8979 5.32639 23.8979 11.905Z" fill="#DA0000"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.93 11.905C19.93 13.6217 19.8183 14.8916 19.5949 15.7146C19.4185 16.4025 18.8718 16.9316 18.2015 17.1256C17.3667 17.349 15.2973 17.4607 11.9933 17.4607C8.68931 17.4607 6.61988 17.349 5.78507 17.1256C5.11486 16.9316 4.56811 16.4025 4.39174 15.7146C4.16835 14.8916 4.05664 13.6217 4.05664 11.905C4.05664 10.1766 4.16835 8.90086 4.39174 8.07779C4.56811 7.38995 5.11486 6.86084 5.78507 6.66683C6.61988 6.45519 8.68931 6.34937 11.9933 6.34937C15.2973 6.34937 17.3667 6.45519 18.2015 6.66683C18.8718 6.86084 19.4185 7.38995 19.5949 8.07779C19.8183 8.90086 19.93 10.1766 19.93 11.905ZM14.533 11.905L10.406 9.52403V14.286L14.533 11.905Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_34_6519">
                                    <rect width="23.9864" height="23.81" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>

                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_34_6522)">
                                    <g clip-path="url(#clip1_34_6522)">
                                    <path d="M11.9645 23.8588C5.3998 23.8588 0.0527344 18.5117 0.0527344 11.947C0.0527344 5.36469 5.3998 0.0352783 11.9645 0.0352783C18.5469 0.0352783 23.8763 5.36469 23.8763 11.947C23.8763 18.5117 18.5469 23.8588 11.9645 23.8588Z" fill="url(#paint0_linear_34_6522)"/>
                                    <path d="M8.17013 11.8059L16.0407 8.11768L12.8995 14.153C11.029 16.1059 10.0289 17.0824 9.89954 17.0824C9.77013 17.0824 9.64661 16.9647 9.52895 16.7294L8.11719 12.8118L8.17013 11.8059Z" fill="#C8DAEA"/>
                                    <path d="M12.2291 15.1235C11.6644 15.5823 11.088 16.1058 10.4997 16.6941C9.9115 17.2823 9.65267 17.2823 9.72326 16.6941L9.98796 13.8176L12.2291 15.1235Z" fill="#A9C6D8"/>
                                    <path d="M8.1527 12.953L5.24093 12.0001C5.00564 11.9059 4.92916 11.753 5.01152 11.5412C5.02917 11.4706 5.08211 11.4177 5.20564 11.3295C5.64094 11.0236 9.6174 9.5177 17.135 6.81182C17.3468 6.74123 17.5174 6.72946 17.6468 6.77653C17.7351 6.81182 17.788 6.84712 17.8233 6.98829C17.8409 7.04123 17.8586 7.14712 17.8586 7.253C17.8586 7.32359 17.8409 7.39418 17.8409 7.50006C17.7938 8.24123 17.0821 11.3648 15.7056 16.8706C15.635 17.2 15.4527 17.3706 15.1586 17.3824C14.9821 17.3824 14.788 17.3471 14.5586 17.153C13.6939 16.4118 10.7115 14.4001 10.0409 13.9589C10.0056 13.9236 10.0056 13.9059 9.98799 13.8706C9.98799 13.8354 10.0056 13.8001 10.0409 13.7648C13.5115 10.6824 15.288 8.97652 15.3703 8.64712C15.388 8.61182 15.3527 8.59418 15.2998 8.61182C14.9468 8.73535 8.96446 12.5295 8.29387 12.9354C8.27035 12.9589 8.22328 12.9648 8.1527 12.953Z" fill="white"/>
                                    </g>
                                    </g>
                                    <defs>
                                    <linearGradient id="paint0_linear_34_6522" x1="-0.300206" y1="23.8588" x2="-0.300206" y2="0.0352783" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#1D93D2"/>
                                    <stop offset="1" stop-color="#38B0E3"/>
                                    </linearGradient>
                                    <clipPath id="clip0_34_6522">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    <clipPath id="clip1_34_6522">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_34_6428)">
                                    <g clip-path="url(#clip1_34_6428)">
                                    <path d="M23.9651 12.0706C23.9651 18.6529 18.6357 23.9823 12.0534 23.9823C5.48866 23.9823 0.141602 18.6529 0.141602 12.0706C0.141602 5.50588 5.48866 0.158813 12.0534 0.158813C18.6357 0.158813 23.9651 5.50588 23.9651 12.0706Z" fill="#5A99EC"/>
                                    <path d="M4.7998 17.5235C5.04686 17.5471 5.2998 17.5588 5.55863 17.5588C7.04098 17.5588 8.3998 17.0647 9.49392 16.2C8.0998 16.1824 6.9351 15.2647 6.52922 14.0118C6.71746 14.0471 6.91745 14.0647 7.12922 14.0647C7.41157 14.0647 7.68803 14.0294 7.95863 13.9588C6.51157 13.6588 5.41745 12.3882 5.41745 10.8529C5.41745 10.8412 5.41745 10.8294 5.41745 10.8176C5.84098 11.0471 6.3351 11.1882 6.84686 11.2059C5.9998 10.6412 5.45275 9.67059 5.45275 8.57647C5.45275 7.99412 5.61157 7.46471 5.87628 6.98824C7.42922 8.89412 9.75863 10.1647 12.388 10.2882C12.341 10.0647 12.3175 9.82354 12.3175 9.56471C12.3175 7.81765 13.7292 6.40588 15.4763 6.40588C16.3939 6.40588 17.2057 6.79412 17.788 7.41177C18.5116 7.27059 19.1822 7.00588 19.7998 6.6353C19.5527 7.37647 19.0586 7.99412 18.4057 8.38235C19.041 8.31177 19.6586 8.15294 20.2233 7.88824C19.7998 8.52353 19.2527 9.08824 18.6351 9.52941C18.6469 9.67059 18.6527 9.80587 18.6527 9.9353C18.6527 14.1176 15.4763 18.9353 9.65275 18.9353C7.87039 18.9353 6.19392 18.4235 4.7998 17.5235Z" fill="white"/>
                                    </g>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_34_6428">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    <clipPath id="clip1_34_6428">
                                    <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>

                                </a>
                            </li>
                        </ul>
                    </p>
                </div>
                <form action="submit" className='flex-grow max-w-[400px] min-w-[300px] flex flex-col gap-3'>
                    <label htmlFor="" className='font-bold'>Full Name</label>
                    <input className="border border-black rounded-md outline-none p-1" type="text" name='name'id='name' />
                    <label htmlFor="email" className='font-bold'>Email Address</label>
                    <input className="border border-black rounded-md p-1 outline-none" type="email" name="email" id="email" />
                    <label htmlFor="message" className='font-bold'>Message</label>
                    <input className="min-h-32 p-1 border border-black rounded-md outline-none " type="text" name="message" id="message" spellcheck="false"/>
                    <button className="bg-secondaryClr text-white px-5 py-2 rounded-3xl hover:opacity-90 transition-transform hover:scale-110">
                        Send Message
                    </button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default About