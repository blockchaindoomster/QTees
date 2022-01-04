import { useState, useEffect } from 'react'
import {
    connectWallet,
    getCurrentWalletConnected,
  } from "../../util/interact";
import {chainId, contractAddress} from '../../constants/address';
import { ethers } from 'ethers'
import Web3 from "web3";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import logo from '../../img/logo-temp.png'
import mainBG1 from '../../img/bg/main-bg-1.jpg'
import mainBG2 from '../../img/bg/main-bg-2.jpg'

function Slider() {
    const [walletAddress, setWallet] = useState("");
    const [mintLoading, setMintLoading] = useState(false)
    const [bearNumber, setBearNumber] = useState(1)
    const [currentTotal, setCurrentTotal] = useState(0)

    useEffect(async () => {
        const { address, status } = await getCurrentWalletConnected();
        addWalletListener();

        window.web3 = new Web3(window.ethereum)
        const contractABI = require("../../constants/contract-abi.json")
        const contract = new window.web3.eth.Contract(contractABI, contractAddress)
        
        const totalSupply = await contract.methods.totalSupply().call()
        setCurrentTotal(totalSupply)
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

        const contractABI = require("../../constants/contract-abi.json")
        const contract = new window.web3.eth.Contract(contractABI, contractAddress)

        const totalSupply = await contract.methods.totalSupply().call()
        setCurrentTotal(totalSupply)
    };


    const onMintPressed = async () => {
        if(!walletAddress) {
            toast.info('Please connect wallet first!', {
            position: "top-right",
            autoClose: 3000,
            // hideProgressBar: true,
            })
            return
        }
        setMintLoading(true)

        const contractABI = require("../../constants/contract-abi.json")
        window.web3 = new Web3(window.ethereum)
        const contract = new window.web3.eth.Contract(contractABI, contractAddress)

        const totalSupply = await contract.methods.totalSupply().call()
        setCurrentTotal(totalSupply)

        if((10100 - totalSupply) < bearNumber) {
            toast.error('Please check remain total supply!', {
            position: "top-right",
            autoClose: 3000,
            // hideProgressBar: true,
            })
            setMintLoading(false)
            return
        }

        if(bearNumber === 0) {
            setMintLoading(false)
            return
        }

        const balance = await contract.methods.balanceOf(walletAddress).call()
        if(bearNumber > 10 - balance) {
            toast.error(<div>You already have {balance} QTees.<br />You are able to mint 10 QTees max!</div>, {
            position: "top-right",
            // autoClose: 3000,
            // hideProgressBar: true,
            })
            setMintLoading(false)
            return
        }
        var mintArr = []
        var tokenURI = []

        for(var i=0; i< bearNumber; i++) {
            var num = getRndInteger(1, 10100) //getRndInteger(500, 10000)
            var ImgStatus = await contract.methods.ImgStatus(num).call()

            if (!ImgStatus && !mintArr.includes(num)) {
            mintArr.push(num)
            } else {
            num = getRndInteger(1, 10100) //getRndInteger(500, 10000)
            ImgStatus = await contract.methods.ImgStatus(num).call()

            while(ImgStatus || mintArr.includes(num)) {
                num = getRndInteger(1, 10100) //getRndInteger(500, 10000)
                ImgStatus = await contract.methods.ImgStatus(num).call()
            }
            mintArr.push(num)
            }
            // var pinataResponse = getMultiHash(num)
            tokenURI.push(num.toString())
        }

        const price = await contract.methods.price(bearNumber).call()
        const amountIn = ethers.BigNumber.from(price.toString()).toHexString();

        let ABI = ["function mintPack(string[] memory tokenURI, uint256[] memory mintedImg)"]
        let iface = new ethers.utils.Interface(ABI)
        let dataParam = iface.encodeFunctionData("mintPack", [tokenURI, mintArr])

        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: walletAddress, // must match user's active address.
            data: dataParam,
            value: amountIn
            }

        contract.events.MintPack({toblock: 'latest'}, async (error, event) => {
            const totalSupply = await contract.methods.totalSupply().call()
            setCurrentTotal(totalSupply)
        })

        try {
            window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
            })
            .then(async(data)=>{
            contract.on("MintPack(address,uint256)", async(to, newId) => {
                setMintLoading(false)
                const totalSupply = await contract.methods.totalSupply().call()
                setCurrentTotal(totalSupply)
            })
            setBearNumber()
            })
            .catch(async(error) => {
            setMintLoading(false)
            })
        } catch (error) {
            setMintLoading(false)
        }
    }

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

  return (
    <>
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
        <header className="header slider-fade">
            <div className="col-md-7 offset-md-5 mintAr">
                <h2><span className="totalMinted">Total Minted: </span> {currentTotal} / 10100</h2>
                <div>
                    <h2>
                        <span className="amount">Amount: </span>
                        <span>
                            <span className="mintAddBtn mt-30 mb-30 ml-30" onClick={() => (bearNumber > 1) && setBearNumber(bearNumber - 1)}>-</span>
                            <span>{bearNumber}</span>
                            <span className="mintAddBtn mt-30 mb-30 ml-30" onClick={() => (bearNumber < 10) && setBearNumber(bearNumber + 1)}>+</span>
                            <span className="mintAddBtn mt-30 mb-30 ml-30" onClick={() => setBearNumber(10)}>max</span>
                        </span>
                    </h2>
                </div>
                { mintLoading?
                    "Loading.."
                    :
                    <div className="butn-light mt-30 mb-30"><a href="#" onClick={onMintPressed}><span>Mint</span></a></div>
                }
            </div>
            
            <div className="owl-carousel owl-theme">
                <div className="text-right item bg-img" data-background={mainBG1}>
                    <div className="v-middle caption mt-30" style={{top: '40%'}}>
                        <div className="" style={{right: '10%', position: 'relative'}}>
                            <div className="row">
                                <div className="col-md-7 offset-md-5">
                                    <h1>Q TEES</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right item bg-img" data-background={mainBG2}>
                    <div className="v-middle caption mt-30" style={{top: '40%'}}>
                        <div className="" style={{right: '10%', position: 'relative'}}>
                            <div className="row">
                                <div className="col-md-7 offset-md-5">
                                    <h1>Innovate NFT's</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-corner"></div>
            <div className="hero-corner3"></div>
            <div className="hero-corner4"></div>

            <div className="d-md-none d-flex mt-5">
                <div className="col-10 m-auto text-center">
                    <div className="d-inline-block">
                        <div className="butn-light"><a href="https://discord.gg/p8ZV5TKvRm" target="_blank"><span>Discord</span></a></div>
                    </div>
                    <div className="d-inline-block">
                        <div className="butn-light"><a href="https://www.twitter.com/qteesnft" target="_blank"><span>Twitter</span></a></div>
                    </div>
                </div>
            </div>
        </header>
        <ToastContainer pauseOnFocusLoss={false}/>
    </>
  )
}

export default Slider