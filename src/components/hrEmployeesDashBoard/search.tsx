//components/commomnComponents/searchInput

'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState('');
    const searchDynamically = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
       
        const query = event.target.value;
        setValue('');
        router.push(`/hrEmployeesBoard?search=${query}`);
    };

    return (
        <div>
            <input
                className="form-control"
                type="text"
                placeholder="Search Here"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    searchDynamically(event)
                }
                value={value}
            />
        </div>
    );
};

export default Search;
