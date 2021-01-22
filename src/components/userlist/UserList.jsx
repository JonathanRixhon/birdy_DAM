import React, { Fragment, useContext } from 'react'
import { UserListContext } from '../../contexts/UserListContext'
import SingleUser from './SingleUser'
import '../../styles/userList.css'
export default function UserList(props) {
  const [userList, setUserList] = useContext(UserListContext)

  return (
    <main className='userList'>
      <h2>Utilisateurs</h2>

      <ul>
        {userList.map((user, index) => (
          <SingleUser key={index} singleUser={user} />
        ))}
      </ul>
    </main>
  )
}
