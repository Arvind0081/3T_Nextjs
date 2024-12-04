import TeamProductivityReport from './teamProductivityReport';

const TeamReport = ({ teamReport }: any) => {
    // const numberToTimeConversion = (decimalTime: any) => {
    //     const hours = Math.floor(decimalTime);
    //     const fractionalHours = decimalTime - hours;
    //     const minutes = Math.round(fractionalHours * 60);

    //     // Format time string to HH:mm
    //     const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    //     return formattedTime;
    // };
    // debugger;
    // const calculateTotalUpworkHours = (data: any) => {
    //     const upworkHours = data?.employeeDetails?.reduce(
    //         (teamTotal: any, employee: any) => teamTotal + employee.upworkHours,
    //         0
    //     );
    //     return upworkHours;
    // };
    // const calculateTotalFixedHours = (data: any) => {
    //     const fixedHours = data?.employeeDetails?.reduce(
    //         (teamTotal: any, employee: any) => teamTotal + employee.fixedHours,
    //         0
    //     );
    //     // return data?.reduce((total: any, team: any) => {
    //     //     const teamFixedHours = team.employeeDetails.reduce(
    //     //         (teamTotal: any, employee: any) =>
    //     //             teamTotal + employee.fixedHours,
    //     //         0
    //     //     );
    //     //     return total + teamFixedHours;
    //     // }, 0);
    //     return fixedHours;
    // };
    // const calculateTotalOfflineHours = (data: any) => {
    //     const offlineHours = data?.employeeDetails?.reduce(
    //         (teamTotal: any, employee: any) =>
    //             teamTotal + employee.offlineHours,
    //         0
    //     );
    //     // return data?.reduce((total: any, team: any) => {
    //     //     const teamOfflineHours = team.employeeDetails.reduce(
    //     //         (teamTotal: any, employee: any) =>
    //     //             teamTotal + employee.offlineHours,
    //     //         0
    //     //     );
    //     //     return total + teamOfflineHours;
    //     // }, 0);
    //     return offlineHours;
    // };

    // const calculateTotalBillingHours = (data: any) => {
    //     const billingHours = data?.employeeDetails?.reduce(
    //         (teamTotal: any, employee: any) =>
    //             teamTotal + employee.billingHours,
    //         0
    //     );
    //     return billingHours;
    // };

    // const totalUpworkHours = (data: any) => {
    //     return numberToTimeConversion(calculateTotalUpworkHours(data));
    // };
    // const totalOfflineHours = (data: any) => {
    //     return numberToTimeConversion(calculateTotalOfflineHours(data));
    // };

    // const totalFixedHours = (data: any) => {
    //     return numberToTimeConversion(calculateTotalFixedHours(data));
    // };
    // const totalBillingHours = (data: any) => {
    //     return numberToTimeConversion(calculateTotalBillingHours(data));
    // };
    return (
        <>
            <TeamProductivityReport teamReport={teamReport} />
        </>
    );
};
export default TeamReport;
