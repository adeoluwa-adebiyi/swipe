import { IERC20_Abi } from "../constants/abis";
import { ethers } from "ethers";
import Axios from "axios";

export const BEP20 = "0x38";
export const ERC20 = "0x1";
// export const BEP20 = "0x61";
// export const ERC20 = "0x3";

const appToken = "DIC9ZAV7NZNIWF28K7KR6HZJX16HXH4Z1E";

const USDTBEP20Address = "0x55d398326f99059ff775485246999027b3197955";
const USDTERC20Address = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const TRC20CAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const BEP20Abi = IERC20_Abi;
const ERC20Abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    }
];
const safeRequest = async (chain, callback) => {
    const switchEthChain = (chainId) => window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }], // chainId must be in hexadecimal numbers
    });

    try {
        // check if the chain to connect to is installed
        await switchEthChain(chain);
        return await callback();
    } catch (error) {
        if (error.code === 4902) {
            try {
                let chainParams = null;
                switch (chain) {
                    case BEP20:
                        chainParams = {
                            chainId: chain,
                            chainName: "Binance Smart Chain Mainnet",
                            rpcUrls: ['https://bsc-dataseed.binance.org'],
                        };
                        break;
                    case ERC20:
                        chainParams = {
                            chainId: chain,
                            chainName: "Ethereum Mainnet",
                            rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
                        };
                    default:
                        break;
                }
                const addResponse = await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        chainParams
                    ],
                });
                await switchEthChain(chain);
                await callback();
            } catch (addError) {
                console.error(addError);
            }
        } else {
            throw error;
        }
    }
}

const getContract = async (contractAddress, abi) => {
    await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider((window).ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    return contract;
}

export const payWithUSDTBEP = async (price, address) => {
    let contract;
    const pay = async () => {
        contract = await getContract(USDTBEP20Address, BEP20Abi)
        const trx = await contract.transfer(address, ethers.utils.parseUnits(price.toString(), "18"));
        trx.wait();
        return trx;
    }
    return await safeRequest(BEP20, async () => {
        try {
            return await pay();
        } catch (e) {
            console.log(e)
            if (e.code === "NETWORK_ERROR") {
                setTimeout(async () => {
                    await pay();
                }, 3000);
            }else{
                throw e;
            }
        }
    })
}

export const payWithUSDTERC = async (price, address) => {
    let contract;
    const pay = async () => {
        contract = await getContract(USDTERC20Address, ERC20Abi);
        const trx = await contract.transfer(address, ethers.utils.parseUnits(price.toString(), "6"));
        trx.wait();
        return trx;
    }
    return await safeRequest(ERC20, async () => {
        try {
            return await pay();
        } catch (e) {
            if (e.code === "NETWORK_ERROR") {
                setTimeout(async () => {
                    await pay();
                }, 3000);
            }else{
                throw e;
            }
        }
    })
}

export const payWithUSDTTRC = async (price, address) => {
    try {
        if (!tronWeb) {
            alert("You need to install TronLink to use this feature.");
            throw Error("TRONLINK_NULL");
        }
        if (tronWeb.fullNode.host !== "https://api.trongrid.io") {
            alert("TronLink network must be TronGrid Mainnet to use this feature.");
            throw Error("TRONGRID_NET_NOT_SELECTED");
        }
        const contract = await tronWeb.contract().at(TRC20CAddress);
        try {
            const response = await contract.transfer(address, ethers.utils.parseUnits(price.toString(), "6")).send();
            return response;
        } catch (e) {
            throw e;
        }
    } catch (e) {
        throw e;
    }
}

export const requestWalletConnection = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const response = await provider.send("eth_requestAccounts", []);
    return response;
}

export const getWalletBalance = async (walletAddress, token=appToken) => {
    const response = await Axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${token}`);
    return response.data.result;
}