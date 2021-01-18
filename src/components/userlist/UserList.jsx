import React, { Fragment, useContext } from 'react'
import { UserListContext } from '../../contexts/UserListContext'
import SingleUser from './SingleUser'
export default function UserList() {
  const [userList, setUserList] = useContext(UserListContext)

  return (
    <Fragment>
      <h2>Utilisateurs</h2>

      <ul>
        {userList.map((user, index) => (
          <SingleUser key={index} singleUser={user} />
        ))}
      </ul>
    </Fragment>
  )
}
