export const attendanceStatusClass = (status: string) => {
  switch (status) {
    case 'A':
    case 'Ab':
      return 'absent_status'; // Absent
    case '½P':
    case 'H½P':
    case 'WO½P':
    case '½PL½P':
    case '½CL½P':
    case '½LWP½P':
    case '½SL½P':
    case 'CL½P':
    case 'SL½P':
    case '½LWP':
    case '½CLP':
      return 'halfDayAbsent_status'; //half day present
    case '½SL':
    case '½CL':
    case '½PL':
    case 'LWP':
      return 'halfDayLeave_status'; // half day leave
    case 'CL':
    case 'PL':
    case 'SL':
      return 'leave_status'; // Leave color
    case 'P':
    case 'WOP':
    case 'HP':
      return 'Present_status'; //  Present
    case 'N/A':
      return 'Present_status';
    default:
      return 'Present_status';
  }
};


export const finalAttendanceStatus=(statusDetails:any,bioMetricDetails:any)=>{
      
    const hour =statusDetails.totalHours?? statusDetails.dayHours;
    let attendanceStatus=statusDetails.attendanceStatus;

    const BMHours=bioMetricDetails===undefined?0:bioMetricDetails?.duration===(0 || undefined)?0:bioMetricDetails?.duration/60;
    const statusCode=bioMetricDetails?.statusCode;


    if (attendanceStatus === null)
      {
          if (attendanceStatus === null && hour < 8 && hour >= 4)
          {
            attendanceStatus = 'HA';
          }
          else if (attendanceStatus == null && hour >= 8)
          {
            attendanceStatus = 'P';
          }
          else
          {
            attendanceStatus = 'Ab';
          }
      };

       if (statusCode === undefined)
        {
            return 'Ab';
        };


    if (BMHours >= 8 && hour < 8){

      if (attendanceStatus === 'L' || attendanceStatus === 'HL'|| attendanceStatus === 'SL'){

        if (attendanceStatus === 'L'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
               return statusCode;
            }
          else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
            {
                return statusCode;
            }
          else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
            {
                  return 'L';
            }
          else if (statusCode === 'A' || statusCode === 'Ab')
            {
                  return 'Ab';
            }
          else if (statusCode === 'H' || statusCode === 'WO')
            {
                 return 'H';
            }
          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
              {
                 return attendanceStatus;
              }
          else
              {
                return attendanceStatus;
              }     

        }
        else if (attendanceStatus === 'HL'){

          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return 'HL';
            }
          else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
            {
              return 'HL';
            }
          else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
            {
              return 'HL';
            }
          else if (statusCode === 'A' || statusCode === 'Ab')
            {
                return  'Ab';
            }
          else if (statusCode === 'H' || statusCode === 'WO')
            {
                return 'H';
            }
          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
            {
              return 'HL';
            }
          else
            {
              return 'HL';
            }
        }
        else if (attendanceStatus === 'SL'){
          return 'SL';
        }

      }
    else{
      //Present with Exception -- without color and BM hours here
      if (attendanceStatus !== 'P'){
        if (attendanceStatus === 'Ab')
          {
            return 'Ab';
          }
        else if (attendanceStatus === 'HA'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP'){
            return 'HA';
          }
          else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
            {
              return 'HA';
            }
          else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
            {
                return 'L';
            }
          else if (statusCode === 'A' || statusCode === 'Ab')
              {
                return 'Ab';
              }
          else if (statusCode === 'H' || statusCode === 'WO')
              {
                    return 'H';
              }
          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
              {
                   return 'HA';
              }
          else
              {
                return 'HA';
              }

        }
        else if (attendanceStatus === 'HL'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return 'HA';
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                  return 'HL';
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                    return 'HL';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                      return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                          return 'HL';
                      }
                      else{
                          return 'HL';
                       }

        }
        else if (attendanceStatus == 'SL'){
             return 'SL';
        }
      }
      else{
        if (attendanceStatus === 'P'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return statusCode;
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                  return statusCode;
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                   return 'L';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                    return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                          return 'P';
                      }
                      else
                      {
                        return 'P';
                      }

        }
      }

      }

    }
    else if (BMHours <= 0 && hour >= 8){
      //If the employee is working from office then Absent
      //if employee is working from work from Home then we need chq the desktop monitoring software logs
       if (hour != 0){

        if (attendanceStatus === 'L' || attendanceStatus === 'HL'|| attendanceStatus==='SL'){
          if (attendanceStatus === 'L'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                return statusCode;
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                  return statusCode;
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                      return 'L';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                       return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return attendanceStatus;
                        }
                        else
                        {
                          return attendanceStatus;
                        }

          }
          else if (attendanceStatus === 'HL'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                 return 'HL';
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                  return 'HL';
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                    return 'HL';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                        return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return 'HL';
                        }
                        else
                        {
                          return 'HL';
                        }

          }
          else if (attendanceStatus === 'SL'){
             return 'SL';
          }

        }
        else{
          // if hour is  (hour < 8.00m && hour >= 4.00m Half Day Absent -Present exception in BM not 3t
          if (attendanceStatus != 'P'){
            if (attendanceStatus === 'Ab'){
                     return 'Ab';
            }
            else if (attendanceStatus === 'HA'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return 'HA';
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                    return 'HA';
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                        return 'L';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                            return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'HA';
                          }
                          else
                          {
                            return 'HA';
                          }

            }
            else if (attendanceStatus === 'HL'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return 'HA';
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                      return 'HL';
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                      return 'HL';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                          return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'HL';
                          }
                          else
                          {
                            return 'HL';
                          }

            }
            else if (attendanceStatus === 'SL'){
                 return 'SL';
            }

          }
          else{
            if (attendanceStatus === 'P'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return statusCode;
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                    return statusCode;
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                        return 'L';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                            return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'P';
                          }
                          else
                          {
                            return 'P';
                          }

            }
          }
        }

       }
       else{
        return 'H';
       }

    }
    else if (BMHours < 8 && hour >= 8){
      if (attendanceStatus === 'L' || attendanceStatus === 'HL' || attendanceStatus ==='SL'){
        if (attendanceStatus === 'L'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return statusCode;
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                return statusCode;
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                  return 'L';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                      return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                        return attendanceStatus;
                      }
                      else
                      {
                        return attendanceStatus;
                      }

        }
        else if (attendanceStatus === 'HL'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return 'HL';
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                return 'HL';
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                  return 'HL';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                    return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                      return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                        return 'HL';
                      }
                      else
                      {
                        return 'HL';
                      }

        }
        else if (attendanceStatus === 'SL'){
            return 'SL';
        }
      }
      else{
        // Half Day Absent -Present exception in BM not 3t
        if (attendanceStatus != 'P'){
         if (attendanceStatus === 'Ab')
           {
               return 'Ab';
           }
           else if (attendanceStatus === 'HA'){
             if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
               {
                   return 'HA';
               }
               else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                 {
                   return 'HA';
                 }
                 else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                   {
                       return 'L';
                   }
                   else if (statusCode === 'A' || statusCode === 'Ab')
                     {
                         return 'Ab';
                     }
                     else if (statusCode === 'H' || statusCode === 'WO')
                       {
                           return 'H';
                       }
                       else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                         {
                           return 'HA';
                         }
                         else
                         {
                           return 'HA';
                         }

           }
           else if (attendanceStatus === 'HL'){
             if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
               {
                  return 'HL';
               }
               else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                 {
                   return 'HL';
                 }
                 else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                   {
                     return 'HL';
                   }
                   else if (statusCode === 'A' || statusCode === 'Ab')
                     {
                         return 'Ab';
                     }
                     else if (statusCode === 'H' || statusCode === 'WO')
                       {
                           return 'H';
                       }
                       else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                         {
                             return 'HL';
                         }
                         else
                          {
                           return 'HL';
                          }

           }
           else if (attendanceStatus === 'SL'){
             return 'SL';
           }

        }
        else{
         if (attendanceStatus === 'P'){
           if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
             {
                 return statusCode;
             }
             else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
               {
                 return statusCode;
               }
               else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                 {
                     return 'L';
                 }
                 else if (statusCode === 'A' || statusCode === 'Ab')
                   {
                       return 'Ab';
                   }
                   else if (statusCode === 'H' || statusCode === 'WO')
                     {
                         return 'H';
                     }
                     else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                       {
                           return 'P';
                       }
                       else
                       {
                         return 'P';
                       }

         }
        }
     }
    }
   
    else if (BMHours <= 0 && hour <= 0){
      const currentDate = new Date();
      const options:any = { weekday: 'long' };  // You can also use 'short' for abbreviated day names
      const currentDay = currentDate.toLocaleDateString('en-US', options);
      if (currentDay === 'Saturday' || currentDay === 'Sunday'){
        if (BMHours <= 0 && hour <= 0)
          {
            return 'H';
          }else{
            return attendanceStatus;
          }
      }
      else{
        if (attendanceStatus === 'L' || attendanceStatus === 'HL' || attendanceStatus ==='SL'){
          if (attendanceStatus === 'L'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                  return statusCode;
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                  return statusCode;
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                      return 'L';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                        return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return attendanceStatus;
                        }
                        else
                        {
                          return attendanceStatus;
                        }

          }
          else if (attendanceStatus === 'HL'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                  return 'HL';
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                  return 'HL';
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                    return 'HL';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                        return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return 'HL';
                        }
                        else
                        {
                          return 'HL';
                        }
          }
          else if (attendanceStatus === 'SL'){
            return 'SL';
          }
        } else{
          return 'Ab';
        }
      }
     
    }
    else if (BMHours >= 8 && hour >= 8){
      if (attendanceStatus === 'L' || attendanceStatus === 'HL' || attendanceStatus === 'SL'){
        if (attendanceStatus === 'L'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return statusCode;
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                return statusCode;
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                    return 'L';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                      return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                          return attendanceStatus;
                      }
                      else
                      {
                        return attendanceStatus;
                      }

        }
        else if (attendanceStatus === 'HL'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return 'HL';
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                  return 'HL';
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                    return 'HL';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                      return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                          return 'HL';
                      }
                      else
                      {
                        return 'HL';
                      }

        }
        else if (attendanceStatus === 'SL'){
            return 'SL';
        }
      }
      else{
         // mark as present
         if (attendanceStatus === 'P'){
          if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
            {
                return statusCode;
            }
            else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
              {
                return statusCode;
              }
              else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                {
                    return 'L';
                }
                else if (statusCode === 'A' || statusCode === 'Ab')
                  {
                      return 'Ab';
                  }
                  else if (statusCode === 'H' || statusCode === 'WO')
                    {
                        return 'H';
                    }
                    else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                      {
                          return 'P';
                      }
                      else
                      {
                        return 'P';
                      }

         }

      }
    }
    else if (BMHours < 8 && hour < 8){
      const currentDate = new Date();
      const options:any = { weekday: 'long' };  // You can also use 'short' for abbreviated day names
      const currentDay = currentDate.toLocaleDateString('en-US', options);

      if (currentDay === 'Saturday' || currentDay === 'Sunday'){

        if (BMHours <= 0 && hour <= 0)
          {
             return 'H';
          }
          else if (BMHours < 8 && hour <= 0){
            //3T -HA present with Exception
            if (attendanceStatus != 'P'){
              if (attendanceStatus === 'Ab')
                {
                    return 'Ab';
                }
                else if (attendanceStatus === 'HA'){
                  if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                    {
                        return 'HA';
                    }
                    else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                      {
                          return 'HA';
                      }
                      else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                        {
                            return 'L';
                        }
                        else if (statusCode === 'A' || statusCode === 'Ab')
                          {
                              return 'Ab';
                          }
                          else if (statusCode === 'H' || statusCode === 'WO')
                            {
                                return 'H';
                            }
                            else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                              {
                                  return 'HA';
                              }
                              else
                              {
                                  return 'HA';
                              }

                }
                else if (attendanceStatus === 'HL'){
                  if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                    {
                        return 'HL';
                    }
                    else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                      {
                          return 'HL';
                      }
                      else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                        {
                          return 'HL';
                        }
                        else if (statusCode === 'A' || statusCode === 'Ab')
                          {
                              return 'Ab';
                          }
                          else if (statusCode === 'H' || statusCode === 'WO')
                            {
                                return 'H';
                            }
                            else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                              {
                                 return 'HL';
                              }
                              else
                               {
                                return 'HL';
                               }

                }
                else if (attendanceStatus === 'SL'){
                   return 'SL';
                }

            }
            else{
              if (attendanceStatus == 'P'){
                if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                  {
                     return statusCode;
                  }
                  else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                    {
                      return statusCode;
                    }
                    else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                      {
                          return 'L';
                      }
                      else if (statusCode === 'A' || statusCode === 'Ab')
                        {
                            return 'Ab';
                        }
                        else if (statusCode === 'H' || statusCode === 'WO')
                          {
                              return 'H';
                          }
                          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                            {
                                return 'P';
                            }
                            else
                            {
                              return 'P';
                            }
              }
            }
          }
          else if (BMHours <= 0 && hour < 8){ 
            //BM -HA present with Exception
            if (attendanceStatus != 'P'){
              if (attendanceStatus === 'Ab'){
                return 'Ab';
              }
              else if (attendanceStatus === 'HA'){
                if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                  {
                      return 'HA';
                  }
                  else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                    {
                        return 'HA';
                    }
                    else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                      {
                          return 'L';
                      }
                      else if (statusCode === 'A' || statusCode === 'Ab')
                        {
                            return 'Ab';
                        }
                        else if (statusCode === 'H' || statusCode === 'WO')
                          {
                             return 'H';
                          }
                          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                            {
                                return 'HA';
                            }
                            else
                            {
                              return 'HA';
                            }
              }
              else if (attendanceStatus === 'HL'){
                if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                  {
                      return 'HL';
                  }
                  else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                    {
                        return 'HL';
                    }
                    else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                      {
                          return 'HL';
                      }
                      else if (statusCode === 'A' || statusCode === 'Ab')
                        {
                            return 'Ab';
                        }
                        else if (statusCode === 'H' || statusCode === 'WO')
                          {
                              return 'H';
                          }
                          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                            {
                                return 'HL';
                            }
                            else
                            {
                              return 'HL';
                            }

              }
              else if (attendanceStatus === 'SL'){
                return 'SL';

              }

            }
            else{
              if (attendanceStatus === 'P'){
                if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                  {
                      return statusCode;
                  }
                  else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                    {
                      return statusCode;
                    }
                    else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                      {
                          return 'L';
                      }
                      else if (statusCode === 'A' || statusCode === 'Ab')
                        {
                           return 'Ab';
                        }
                        else if (statusCode === 'H' || statusCode === 'WO')
                          {
                              return 'H';
                          }
                          else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                            {
                                return 'P';
                            }
                            else
                            {
                              return 'P';
                            }
              }
            }
          }
          else{
            if (attendanceStatus === 'HA'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                   return 'HA';
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                     return 'HA';
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                        return 'L';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                           return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'HA';
                          }
                          else
                            {
                              return 'HA';
                           }

            }
            if (attendanceStatus === 'HL'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return 'HL';
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                    return 'HL';
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                      return 'HL';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                            return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'HL';
                          }
                          else
                            {
                                return 'HL';
                             }


            }
            if (attendanceStatus === 'L'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return statusCode;
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                    return statusCode;
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                        return 'L';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                            return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return attendanceStatus;
                          }
                          else
                            {
                              return attendanceStatus;
                            }
            }
            if (attendanceStatus === 'P'){
              if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
                {
                    return statusCode;
                }
                else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                  {
                    return statusCode;
                  }
                  else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                    {
                        return 'L';
                    }
                    else if (statusCode === 'A' || statusCode === 'Ab')
                      {
                          return 'Ab';
                      }
                      else if (statusCode === 'H' || statusCode === 'WO')
                        {
                            return 'H';
                        }
                        else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                          {
                              return 'P';
                          }
                          else
                            {
                              return 'P';
                            }

            }
            if (attendanceStatus === 'Ab'){
              return attendanceStatus;

            }

          }

      }
      else{
        if (attendanceStatus === 'L' || attendanceStatus === 'HL' || attendanceStatus === 'SL'){
          if (attendanceStatus === 'L'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                  return statusCode;
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                  return statusCode;
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                      return 'L';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                        return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return attendanceStatus;
                        }
                        else
                        {
                          return attendanceStatus;
                        }

          }
          else if (attendanceStatus === 'HL'){
            if (statusCode === '½P' || statusCode === 'H½P' || statusCode === 'WO½P' || statusCode === '½PL½P' || statusCode === '½CL½P' || statusCode === '½LWP½P' || statusCode === '½SL½P' || statusCode === 'CL½P' || statusCode === 'SL½P' || statusCode === '½LWP' || statusCode === '½CLP')
              {
                  return 'HL';
              }
              else if (statusCode === '½SL' || statusCode === '½CL' || statusCode === '½PL' || statusCode === 'LWP')
                {
                    return 'HL';
                }
                else if (statusCode === 'CL' || statusCode === 'PL' || statusCode === 'SL')
                  {
                     return 'HL';
                  }
                  else if (statusCode === 'A' || statusCode === 'Ab')
                    {
                        return 'Ab';
                    }
                    else if (statusCode === 'H' || statusCode === 'WO')
                      {
                          return 'H';
                      }
                      else if (statusCode === 'P' || statusCode === 'WOP' || statusCode === 'HP')
                        {
                            return 'HL';
                        }
                        else
                        {
                          return 'HL';
                        }

          }
          else if (attendanceStatus === 'SL'){
            return 'SL';

          }

        }

      }
      

    }
    
    else{
      return 'H';
    }
    
  };



  