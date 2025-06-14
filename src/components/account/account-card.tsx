import React from 'react';

type AccountCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

const AccountCard: React.FC<AccountCardProps> = ({ title, description, icon }) => {
    return (
        <div className="p-12 bg-white rounded shadow-md cursor-pointer flex items-center justify-center transition-transform hover:scale-105 duration-300 active:scale-95">
            <div className="flex items-center gap-x-4">
                {icon}
                <div className="flex flex-col">
                    <h2 className="font-bold text-blue-primary uppercase">{title}</h2>
                    <span className="text-gray-primary text-sm">{description}</span>
                </div>
            </div>
        </div>
    );
}

export default AccountCard;