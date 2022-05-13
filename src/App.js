import React,{useState,useEffect} from 'react';
import './App.css';
import Web3 from 'web3';
import DVideo from './abis/DTube.json'
import {TODO_LIST_ADDRESS,TODO_LIST_API} from './config'
import { create } from "ipfs-http-client";
import Navbar from './Navbar';
import Main from './Main';

const client = create('https://ipfs.infura.io:5001/api/v0');

function App() {
  const [web3, setWeb3] = useState()  
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState('')
  const [dvideos, setDvideos] = useState()
  const [videoCount, setVideoCount] = useState(0)
  const [videos, setVideos] = useState([])
  const [currentHash, setCurrentHash] = useState('')
  const [buffer, setBuffer] = useState(null)
  const [currentTitle, setCurrentTitle] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [load, setLoad] = useState(false)
  useEffect(() => {
      const loadWeb3 = async()=>{
        if(window.etherum){
          window.web3 = new Web3(window.etherum);
          await window.etherum.enable();
        }else if (window.web3){
            window.web3=new Web3(window.web3.currentProvider)
        }else{
          window.alert('Non-Etherum browser detected. You should consider trying MetaMask!')
        }
      }
      loadWeb3();
      const loadBlockChain = async()=>{
        const web3 = window.web3
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const networkId= await web3.eth.net.getId();
        // console.log('network id',DVideo.networks[5777])
         const networkData = DVideo.networks[networkId];
         if(networkData)
         {
           const dvideo= new web3.eth.Contract(DVideo.abi,networkData.address)
           setDvideos(dvideo);
           
            let vCount = await  dvideo.methods.videoCount().call();
            setVideoCount(vCount);
            //load video sort by latest                  
            for(var i=vCount;i>=1;i--){
              const vid= await dvideo.methods.Videos(i).call();
              setVideos(videos => [...videos,vid])             
            }
            //set latest video title to play default
            const latest = await dvideo.methods.Videos(vCount).call();
            setCurrentHash(latest.hash);
            setCurrentTitle(latest.title);
            setLoading(false)
            setLoad(false)

         }else{
           window.alert('DTube Contract not deployed to detected Network');
         }
              
      }
      loadBlockChain();
  }, [load])
  
  const captureFile=(e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = ()=>{
      setBuffer(Buffer(reader.result))
      
    }
  }
  const inputHandler =  (e)=>{
    e.preventDefault();
    setVideoTitle(e.target.value);    
  }
  const uploadVideo = async (title)=>{
    try{
      setLoading(true); 
      const created = await client.add(buffer);
      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
           
      dvideos.methods.uploadVideo(url,title).send({from : account}).on('transactionHash',(hash) => {setLoading(false);window.location.reload(true);;setVideos([]); console.log('uploaded')})
    }catch(error){
      console.log(error);
    }
    
  }
  const changeVideo=(hash,title)=>{
    setCurrentTitle(title);
    setCurrentHash(hash);
  }
  return (
    <div>
      <Navbar account={account}/>
      {loading ? <h1>Loading</h1> :<Main 
      captureFile={captureFile} 
      inputHandler={inputHandler}
      videoTitle={videoTitle}
      uploadVideo={uploadVideo}
      currentHash={currentHash}
      currentTitle={currentTitle}
      videos={videos}
      changeVideo={changeVideo}
      />
    }
    </div>
  );
}

export default App;
