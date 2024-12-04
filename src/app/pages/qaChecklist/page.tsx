// 'use client'
import React from 'react';
import SideNav from '@/components/common/SideBar/sidebar';
import Header from '@/components/common/Header/header';
import Footer from '@/components/common/Footer/footer';
const QaChecklist = () => {

  return (
   
   <>
  <div className='app sidebar-mini ltr light-mode'>
  <div className='page'>
  <Header />
  
   <SideNav />

   <div className="main-content app-content mt-0">
    <div className="side-app">
      <div className="main-container container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card custom-card">
              <div className="card-header justify-content-between">
                <div className="card-title">
                  Web Application Testing Checklist
                </div>
              </div>
              <div className="card-body">
                <div className="QA-checklist">
                  <ol>
                    <li>
                    1.  Web page content should be correct without any spelling or
                      grammatical errors with correct formatting
                    </li>
                    <li>
                    2.  Correct name should be there for application, database,
                      directories, files, pages and URLs.
                    </li>
                    <li>3.   All the fields should be properly aligned.</li>
                    <li>4
                      Website should be responsive in all standard screen
                      resolution including mobile.
                    </li>
                    <li>5. Home link should be there on every single page.</li>
                    <li>6. Disabled fields should be grayed out.</li>
                    <li>7. Check for broken links and images.</li>
                    <li>
                     8. Confirmation message should be displayed for any kind of
                      update and delete operation.
                    </li>
                    <li>9. Tab order should work properly.</li>
                    <li>10. Scroll bar should appear only if required.</li>
                    <li>
                     11. If there is an error message on submit, the information
                      filled by the user should be there.
                    </li>
                    <li>12. Title should display on each web page.</li>
                    <li>
                    13. All fields (Textbox, dropdown, buttons, radio button etc)
                      should be accessible by keyboard shortcuts and the user
                      should be able to perform all operations by using
                      keyboard.
                    </li>
                    <li>14. No variable/setting values will be hardcoded.</li>
                    <li>15. All the mandatory fields should be validated.</li>
                    <li>16.
                      Asterisk sign should display for all the mandatory fields.
                    </li>
                    <li>17.
                      Test the numeric fields should not accept the alphabets
                      and proper error message should display.
                    </li>
                    <li>18.
                      Test the max length of every field to ensure the data is
                      not truncated.
                    </li>
                  
                    <li>19.
                      Test the pop up message (`This field is limited to 500
                      characters` ) should display if the data reaches the
                      maximum size of the field.
                    </li>
                    <li>20. Amount values should display in currency format.</li>
                    <li>21. Tested all binding for Null/Empty values.</li>
                    <li>22.
                      Test the Javascript is properly working in different
                      browsers (IE, Firefox, Chrome, safari and Opera).
                    </li>
                    <li>23.
                      Test to see what happens if a user deletes cookies while
                      in the site.
                    </li>
                    <li>24.
                      Test to see what happens if a user deletes cookies after
                      visiting a site.
                    </li>
                    <li>25.
                      Test all the data inside combo/list box is arranged in
                      chronological order.
                    </li>
                    <li>26.
                      Test the DB and service parameters if they are required or
                      not.
                    </li>
                    <li>27.
                      Test when the output is zero, the zero records should be
                      affected.
                    </li>
                    <li>28.
                      Verify the database names of QA, DEV and Production. The
                      names should be unique.
                    </li>
                    <li>29.
                      Verify the important information like password, credit
                      card numbers etc should display in encrypted format.
                    </li>
                    <li>30.
                      Verify to access the secured and non secured web pages
                      directly without login.
                    </li>
                    <li>31. Verify the cookies should not store passwords.</li>
                    <li>32.
                      Verify if, any functionality is not working, the system
                      should not display any application, server, or database
                      information. Instead, it should display the custom error
                      page.
                    </li>
                    <li>33.
                      Verify the user roles and their rights. For Example The
                      requestor should not be able to access the admin page.
                    </li>
                    <li>34.
                      Verify the session values are in an encrypted format in
                      the address bar.
                    </li>
                    <li>35.
                      Verify the cookie information is stored in encrypted
                      format.
                    </li>
                    <li>36. Verify the application for Brute Force Attacks.</li>
                    <li>37.
                      To determine the performance, stability and scalability of
                      an application under different load conditions.
                    </li>
                    <li>38.
                      Delete all un-used setting keys, code, data objects, files
                      and images.
                    </li>
                    <li>39. Check favicon is appearing or not.</li>
                    <li>40.
                      <b>
                        I have verified all the above checklist points and now
                        its ready for client review.
                      </b>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  <Footer />
  </div>
   </>
  );
  
};



export default QaChecklist;