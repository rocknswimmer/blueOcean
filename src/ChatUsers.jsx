import React, {useState} from 'react';
import styled from 'styled-components';

const ChatUsers = function ({users, currentUser}) {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  return (
    <UsersContainer>
      <h2>Contacts</h2>
      <div className="friendsList">
        {users.map((user, idx) => {
          return(
            <div key={idx} className="users"> {user}</div>
          )
        })}
      </div>
      <div className="currentChatUser"></div>
    </UsersContainer>

  )
};

const UsersContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #2D5D7B;
  // .birder-logo {
  //   display: flex;
  //   align-items: center;
  //   gap: 1rem;
  //   justify-content: center;
  // }
  .friendsList {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .users {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;
      transition: 0.5s ease-in-out;
    }
    .currentChatUser {
      background-color: blue;
    }
  }

`;

export default ChatUsers;