/* eslint-disable no-template-curly-in-string */
import * as React from "react";

import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import Button from "@mui/material/Button";

import { useOnceEffect } from "../components/common/CustomHook";
import UserContext from "../components/common/UserContext";

import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "Airdrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "string",
        name: "_hiddenMetadataUri",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "Mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cost1",
        type: "uint256",
      },
    ],
    name: "setcost1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cost2",
        type: "uint256",
      },
    ],
    name: "setcost2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hiddenMetadataUri",
        type: "string",
      },
    ],
    name: "setHiddenMetadataUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxLimitPerWallet",
        type: "uint256",
      },
    ],
    name: "setmaxLimitPerWallet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTxPhase1",
        type: "uint256",
      },
    ],
    name: "setMaxMintAmountPerTxPhase1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTxPhase2",
        type: "uint256",
      },
    ],
    name: "setMaxMintAmountPerTxPhase2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setRevealed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_sale",
        type: "bool",
      },
    ],
    name: "setSaleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_supplyLimit",
        type: "uint256",
      },
    ],
    name: "setsupplyLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "seturi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uriSuffix",
        type: "string",
      },
    ],
    name: "setUriSuffix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hiddenMetadataUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxLimitPerWallet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmountPerTxPhase1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmountPerTxPhase2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "revealed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sale",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "supplyLimitPhase1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "tokensOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uriSuffix",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const style = {
  section: {
    backgroundColor: "#FFE3E1",
    display: "flex",
  },
  gird: {
    paddingBottom: "20px",
  },
  h2: {
    color: "#ad333c",
    font: "normal normal normal 30px/1.35em 'rozha one', serif",
    textAlign: "center",
    marginBottom: 0,
  },
  h1: {
    color: "#d32f2f",
    font: "normal normal normal 40px/1.35em 'rozha one', serif",
    textAlign: "center",
    margin: 0,
  },
  img: {
    width: "20%",
    borderRadius: "10px",
  },
  p: {
    color: "#ad333c",
  },
  box: {
    display: "block",
  },
  sidebar: {
    backgroundColor: "#f4c6c3",
    padding: "10px",
    maxHeight: "535px",
    overflowY: "scroll",
  },
  nftbox: {
    // minHeight: "300px",
  },
  nftImage: {
    width: "100%",
    borderRadius: "10px",
  },
};

const CONTRACT_ADDRESS = "0xC6d042959268B9d1E0fe06789C0De073a741788c";

const IPFS_URL =
  "https://nftstorage.link/ipfs/bafybeicwckttgzbwgeqcyiufr2gr5mbhpndprrpkhangbjd6wxiyssfqxy/";

const TOTAL = 5555;

export default function Contact() {
  const userContext = React.useContext(UserContext);

  const [nfts, setNfts] = React.useState([]);

  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [tx, setTx] = React.useState({});
  // const [totalValue, setTotalValue] = React.useState(0);

  useOnceEffect(() => {
    userContext.setIsMintPage(true);
    getTotalSupply();
    // getTotalValue();
    setLoading(false);
  }, []);

  // Fetch data from contract
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  useOnceEffect(() => {
    getNftsOfCurrentWallet();
    if (!userContext.connected) {
      setMessage("You must connect the wallet");
      // console.log(1);
    } else if (nfts.length) setMessage("My NFT");
  }, [userContext.connected, tx, nfts]);

  // Get total supply of tokens from smart contract
  async function getTotalSupply() {
    try {
      const data = await contract.totalSupply();

      setTotalMinted(data.toNumber());
    } catch (error) {
      console.log(error);
    }
  }

  // Get total value collected by the smart contract
  // async function getTotalValue() {
  //   try {
  //     const data = await contract.getBalance();

  //     setTotalValue(ethers.utils.formatEther(data).toString());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Get NFTs owned by current wallet
  async function getNftsOfCurrentWallet() {
    if (!hasEthereum()) return;

    try {
      const address = await signer.getAddress();
      // For each token owned, get the tokenId
      const tokenIds = await contract.tokensOfOwner(address);

      setNfts(tokenIds);
      // if (tokenIds.length) setMessage("My NFT");
    } catch (error) {
      console.log(error);
    }
  }

  // Mint NFTs owned by current wallet
  async function mintNft() {
    if (!hasEthereum()) return;

    try {
      let tx = await contract.connect(signer).Mint(1, {
        value: ethers.utils.parseEther("0.11"),
        gasLimit: "3000000",
      });
      setTx(tx);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    console.log("clicked");
    mintNft();
  };
  return (
    <Grow in={true}>
      <section style={style.section}>
        {/* <Grid container> */}
        <Grid
          container
          justifyContent="center"
          direction="column"
          style={style.box}
          item
          xs={10}
        >
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <h1 style={style.h2}>
              {loading ? "Loading..." : `${totalMinted}/${TOTAL}`}
            </h1>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <img alt="logo" src="../img/mint-logo.gif" style={style.img} />
          </Grid>
          <Grid
            container
            item
            xs={6}
            justifyContent="center"
            style={style.gird}
          >
            <p style={style.p}>
              The launch of 5,555 Handy Meta Girls NFT to whitelisted members
              and to the public.
            </p>
          </Grid>
          <Grid
            container
            item
            xs={4}
            justifyContent="center"
            style={style.gird}
          >
            <Button
              variant="contained"
              color="error"
              disabled={!userContext.connected}
              onClick={handleClick}
            >
              Mint Now
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={2}
          style={style.sidebar}
          justifyContent="center"
          alignItems="center"
          className="scrollbar"
        >
          <Grid item xs={10}>
            <h1 style={style.h1}>{message}</h1>
          </Grid>
          {userContext.connected && nfts.length ? (
            <Grid container item xs={6}>
              {nfts.map((nft) => (
                <Grid
                  item
                  xs={12}
                  style={style.nftbox}
                  key={parseInt(nft._hex)}
                >
                  <h2 style={style.h2}>{parseInt(nft._hex)}</h2>
                  <img
                    alt={nft._hex}
                    src={`${IPFS_URL}${parseInt(nft._hex)}.png`}
                    style={style.nftImage}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        {/* </Grid> */}
      </section>
    </Grow>
  );
}
