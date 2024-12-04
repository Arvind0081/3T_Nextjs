'use client';

import React, { useState } from 'react';
import apiService from '@/services/apiService';
import {  UserToolbyId } from '@/components/common/constant';
import {  Technology } from '@/utils/types';
import AddToolForm from './addToolForm';

type Props = {
    id: string;
    technologies: Technology[];
    userTool:any
};

const EditToolButton = ({
    id,
    technologies,
    userTool
}: Props) => {
    const [show, setShow] = useState(false);
    const [toolData, setToolData] = useState(null);

    const EditUserProject = async () => {
        try {
           
            const data = await apiService.get(`${UserToolbyId}=${id}`);
            setToolData(data.model);
            setShow(true);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <>
            {show && (
                <AddToolForm
                    name="Edit project"
                    show={show}
                    setShow={setShow}
                    toolData={toolData}
                    id={id}
                    userTool={userTool}
                    technologies={technologies}
                />
            )}
            <button onClick={EditUserProject}>
                <i className="bi bi-pencil-square"></i>
            </button>
        </>
    );
};

export default EditToolButton;