import React, {useEffect} from 'react';

import {Link, useLocation} from 'react-router-dom'

import "./Navbar.css"

import PP from "./pp.png"

function Navbar(){
    // Gets the current route from react-router-dom
    const location = useLocation() 

    useEffect(() => {
        var route = (location.pathname).replace(/-/g, " ");
        route = route.split("/")
        route = route[1]

        var links = document.getElementsByClassName("navbar-link")

        for (var i = 0; i < links.length; i++){
            if (links[i].textContent.toLowerCase() === route){
                links[i].classList.add("active")
            }
            else{
                links[i].classList.remove("active")
            }
        }

    })
    
    return(
        <div className="navbar-div">
            <div className="navbar-inner-div">
                <div className="profile-div">
                    <div style={{height: "200px"}}/>
                    <img width="250" src="https://firebasestorage.googleapis.com/v0/b/social-media-59b42.appspot.com/o/pp.png?alt=media&token=36667df3-4305-4c38-b98b-d685130f4c95"></img> 
                    {/* <div className="navbar-profile-picture"></div>
                     */}
                </div>
                <div className="navlinks-holder">
                    <div className="navlinks-container">
                        <Link to="/dashboard" className="navbar-link active">
                            <div style={{width: "30px"}}></div>
                            Dashboard
                        </Link>
                        <Link to="/order" className="navbar-link"> 
                            <div style={{width: "30px"}}></div>
                            Order
                        </Link>
                        <Link to="/history" className="navbar-link">
                            <div style={{width: "30px"}}></div>
                            History
                        </Link>
                        <Link to="/map" className="navbar-link">
                            <div style={{width: "30px"}}></div>
                            Map
                        </Link>
                        <Link to="/driver" className="navbar-link">
                            <div style={{width: "30px"}}></div>
                            Driver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}


// class Navbar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }

//     // componentDidMount(){
//     //     let location = useLocation();
//     //     console.log(location.pathname);
//     // }

//     render() { 
//         return (
//         <div className="navbar-div">
//             <div className="profile-div">
//                 <div className="navbar-profile-picture"></div>
//                 <div className="navbar-profile-name">Dr. Makrizi</div>
//             </div>
//             <div className="navlinks-holder">
//                 <div className="navlinks-container">
//                     <Link to="/dashboard" className="navbar-link">
//                         Dashboard
//                     </Link>
//                     <Link to="/my-patients" className="navbar-link"> 
//                         My Patients
//                     </Link>
//                     <Link to="/clinics" className="navbar-link">
//                         Clinics
//                     </Link>
//                     <Link to="/analytics" className="navbar-link">
//                        Analytics
//                     </Link>
//                     <Link to="/settings" className="navbar-link">
//                        Settings
//                     </Link>
                    
//                 </div>
//             </div>
//         </div>
//         );
//     }
// }

export default Navbar;