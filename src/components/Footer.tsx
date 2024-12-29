'use client';

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// import './Footer.css';

const Footer = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const easeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.0,
                ease: 'easeIn',
            },
        },
    };

    return (
        <motion.footer
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={easeInVariants}
            className="footer bg-gray-100 py-10"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
                    <motion.div
                        className='flex-shrink-0'
                        initial="hidden"
                        animate={controls}
                        variants={easeInVariants}
                    >
                       
                    </motion.div>
                    {/* <motion.div
                        className="text-2xl font-bold text-gray-700"
                        initial="hidden"
                        animate={controls}
                        variants={easeInVariants}
                    >
                        mocksparrow
                    </motion.div> */}
                </div>
                <div className="flex flex-col lg:flex-row justify-between mb-10">
                    <motion.div
                        className="space-y-6 mb-10 lg:mb-0"
                        initial="hidden"
                        animate={controls}
                        variants={easeInVariants}
                    >
                        <div className="flex gap-4">
                            <FaFacebook size={32} />
                            <FaInstagram size={32} />
                            <FaLinkedin size={32} />
                        </div>
                        <div>
                            <p className="text-gray-700">Barpeta Road, Barpeta, Assam, India, 781315</p>
                            <p className="text-gray-700">Contact : +91 7002582737 / 6900215858</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        initial="hidden"
                        animate={controls}
                        variants={easeInVariants}
                    >
                        <div className="text-black">
                            <div className="space-y-2">
                                <div>Terms of Service</div>
                                <div>Privacy Policy</div>
                                <div>Security Measures</div>
                                <div>Contact Us</div>
                            </div>
                        </div>
                        <div className="text-black">
                            <div className="space-y-2">
                                <div>Company</div>
                                <div>About</div>
                                <div>Career</div>
                                <div>Courses</div>
                            </div>
                        </div>
                        <div className="text-black">
                            <div className="space-y-2">
                                <div>Community</div>
                                <div>Help Center</div>
                                <div>Webinars</div>
                                <div>Forum</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="pt-10">
                    <hr className="border-t-2 border-gray-300 py-2" />
                    <p className="text-center text-sm text-gray-600">
                        &copy; 2024 Dihing Education Foundation. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;




// import './Footer.css'
// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Image from "next/image";

// const Footer = () => {
//     return (
//         <footer className="footer bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                 <div className="flex items-center gap-4 mb-10">
//                     <div>
//                         <Image src='/SVG/logo_green.svg' alt="Logo" width={200} height={200} priority />
//                     </div>
//                     <div className="text-2xl font-bold text-gray-700">
//                         mocksparrow
//                     </div>
//                 </div>
//                 <div className="flex flex-col lg:flex-row justify-between mb-10">
//                     <div className="space-y-6 mb-10 lg:mb-0">
//                         <div className="flex gap-4">
//                             <FaFacebook size={32} />
//                             <FaInstagram size={32} />
//                             <FaLinkedin size={32} />
//                         </div>
//                         <div>
//                             <p className="text-gray-700">RMZ Millenia Business Park,Innova8 Millenia, Perungudi, India, 600096</p>
//                             <p className="text-gray-700">Contact : +91 9361470760</p>
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="text-black">
//                             <div className="space-y-2">
//                                 <div>Terms of Service</div>
//                                 <div>Privacy Policy</div>
//                                 <div>Security Measures</div>
//                                 <div>Contact Us</div>
//                             </div>
//                         </div>
//                         <div className="text-black">
//                             <div className="space-y-2">
//                                 <div>Company</div>
//                                 <div>About</div>
//                                 <div>Career</div>
//                                 <div>Investors Relation</div>
//                             </div>
//                         </div>
//                         <div className="text-black">
//                             <div className="space-y-2">
//                                 <div>Community</div>
//                                 <div>Help Center</div>
//                                 <div>Webinars</div>
//                                 <div>Forum</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="pt-10">
//                     <hr className="border-t-2 border-gray-300 py-2" />
//                     <p className="text-center text-sm text-gray-600">
//                         &copy; 2024 MockSparrow. All rights reserved.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default Footer;



// import './Footer.css'

// import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

// import Image from "next/image";

// const Footer = () => {
//     return (
//         <footer className="footer">
//             <div className="flex items-center gap-2">
//                 <div className=''>
//                     <Image src='/SVG/logo_green.svg' alt="Logo" width={200} height={200} priority />
//                 </div>
//                 <div className="Footertext">
//                     mocksparrow
//                 </div>
//             </div>
//             <div className='pt-20 flex justify-between'>
//                 <div className='space-y-6'>
//                     <div className='flex gap-4'>
//                         <FaFacebook size={32} />
//                         <FaInstagram size={32} />
//                         <FaLinkedin size={32} />
//                     </div>
//                     <div>
//                         <p>Lorem Ipsum, India</p>
//                         <p>Lorem Ipsum, India</p>
//                     </div>
//                 </div>
//                 <div className="container mx-auto p-4">
//                     <div className="grid grid-cols-3 gap-4">
//                         <div className=" text-black p-4">
//                             <div className="grid grid-rows-4 gap-2">
//                                 <div className=" p-2">Terms of Service</div>
//                                 <div className=" p-2">Privacy Policy</div>
//                                 <div className=" p-2">Security Measures</div>
//                                 <div className=" p-2">Contact Us</div>
//                             </div>
//                         </div>
//                         <div className=" text-black p-4">
//                             <div className="grid grid-rows-4 gap-2">
//                                 <div className=" p-2">Company</div>
//                                 <div className=" p-2">About</div>
//                                 <div className="p-2">Career</div>
//                                 <div className="p-2">Investors Relation</div>
//                             </div>
//                         </div>
//                         {/* <div className=" text-black p-4">
//                             <div className="grid grid-rows-4 gap-2">
//                                 <div className=" p-2">Row 1</div>
//                                 <div className=" p-2">Row 2</div>
//                                 <div className=" p-2">Row 3</div>
//                                 <div className=" p-2">Row 4</div>
//                             </div>
//                         </div> */}
//                         <div className=" text-black p-4">
//                             <div className="grid grid-rows-4 gap-2">
//                                 <div className=" p-2">Community</div>
//                                 <div className=" p-2">Help Center</div>
//                                 <div className=" p-2">Webinars</div>
//                                 <div className=" p-2">Forum</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <div className=''>Links</div> */}
//             </div>
//             <div className='pt-10'>
//                 <hr className='border-t-2 border-gray-600 py-2 mx-20' />
//                 <p className='text-center text-sm text-gray-600'>
//                     &copy; 2024 MockSparrow. All rights reserved.
//                 </p>
//             </div>
//         </footer>
//     );
// }

// export default Footer;
