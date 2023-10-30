import 'font-awesome/css/font-awesome.min.css'

import ChatCSS from '@assets/css/chat.module.css'
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import { useEffect, useState } from 'react'

const Chat = () => {
  const { socket, user } = useAuth()

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isUserView, setIsUserView] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredUsernames = users.filter((username) =>
    username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  const toggleUserView = (username) => {
    if (isUserView) {
      setCurrentUser(username)
    } else {
      setCurrentUser('')
    }
    setIsUserView(!isUserView)
    setMessages([])
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const response = await apiClient.get(`/chat/users.php`)
          const filteredOtherUsers = response.data.filter((userData) => {
            const userEmail = user.email.trim().toLowerCase();
            const userDataEmail = userData.trim().toLowerCase();
            return userDataEmail !== userEmail;
          })
          setUsers(filteredOtherUsers)
        } catch (error) {
          console.error('Error fetching users:', error)
        }
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          const response = await apiClient.post(`/chat/getmessages.php`, {
            sender: user.email,
            receiver: currentUser,
          })
          const newMessages = response.data.map((data) => {
            return {
              sender: data.sender,
              message: data.message,
            }
          })

          // Update the messages state with the new messages
          setMessages((prevMessages) => [...prevMessages, ...newMessages])
        } catch (error) {
          console.error('Error fetching chat:', error)
        }
      }
    }

    fetchData()
  }, [currentUser, user.email])

  useEffect(() => {
    if (socket) {
      socket.on('new_message', (data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: data.sender,
            message: data.message,
          },
        ])
      })
    }
  }, [socket])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() === '') {
      return // Don't send empty messages
    }

    // Send message to the server
    socket.emit('send_message', {
      sender: user.email,
      receiver: currentUser,
      message: message,
    })

    // Update the messages state with your own message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: 'You',
        message: message,
      },
    ])
    await apiClient
      .post(`/chat/storemessage.php`, {
        sender: user.email,
        receiver: currentUser,
        message: message,
      });
      

    // Clear the input field
    setMessage('')
  }

  return (
    <div>
      {isChatOpen && (
        <div className={ChatCSS.chatContainer}>
          <div className={ChatCSS.chatHeader}>
            {!isUserView && (
              <div>
                <i className="fa fa-arrow-left" onClick={toggleUserView}></i>
              </div>
            )}
            {isUserView ? (
              <div>Instant Messaging</div>
            ) : (
              <div>{currentUser}</div>
            )}
            <div>
              <i className="fa fa-close" onClick={toggleChat}></i>
            </div>
          </div>
          {!isUserView ? (
            <div>
              <div className={ChatCSS.chatMessages} id="messages">
                {messages.map((msg, index) => (
                  <div key={index} className={ChatCSS.message}>
                    <b
                      style={{ color: msg.sender === 'You' ? 'blue' : 'green' }}
                    >
                      {msg.sender}:
                    </b>{' '}
                    {msg.message}
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => sendMessage(e)}>
                <div className={ChatCSS.chatInput}>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          ) : (
            <div className={ChatCSS.userListCard}>
              <div className={ChatCSS.searchBar}>
                <input
                  type="text"
                  placeholder="Search usernames"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <ul className={ChatCSS.userList}>
                {filteredUsernames.map((username, index) => (
                  <li onClick={() => toggleUserView(username)} key={index}>
                    {username}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!isChatOpen && (
        <button className={ChatCSS.toggleButton} onClick={toggleChat}>
          <i className="fa fa-commenting fa-2x"></i>
        </button>
      )}
    </div>
  )
}

export default Chat
