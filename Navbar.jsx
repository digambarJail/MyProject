const Nav = () => {
    return ( 
        <>
            <div className="navbar h-[70px] w-[100%] text-white flex justify-between items-center px-[3vw] py-[0] bg-gradient-to-b from-[#04003D] to-black">
                <div className="nav-left text-[27px]">
                    {/* <img src="revb.png" alt=""> */}
                    <h1>LOGO</h1>
                </div>
                
                <div className="nav-right flex justify-center items-center gap-[40px]">
                    <a href="#">Leaderboards</a>
                    <a href="#">Score</a>
                    <a href="#">Login</a>
                </div>
            </div>
        </>
     );
}

export default Nav;