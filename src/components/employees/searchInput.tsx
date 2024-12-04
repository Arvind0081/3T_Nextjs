//components/commomnComponents/searchInput

'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const Search = () => {
    const router = useRouter();
    const url = usePathname();
    const searchParams = useSearchParams();
    const searchValue = searchParams.get('departmentId');

    const searchDynamically = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const query = event.target.value;
        router.push(`${url}?search=${query}&searchValueHR=${searchValue}`);
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
            />
        </div>
    );
};

export default Search;
