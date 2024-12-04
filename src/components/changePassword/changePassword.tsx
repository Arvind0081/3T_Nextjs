import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import apiService from '@/services/apiService';
import { changePassword } from '../common/constant';
import { useRouter } from 'next/navigation';
import getUser from '@/utils/getUserClientSide';

type Props = {
  show: any;
  setShow: any;
  id: string;
};

const ChangePassword = ({ show, setShow}: Props) => {
  const router = useRouter();
  const [oldPassward, setoldPassward] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ oldPassward: '', newPassword: '', confirmPassword: '' });

  let user: any;
  try {
    user = getUser();
  } catch (error) {
    console.error('Error fetching user:', error);
    return <div>Error fetching user data</div>;
  }

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const resetForm = () => {
    setoldPassward('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({ oldPassward: '', newPassword: '', confirmPassword: '' });
  };

  const validate = () => {
    let valid = true;
    const errors = { oldPassward: '', newPassword: '', confirmPassword: '' };

    if (!oldPassward) {
      errors.oldPassward = 'Old password is required';
      valid = false;
    }

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

    let email = user.email;

    const data = {
      email,
      oldPassward,
      newPassword,
    };

    try {
      await apiService.post(`${changePassword}`, data);
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
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formoldPassward'>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type='password'
                value={oldPassward}
                onChange={(e) => setoldPassward(e.target.value)}
                isInvalid={!!errors.oldPassward}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.oldPassward}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formNewPassword'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isInvalid={!!errors.newPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formConfirmPassword'>
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!errors.confirmPassword}
              />
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
}

export default ChangePassword;
