import { useState, useEffect } from 'react';
import logo from '../../img/logo-temp.png'
import {
    connectWallet,
    getCurrentWalletConnected,
  } from "../../util/interact";
import {chainId} from '../../constants/address';


function Navbar() {
  const [walletAddress, setWallet] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    addWalletListener();
    setWallet(address);
  }, []);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
      }});
      window.ethereum.on("chainChanged", (chain) => {
        connectWalletPressed()
        if (chain !== chainId) {
        }
      });
    } else {
     console.log("console");
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);
  };
  return (
    <nav className="navbar navbar-expand-lg">
        <div className="logo-wrapper valign">
            <div className="logo">
                <a href="index.html">
                    <img src={logo} className="logo-img" alt="QTees-logo" />
                    <h2>Tees</h2>
                </a>
            </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
                <li className="">
                    <div className="butn-light"><a href="https://discord.gg/p8ZV5TKvRm" target="_blank"><span>Discord</span></a></div>
                </li>
                <li>
                    <div className="butn-light"><a href="https://www.twitter.com/qteesnft" target="_blank"><span>Twitter</span></a></div>
                </li>
            </ul>
        </div>
        <div className="butn-lightt">
            <a id="walletButton" onClick={connectWalletPressed}>
                <span>
                    {walletAddress.length > 0 ? (
                        "Connected: " +
                        String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)
                    ) : (
                        "Connect Wallet"
                    )}
                </span>
            </a>
        </div>
    </nav>
  )
}

export default Navbar