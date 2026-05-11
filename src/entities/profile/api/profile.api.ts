import axios from '@/shared/lib/axios';

interface ChangeProfileRequest {
  currentPassword?: string;
  newPassword?: string;
  file?: File | null;
}

export const patchChangeProfile = async (data: ChangeProfileRequest) => {
  const formData = new FormData();

  if (data.currentPassword) {
    formData.append('currentPassword', data.currentPassword);
  }

  if (data.newPassword) {
    formData.append('newPassword', data.newPassword);
  }

  if (data.file) {
    formData.append('file', data.file);
  }

  return axios.patch('/users/me', formData);
};