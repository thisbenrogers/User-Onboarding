import React from 'react';

const Users = (props) => {
  console.log(props.users);
  return (
    <div>
      {props.users.map(user => {
        return (
          <section key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>joined: {user.createdAt}</p>
          </section>
        )
      })}
    </div>
  )
}

export default Users;