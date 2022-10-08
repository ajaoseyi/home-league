import logo from './logo.svg';
import './App.css';
import {  Table,Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import Firebase from './firebaseconfig';
import Item from 'antd/lib/list/Item';
import Lottie from 'react-lottie-player'
import Animation from './asset/119362-pendulum-loading.json'
import moment from 'moment';

import { CopyOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from 'antd';


function App() {

  const { Title, Text } = Typography;
  
  const [addModal, showAddModal]= useState(false)
  const [pair, setPair]= useState([{name:"", num:0}, {name:"", num:0}, {name:"", num:0},{name:"", num:0}])
  const [shuffleModal, showShuffleModal]= useState(false)
  const [loading, setLoading]= useState(false)
  const [samadPosition, setSamadPosition]= useState(0)
  const [tegaPosition, setTegaPosition]= useState(0)
  const [ridwanPosition, setRidwanPosition]= useState(0)
  const [najibPosition, setNajibPosition]= useState(0)
  const [tableData, setTableData]= useState([])
  const [data, setData]= useState(0)
  const [update, setUpdate]= useState(false)
  const [date, setDate]= useState(new Date)
  const [info, setInfo]= useState({})
  const [updatedLastBy, setUpdatedLastBy]= useState("")
  const { Option } = Select;


  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '1',
      dataIndex: '1',
      key: '1',
    },
    {
      title: '2',
      dataIndex: '2',
      key: '2',
    },
    {
      title: '3',
      dataIndex: '3',
      key: '3',
    },
    {
      title: '4',
      dataIndex: '4',
      key: '4',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: '6',
    },
  ];

useEffect(()=>{
 
  const getTodos = () => {
    setLoading(true)
    const getFromFirebase = Firebase.firestore().collection("leagues");
    getFromFirebase.onSnapshot((querySnapShot) => {
      const saveFirebaseTodos = [];
      querySnapShot.forEach((doc) => {
        saveFirebaseTodos.push(doc.data());
      });
      setData(saveFirebaseTodos[0].data);
    
      setInfo({last_updated:saveFirebaseTodos[0].last_updated, updated_by:saveFirebaseTodos[0].updated_by})
     let  table=[]
      saveFirebaseTodos[0].data?.sort((a,b)=>b.first - a.first)?.map((item)=>{table.push(
        {
          key: item?.first,
          name: item.name,
          points: item.points,
          1: item?.first,
          2: item?.second,
          3:item?.third,
          4:item?.fourth,
          
        },
      )})
      setTableData(table)
      setLoading(false)

    });
    
    
  };
  getTodos()
},[update])

const updateLeague=()=>{
  let arr=[...data]
 let newArr= []
 let tega =arr.filter((item)=>item?.name==="Tega")
 let samad =arr.filter((item)=>item?.name==="Samad")
 let najib =arr.filter((item)=>item?.name==="Najib")
 let ridwan =arr.filter((item)=>item?.name==="Ridwan")
if(tega){  if(tegaPosition===1){
     tega[0].points = tega[0].points+3; tega[0].first = tega[0].first+1;
  }
  else if(tegaPosition===2){
    tega[0].second=tega[0].second+1 ;tega[0].points= tega[0].points+2;
  }
  else if(tegaPosition===3){
    tega[0].third =tega[0].third+1 ; tega[0].points=tega[0].points+1;
  }
  else{
    tega[0].fourth = tega[0].fourth+1
  }
  newArr.push(tega[0])}
  if(ridwan){
    if(ridwanPosition===1){
      ridwan[0].points = ridwan[0].points+3; ridwan[0].first = ridwan[0].first+1;
   }
   else if(ridwanPosition===2){
    ridwan[0].second=ridwan[0].second+1 ;ridwan[0].points= ridwan[0].points+2;
   }
   else if(ridwanPosition===3){
    ridwan[0].third =ridwan[0].third+1 ; ridwan[0].points=ridwan[0].points+1;
   }
   else{
    ridwan[0].fourth= ridwan[0].fourth+1
   }
   newArr.push(ridwan[0])
  }
  if(najib){
    if(najibPosition===1){
      najib[0].points = najib[0].points+3; najib[0].first = najib[0].first++;
   }
   else if(najibPosition===2){
    najib[0].second=najib[0].second+1 ;najib[0].points= najib[0].points+2;
   }
   else if(najibPosition===3){
    najib[0].third =najib[0].third+1 ; najib[0].points=najib[0].points+1;
   }
   else{
    najib[0].fourth=najib[0].fourth+1
   }
   newArr.push(najib[0])
  }
  if(samad){
    if(samadPosition===1){
      samad[0].points = samad[0].points+3; samad[0].first = samad[0].first+1;
   }
   else if(samadPosition===2){
    samad[0].second=samad[0].second+1 ;samad[0].points= samad[0].points+2;
   }
   else if(samadPosition===3){
    samad[0].third =samad[0].third +1 ; samad[0].points=samad[0].points+1;
   }
   else{
    samad[0].fourth=samad[0].fourth+1
   }
   newArr.push(samad[0])

  }

 const payload ={
  last_updated:moment(date).format("Do of MMMM'YY hh:mm a"),
  updated_by:updatedLastBy,
  data:[...newArr]
 }

 Firebase.firestore().collection("leagues").doc("xRUDjIlIoEuRvw3ISKrb").set(payload)
.then(() => {
setNajibPosition(0);
setTegaPosition(0);
setRidwanPosition(0);
setSamadPosition(0);
showAddModal(false)
})
.catch((error) => {
  console.error("Error writing document: ", error);
});
}

const shuffleFunc=()=>{
showShuffleModal(true)

// program to get a random item from an array
let boys =[, "Ridwan", "Najib", "Tega","Samad"]
let pairs=[]


boys?.map((i)=>pairs.push({name:i,num: Math.floor(Math.random() * 1000000)}))

setPair(pairs.sort((a,b)=>b.num-a.num))

}
  return (
    <div className="App">
      {loading ?     
         <Lottie
        loop
        animationData={Animation}
        play
        style={{ width: 150, height: 150, margin:"auto" }}
      />:<div>
  <div className='flex justify-end my-6'>
      <Button onClick={()=>shuffleFunc()} className="mx-2"  >Shuffle</Button>
      <Button type="primary" onClick={()=>showAddModal(true)} className="mx-2" >Add points</Button>
      </div>
    

     <Table dataSource={tableData} columns={columns} />
     
     <Text><span className='font-medium text-base '>Update last by  </span>{info.updated_by}</Text>
      <br/>
     <Text><span className='font-medium text-base '>Updated at  </span> {info.last_updated}</Text>
     <Modal
        title="Update League table"
        centered
        open={addModal}
        
        onOk={() => updateLeague() }
        onCancel={() => {showAddModal(false);
        setNajibPosition(0);
       setRidwanPosition(0);
      setSamadPosition(0);
    setTegaPosition(0)}}
      >
         {/* <div className='flex '> <Title className='' level={5}>Position</Title>  <Title className='ml-3' level={5}>Name</Title> </div>  */}
  <div className='flex justify-between'>
    <div>
    <div className='flex my-2'><InputNumber value={samadPosition} onChange={(e)=> setSamadPosition(e)} min={1} max={4} />  <Title className='ml-4' level={5}>Samad</Title> </div> 
      <div  className='flex my-2'><InputNumber value={ridwanPosition} onChange={(e)=> setRidwanPosition(e)} min={1} max={4} />  <Title  className='ml-4' level={5}>Ridwan</Title> </div>
     <div className="flex my-2" > <InputNumber value={najibPosition} onChange={(e)=> setNajibPosition(e)} min={1} max={4}/>  <Title  className='ml-4' level={5}>Najib</Title> </div>
     <div className='flex my-2'><InputNumber value={tegaPosition} onChange={(e)=> setTegaPosition(e)} min={1} max={4}/>  <Title  className='ml-4' level={5}>Tega</Title> </div> 
    </div>
    <div>
    <Text className='mb-3'>Who is updating ?</Text>
    <Input.Group compact>
      <Select defaultValue="Who?" onChange={(e)=>{ setUpdatedLastBy(e)}}>
        <Option value="Samad">Samad</Option>
        <Option value="Tega">Tega</Option>
        <Option value="Ridwan">Ridwan</Option>
        <Option value="Najib">Najib</Option>
      </Select>
    </Input.Group>
    </div>
    </div>  

    
      </Modal>
      <Modal
        title="Picking Slot"
        centered
        open={shuffleModal}
        onOk={() => showShuffleModal(false)}
        onCancel={() => {showShuffleModal(false)}}
      >
         {/* <div className='flex '> <Title className='' level={5}>Position</Title>  <Title className='ml-3' level={5}>Name</Title> </div>  */}
     
        <div className='text-center'>
        <Title  className='ml-4' level={1}>{pair[0].name}</Title>
        <Title  className='ml-4' level={2}>{pair[1].name}</Title>
        <Title  className='ml-4' level={3}>{pair[2].name}</Title>
        <Title  className='ml-4' level={4}>{pair[3].name}</Title>
        </div>
      </Modal>
      </div> }
    
    </div>
  );
}

export default App;

