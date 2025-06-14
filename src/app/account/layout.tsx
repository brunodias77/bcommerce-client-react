export default function AccouLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full flex flex-col md:flex-row bg-[#F2F3F4] flex-1">
            <div className='flex-1 w-full px-8 py-4 '>
                {children}
            </div>
        </div>
    );
}