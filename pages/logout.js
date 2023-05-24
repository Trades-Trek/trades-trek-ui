/** @format */
import React, { useEffect } from 'react';
import { userService } from '../services';

export default function Logout() {
  useEffect(() => {
    return userService.logout();
  }, []);
  return <div></div>;
}
