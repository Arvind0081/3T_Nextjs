'use client';
import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ProjectDetails, ProjectModel, Technology } from '@/utils/types';
import { useForm } from 'react-hook-form';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import getUser from '@/utils/getUserClientSide';
const AddEditProjectForm = ({
    setShow,
    projectDetails,
    technologies,
    userprojectData,
}: any) => {
  

    const router = useRouter();
    const handleClose = () => {
        setShow(false);
        reset();
    };

    let user: any = getUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProjectDetails>();

    const handleRegistration = async (data: ProjectDetails) => {
        try {
    
            data.applicationUsersId = user.id;
            if (userprojectData) {
                await apiService.put(
                    '/UserProfile/UpdateUserWorkedProject',
                    data
                );
            } else {
                await apiService.post(
                    '/UserProfile/AddUserWorkedProject',
                    data
                );
            }

            router.refresh();

            handleClose();
        } catch (error) {
            console.error('Error occurred during Project registration:', error);
        }
    };

    useEffect(() => {
        if (userprojectData) {
            reset(userprojectData);
        }
    }, [userprojectData, reset]);

    return (
        <>
            <Offcanvas show={true} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        {' '}
                        {userprojectData
                            ? 'Edit Project You Have Done Or Doing'
                            : 'Add Project You Have Done Or Doing'}{' '}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form
                        className="status-repeat-box row m-0"
                        onSubmit={handleSubmit(handleRegistration)}
                    >
                        <div className="col-md-12 form-group">
                            <label htmlFor="projectsId">
                                Project
                                <span className="astrisk">*</span>
                            </label>
                            <select
                                id="projectsId"
                                className="form-control form-select select2"
                                {...register('projectsId', {
                                    required: 'Project is required',
                                })}
                            >
                                <option value="">Select a Project</option>
                                {projectDetails?.map((item: ProjectModel) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            {errors.projectsId && (
                                <div className="validation_error">
                                    <span role="alert">
                                        {errors.projectsId.message}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="col-md-12 form-group">
                            <label htmlFor="departmentId">
                                Technology
                                <span className="astrisk"></span>
                            </label>
                            <select
                                id="technology"
                                className="form-control form-select select2"
                                {...register('technology')}
                            >
                                <option value="">Select a technology</option>
                                {technologies?.map((item: Technology) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-12 form-group">
                            <label htmlFor="Country">
                                Svn url
                                <span className="astrisk"></span>
                            </label>
                            <input
                                id="svnUrl"
                                type="text"
                                className="form-control"
                                {...register('svnUrl')}
                            />
                        </div>
                        <div className="col-md-12 form-group">
                            <label htmlFor="liveUrl">
                                Live Url
                                <span className="astrisk"></span>
                            </label>
                            <input
                                id="liveUrl"
                                type="text"
                                className="form-control"
                                {...register('liveUrl')}
                            />
                        </div>

                        <div className="col-md-12 form-group">
                            <label htmlFor="localUrl">
                                Local Url
                                <span className="astrisk"></span>
                            </label>
                            <input
                                id="localUrl"
                                type="text"
                                className="form-control"
                                {...register('localUrl')}
                            />
                        </div>

                        <div className="col-md-12 form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                className="form-control h50"
                                {...register('description')}
                            ></textarea>
                        </div>

                        <div className="offcanvas-footer text-right">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary"
                            />
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default AddEditProjectForm;