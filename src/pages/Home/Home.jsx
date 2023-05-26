import "./Home.css";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const Home = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showProfile, setShowProfile] = useState(false);

	const handleShowMenu = () => setShowMenu(true);
	const handleCloseMenu = () => setShowMenu(false);

	const handleShowProfile = () => setShowProfile(true);
	const handleCloseProfile = () => setShowProfile(false);
	
	return (
		<>
			<div className="home-container">
				<div className="left-side">
					<div className="sidebar">
						<div className="icon-container">
							<div className="logo"></div>
							<img src="/icons/tools.svg" alt="tools" />
							<img src="/icons/chat.svg" alt="chat" />
							<img src="/icons/option.svg" alt="option" />
						</div>
						<div className="logout-container">
							<img src="/icons/logout.svg" alt="logout" />
						</div>
					</div>
					<div className="chat-list-container">
						<img src="/icons/user.svg" alt="user" onClick={handleShowProfile} />
						<form>
							<input type="search" placeholder="Search" />
						</form>
						<div className="chatbox">
							<div className="user-image"></div>
							<div className="chatbox-detail">
								<h4>Reyhan</h4>
								<p>Hey, kabarmu gimana?</p>
							</div>
						</div>
						<div className="chatbox">
							<div className="user-image"></div>
							<div className="chatbox-detail">
								<h4>Andri</h4>
								<p>Nanti jadi jam berapa?</p>
							</div>
						</div>
					</div>
				</div>
				<div className="right-side">
					<div className="topbar">
						<div className="profile-topbar">
							<div className="profile-topbar-img"></div>
							<div className="profile-topbar-detail">
								<h4>Reyhan</h4>
								<p>Online</p>
							</div>
						</div>
						<div className="topbar-menu">
							<img src="/icons/search.svg" alt="search" />
							<img src="/icons/menu.svg" alt="menu" onClick={handleShowMenu} />
						</div>
					</div>
				</div>
				<Offcanvas show={showMenu} onHide={handleCloseMenu} placement="end" backdrop={false}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Profile</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className="profile-lawan-container">
							<div className="profile-lawan-img"></div>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
				<Offcanvas show={showProfile} onHide={handleCloseProfile} backdrop={false}>
					<Offcanvas.Header closeButton>
						<Offcanvas.Title>Profile</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<div className="profile-lawan-container">
							<div className="profile-lawan-img"></div>
						</div>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		</>
	);
};

export default Home;
