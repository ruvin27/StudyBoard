import React, { useState } from "react";
import ChatCSS from "../assets/css/chat.module.css";
import "font-awesome/css/font-awesome.min.css";

const Chat = () => {
	const [isChatOpen, setIsChatOpen] = useState(false);

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
	};

	return (
		<div>
			{isChatOpen && (
				<div className={ChatCSS.chatContainer}>
					<div className={ChatCSS.chatHeader}>
						Instant Messaging
						<i className="fa fa-close" onClick={toggleChat}></i>
					</div>
					<div className={ChatCSS.chatMessages}>
						<div className={ChatCSS.message}>Alice: Hi there!</div>
						<div className={ChatCSS.message}>Bob: Hey, Alice! How are you?</div>
						<div className={ChatCSS.message}>Alice: I'm good, thanks. How about you?</div>
						<div className={ChatCSS.message}>Bob: I'm doing well too.</div>
						<div className={ChatCSS.message}>Alice: That's great to hear!</div>
					</div>
					<div className={ChatCSS.chatInput}>
						<input type="text" placeholder="Type your message..." />
						<button>Send</button>
					</div>
				</div>
			)}

			{!isChatOpen && (
				<button className={ChatCSS.toggleButton} onClick={toggleChat}>
					<i className="fa fa-commenting fa-2x"></i>
				</button>
			)}
		</div>
	);
};

export default Chat;
