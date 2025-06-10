import Image from 'next/image';


const Footer: React.FC = () => {
    return (
        <footer>
            <div className="container flex items-start justify-between flex-wrap gap-12 mt-12">
                {/* logo - Left side */}
                <div className="flex flex-col max-w-sm gap-y-5">
                    <div className="max-w-[60px]">
                        <Image
                            src="/assets/logo/logo-bcommerce.png"
                            alt="Logo da empresa"
                            width={60}
                            height={60}
                            priority
                        />
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
                        earum reprehenderit possimus!
                    </p>

                    <div className="max-w-[180px]">
                        <Image
                            src="/assets/cards/cards.png"
                            alt="Bandeiras dos cartões de crédito"
                            width={0}
                            height={0}
                            style={{ width: "100%", height: "auto" }}
                            priority
                        />
                    </div>
                </div>

                {/* links */}
                <div className="flex items-center justify-start gap-7 xl:gap-x-36 flex-wrap">
                    <ul>
                        <h4 className="h4 mb-3">Customer Service</h4>
                        {["Help center", "Payment methods", "Contact", "Shipping status", "Complaints"].map((text) => (
                            <li key={text} className="my-2">
                                <a href="#" className="text-gray-30 text-[14px] font-[400]">
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <ul>
                        <h4 className="h4 mb-3">Legal</h4>
                        {["Privacy Policy", "Cookie settings", "Terms & conditions", "Cancelation", "Imprint"].map((text) => (
                            <li key={text} className="my-2">
                                <a href="#" className="text-gray-30 text-[14px] font-[400]">
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <ul>
                        <h4 className="h4 mb-3">Others</h4>
                        {["Our teams", "Sustainability", "Press", "Jobs", "Newsletter"].map((text) => (
                            <li key={text} className="my-2">
                                <a href="#" className="text-gray-30 text-[14px] font-[400]">
                                    {text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* copyrights */}
            <p className="text-center bg-primary text-gray-500 text-[14px] font-[500] py-2 px-8 rounded flexBetween mt-6">
                <span>2025 @bdias.dev</span>
                <span>All rights reserved</span>
            </p>
        </footer>
    );
}

export default Footer;