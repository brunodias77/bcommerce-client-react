//app/account/page.tsx
import React from 'react';
import { ProfilePageContent } from '../../../components/profile/profile-page-content';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bcommercer | Perfil',
    description: 'Gerencie seu perfil no site Bcommerce',
};

export default function ProfilePage() {
    return (
        <div className=" h-full">
            <ProfilePageContent />
        </div>
    )
}