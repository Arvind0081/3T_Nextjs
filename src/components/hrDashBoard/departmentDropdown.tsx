'use client';
import { useRouter, useSearchParams,usePathname} from 'next/navigation';

const Department = ({ getDepartment, getManagerList }: any) => {
    const router = useRouter();
    // const [mangerID, setMangerID,] = useState('');

    const searchParams = useSearchParams();
    const url = usePathname();

    const date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, '0');
const monthValue = searchParams.get('month') ?? `${year}-${month}`;

    
    const searchValue = searchParams.get('departmentId');
    const managerIdSearch = searchParams.get('managerId');

    const handleDepartmentChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const dep = event.target.value;
        router.push(`${url}?month=${monthValue}&departmentId=${dep}&managerId=${''}`);
    };
    const handleManagerChange = async (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newManagerId = event.target.value;
        // setMangerID(newManagerId)
    //    getManagerList.filter(
    //         (item: any) => item.name == newManagerId
    //     );
        router.push(
            `${url}?month=${monthValue}&departmentId=${searchValue}&managerId=${newManagerId}`
        );

  
    };

    return (
        <>
        <div className='d-flex department_Header'>
            <div className="selectbox">
                <p className="fw-semibold mb-2">Select Department</p>
                <select
                    className="form-control"
                    value={searchValue ?? 1}
                    onChange={handleDepartmentChange}
                >
                    {/* <option value="1">Select Department</option> */}
                    {getDepartment?.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="selectbox">
                <p className="fw-semibold mb-2">Select Manager</p>
                <select
                    className="form-control"
                    defaultValue={managerIdSearch ?? ''}
                    onChange={handleManagerChange}
                >
                    <option value="">Select Manager</option>

                    {getManagerList?.map((option: any, index: number) => (
                        <option key={index} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        </>
    );
};

export default Department;