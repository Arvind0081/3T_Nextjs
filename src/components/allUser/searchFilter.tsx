//components/commomnComponents/searchInput

'use client';
import { useRouter,usePathname } from 'next/navigation';

const SearchUser = () => {

  const router = useRouter();
  const url = usePathname();
  const searchDynamically = async (event: React.ChangeEvent<HTMLInputElement>  ) => {
    
    const query = event.target.value;
    router.push(`${url}?search=${query}`);
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
      /> <i className="bi bi-search"></i>
    </div>
  );
};

export default SearchUser;
