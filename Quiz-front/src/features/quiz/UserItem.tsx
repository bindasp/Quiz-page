import { FC, memo } from 'react';
import '../styles/Forms.css';
import { TableTd, TableTr } from '@mantine/core';
import { deleteUser } from '../../fetchFunctions/deleteFunctions';

interface UserProps {
  id: number;
  login: string;
  email: string;
}

export const UserItem: FC<UserProps> = memo((item) => {
  const handleDeleteUser = async (id: number) => {
    deleteUser(id).then();
  };

  return (
    <TableTr key={item.login} onClick={() => handleDeleteUser(item.id)}>
      <TableTd>{item.login}</TableTd>
      <TableTd>{item.email}</TableTd>
    </TableTr>
  );
});
