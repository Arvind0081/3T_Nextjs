'use client';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form, InputGroup } from 'react-bootstrap';
import apiService from '@/services/apiService';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/components/common/constant';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    employeeID: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
};

const ResetPassword = ({ show, setShow, data }: Props) => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
  const [showNewPassword, setShowNewPassword] = useState(false); // State for new password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  // Reset the form fields when the modal opens
  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  const resetForm = () => {
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ newPassword: '', confirmPassword: '' });
  };

  const validate = () => {
    let valid = true;
    const errors = { newPassword: '', confirmPassword: '' };

    if (!newPassword) {
      errors.newPassword = 'New password is required';
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const requestData = {
      id: data.employeeID,              
      email: data.email,          
      password: newPassword,    
      confirmPassword: confirmPassword, 
    };

    try {
      await apiService.post(`${resetPassword}`, requestData);
      router.refresh();
      setShow(false);
      resetForm();
    } catch (error) {
      console.error('Failed to change password', error);
    }
  };

  return (
    <>
      <Modal show={show} backdrop='static' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={data.email}
                readOnly
                disabled
              />
            </Form.Group>

            <Form.Group controlId='formNewPassword'>
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'} // Toggle password visibility
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  isInvalid={!!errors.newPassword}
                />
                <InputGroup.Text onClick={() => setShowNewPassword(!showNewPassword)} style={{ cursor: 'pointer' }}>
                  {showNewPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type='invalid'>
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label>Confirm New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle password visibility
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  isInvalid={!!errors.confirmPassword}
                />
                <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                  {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback type='invalid'>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResetPassword;
