'use client';
import { useState } from 'react';
import {  useSearchParams } from 'next/navigation';

const InvoicesTabs = ({ activeTabName }: any) => {
    //Initialize hook
    // const router = useRouter();
    const searchParams = useSearchParams();

    //Declare State
    const [activeTab, setActiveTab] = useState<string>('Search Invoice');
    const setActiveName = activeTabName != '' ? activeTabName : activeTab;

    if (searchParams.get('tabs') == null) {
        setActiveTab('');
    }

    // const switchTab = (e: any) => {
    //     const buttonText = e.target.innerText;
    //     setActiveTab(buttonText);
    //     router.push(`/invoices?tabs=${buttonText}`);
    // };

    return (
        <>
            <div className="theme_tabs">
                <ul
                    className="nav nav-tabs tab-style-1 d-sm-flex d-block mb-0"
                    role="tablist"
                >
                    
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${setActiveName === 'Search Invoice' ? 'active' : ''}`}
                            data-bs-toggle="tab"
                            data-bs-target="#SearchInvoice"
                            aria-selected={setActiveName === 'Search Invoice'}
                            role="tab"
                            // onClick={switchTab}
                        >
                        Invoices
                        </button>
                    </li>
                   
                </ul>
            </div>
        </>
    );
};

export default InvoicesTabs;