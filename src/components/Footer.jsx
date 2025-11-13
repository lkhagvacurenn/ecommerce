import { NavLink } from "react-router-dom"
import Logo from "./Logo"

const Footer = () => {
  return (
    <div className="w-full border-t-2 border-boxBgClr my-5">
        <div className="w-full flex flex-col sm:flex-row flex-wrap justify-between">
            <ul className="pt-3" >
                <Logo/> 
                <li className="flex items-center gap-1 mt-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_1407)">
                    <path d="M11.5 19.8676V12.9412H13.8088L14.25 10.0588H11.5V8.20586C11.5 7.41174 11.8824 6.64704 13.1176 6.64704H14.3676V4.20586C13.6127 4.0784 12.8726 4.01468 12.1471 4.01468C9.88235 4.01468 8.39706 5.39704 8.39706 7.88233V10.0588H5.88235V12.9412H8.39706V19.8676C3.66176 19.1323 0.0294113 15.0147 0.0294113 10.0588C0.0294113 4.58821 4.47059 0.132324 9.95588 0.132324C15.4265 0.132324 19.8824 4.58821 19.8824 10.0588C19.8824 15.0147 16.25 19.1323 11.5 19.8676Z" fill="#4676ED"/>
                    <path d="M11.5 12.9411V19.8676C11 19.946 10.4853 19.9852 9.95588 19.9852C9.42647 19.9852 8.90687 19.946 8.39706 19.8676V12.9411H5.88235V10.0588H8.39706V7.8823C8.39706 5.397 9.88235 4.01465 12.1471 4.01465C12.8725 4.01465 13.6128 4.07837 14.3676 4.20583V6.647H13.1176C11.8824 6.647 11.5 7.41171 11.5 8.20582V10.0588H14.25L13.8088 12.9411H11.5Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_22_1407">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <NavLink to="">Facebook</NavLink>
                </li>  
                <li className="flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_1414)">
                    <path d="M19.9135 9.92C19.9135 15.387 15.4752 19.84 9.99348 19.84C4.51176 19.84 0.0734787 15.387 0.0734787 9.92C0.0734787 4.43828 4.51176 0 9.99348 0C15.4752 0 19.9135 4.43828 19.9135 9.92Z" fill="#DA0000"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.6068 9.9201C16.6068 11.3505 16.5138 12.4087 16.3276 13.0945C16.1806 13.6677 15.725 14.1085 15.1666 14.2702C14.471 14.4564 12.7466 14.5494 9.99348 14.5494C7.24038 14.5494 5.51601 14.4564 4.82039 14.2702C4.26193 14.1085 3.80634 13.6677 3.65938 13.0945C3.47324 12.4087 3.38015 11.3505 3.38015 9.9201C3.38015 8.47987 3.47324 7.41684 3.65938 6.73101C3.80634 6.15785 4.26193 5.71696 4.82039 5.5553C5.51601 5.37895 7.24038 5.29077 9.99348 5.29077C12.7466 5.29077 14.471 5.37895 15.1666 5.5553C15.725 5.71696 16.1806 6.15785 16.3276 6.73101C16.5138 7.41684 16.6068 8.47987 16.6068 9.9201ZM12.1097 9.9201L8.67082 7.93611V11.9041L12.1097 9.9201Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_22_1414">
                    <rect width="19.987" height="19.84" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <NavLink to="">Youtube</NavLink>
                </li>  
                <li className="flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_1421)">
                    <path d="M9.97059 19.8822C4.5 19.8822 0.0441132 15.4264 0.0441132 9.95577C0.0441132 4.47047 4.5 0.0292969 9.97059 0.0292969C15.4559 0.0292969 19.8971 4.47047 19.8971 9.95577C19.8971 15.4264 15.4559 19.8822 9.97059 19.8822Z" fill="url(#paint0_linear_22_1421)"/>
                    <path d="M6.80883 9.83818L13.3677 6.76465L10.75 11.7941C9.19118 13.4215 8.35784 14.2352 8.25 14.2352C8.14217 14.2352 8.03922 14.1372 7.94118 13.9411L6.76471 10.6764L6.80883 9.83818Z" fill="#C8DAEA"/>
                    <path d="M10.1912 12.6029C9.72059 12.9852 9.24019 13.4215 8.75 13.9117C8.25981 14.4019 8.04412 14.4019 8.10294 13.9117L8.32353 11.5146L10.1912 12.6029Z" fill="#A9C6D8"/>
                    <path d="M6.79412 10.7941L4.36765 10C4.17157 9.92157 4.10784 9.79413 4.17647 9.61766C4.19118 9.55883 4.23529 9.5147 4.33823 9.44117C4.70098 9.18627 8.01471 7.93138 14.2794 5.67648C14.4559 5.61765 14.598 5.60785 14.7059 5.64707C14.7794 5.67648 14.8235 5.70589 14.8529 5.82354C14.8676 5.86765 14.8824 5.95589 14.8824 6.04413C14.8824 6.10295 14.8676 6.16177 14.8676 6.25001C14.8284 6.86765 14.2353 9.4706 13.0882 14.0588C13.0294 14.3333 12.8774 14.4755 12.6324 14.4853C12.4853 14.4853 12.3235 14.4559 12.1324 14.2941C11.4118 13.6765 8.92647 12 8.36765 11.6324C8.33823 11.6029 8.33823 11.5882 8.32353 11.5588C8.32353 11.5294 8.33823 11.5 8.36765 11.4706C11.2598 8.90196 12.7402 7.48039 12.8088 7.20589C12.8235 7.17648 12.7941 7.16177 12.75 7.17648C12.4559 7.27942 7.47059 10.4412 6.91176 10.7794C6.89216 10.799 6.85294 10.8039 6.79412 10.7941Z" fill="white"/>
                    </g>
                    <defs>
                    <linearGradient id="paint0_linear_22_1421" x1="-0.250004" y1="19.8822" x2="-0.250004" y2="0.0292969" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1D93D2"/>
                    <stop offset="1" stopColor="#38B0E3"/>
                    </linearGradient>
                    <clipPath id="clip0_22_1421">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <NavLink to="">Telegram</NavLink>
                </li>  
                <li className="flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_22_1430)">
                    <path d="M19.9706 10.0588C19.9706 15.5441 15.5294 19.9853 10.0441 19.9853C4.57353 19.9853 0.117645 15.5441 0.117645 10.0588C0.117645 4.58821 4.57353 0.132324 10.0441 0.132324C15.5294 0.132324 19.9706 4.58821 19.9706 10.0588Z" fill="#5A99EC"/>
                    <path d="M4 14.6028C4.20588 14.6224 4.41666 14.6323 4.63235 14.6323C5.86765 14.6323 7 14.2205 7.91176 13.4999C6.75 13.4852 5.77941 12.7205 5.44118 11.6764C5.59804 11.7058 5.76471 11.7205 5.94118 11.7205C6.17647 11.7205 6.40685 11.6911 6.63235 11.6323C5.42647 11.3823 4.51471 10.3234 4.51471 9.04402C4.51471 9.03421 4.51471 9.0244 4.51471 9.01461C4.86765 9.20578 5.27941 9.32343 5.70588 9.33814C5 8.86755 4.54412 8.05872 4.54412 7.14696C4.54412 6.66166 4.67647 6.22049 4.89706 5.82343C6.19118 7.41166 8.13235 8.47049 10.3235 8.57343C10.2843 8.38715 10.2647 8.18618 10.2647 7.97049C10.2647 6.51461 11.4412 5.33813 12.8971 5.33813C13.6618 5.33813 14.3382 5.66166 14.8235 6.17637C15.4265 6.05872 15.9853 5.83813 16.5 5.52931C16.2941 6.14696 15.8824 6.66166 15.3382 6.98519C15.8676 6.92637 16.3824 6.79402 16.8529 6.57343C16.5 7.10284 16.0441 7.57343 15.5294 7.94108C15.5393 8.05872 15.5441 8.17146 15.5441 8.27931C15.5441 11.7646 12.8971 15.7793 8.04412 15.7793C6.55882 15.7793 5.16176 15.3528 4 14.6028Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_22_1430">
                    <rect width="20" height="20" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    <NavLink to="">Twitter</NavLink>
                </li>  
            </ul>

            <ul className="pt-3">
                <h4 className="font-bold text-l">Getting started</h4>
                <li className="mt-1 hover:text-primaryClr"><NavLink to="/about">About us</NavLink></li>
                <li><NavLink to="">Upgrade Guide</NavLink></li>
                <li><NavLink to="">Browser Support</NavLink></li>
                <li><NavLink to="">Dark mode</NavLink></li>
            </ul>

            <ul className="pt-3">
                <h4 className="font-bold text-l">Explore</h4>
                <li className="mt-1"><NavLink to="">Prototyping</NavLink></li>
                <li><NavLink to="">Design systems</NavLink></li>
                <li><NavLink to="">Pricing</NavLink></li>
                <li><NavLink to="">Security</NavLink></li>
            </ul>

            <ul className="pt-3">
                <h4 className="font-bold text-l">Community</h4>
                <li className="mt-1"><NavLink to="">Discussion Forums</NavLink></li>
                <li><NavLink to="">Code of Conduct</NavLink></li>
                <li><NavLink to="">Contributing</NavLink></li>
                <li><NavLink to="">API Reference</NavLink></li>
            </ul>
        </div>

        {/* Policies */}

        <div className="mt-3 pt-3 flex flex-wrap border-t-2 border-boxBgClr justify-center sm:justify-around gap-5">
            <p>Next eCommerce.©2024</p>
            <div className="flex gap-1">
               <img src="../../public/payment/visa.png" alt="visa" className="w-[56px] object-cover" /> 
               <img src="../../public/payment/payPal.png" alt="payPal" className="w-[56px] object-cover" /> 
               <img src="../../public/payment/stripe.png" alt="stripe" className="w-[56px] object-cover" /> 
               <img src="../../public/payment/verySign.png" alt="verySign" className="w-[56px] object-cover" />               
            </div>
        </div>
    </div>
  )
}

export default Footer