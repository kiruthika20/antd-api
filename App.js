

import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Modal, Button, Input, Form,Space} from 'antd';
import {DeleteOutlined, EditOutlined,LoadingOutlined} from "@ant-design/icons";
import axios from 'axios';
import { Spin, Alert } from 'antd';
import Loader from './loader'




function App() {

  const [visible, setVisible] = useState(false);
  const[isloading,loading]=useState(true)
 
  const [body, setBody] = useState({
    title:"",body:""});
  const [data, setData] = useState([]);
  const [titlename,setTitlename] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const [itemInput, setItemInput] = useState({
    body:"",title:""
  });


	// const apiGet=() => {
		
	// 		fetch("https://jsonplaceholder.typicode.com/posts")
	// 		.then((res) =>res.json())
	// 		.then((json)=>{console.log(json);
	// 			setData(json);
	// 		})
			
	// };

	useEffect(()=>{
		apiGet();
	},[]);
  
 const apiGet=async ()=>{
   try
   {
     const data=await axios.get("https://jsonplaceholder.typicode.com/posts").then(res=>{
       console.log(res.data);
       setData(res.data);
       loading(true);
     });
    }catch(e){
      console.log(e);
    }
   }
 
   const setItem =(datas)=> {
    setVisible(true);
    if (id !== null && id !== '' && id !== undefined ) {
      data[id].title =  itemInput.title;
      data[id].body =  itemInput.body;
      fetch('http://localhost:3019/post2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
      })
        .then(data => data.json())       
     }
      handleReset();
    }
    
  

 const handleSubmit = (e) => {
    setItem(itemInput)

   e.preventDefault(); 
 
  handleReset();
  
};

  const handleReset = ()=>{
    setVisible(false);
    setBody('');
    setTitle('');
    setId('');
  }
  // const deleteRow = (id) => {
  //   setData(data.filter((x, i) => i !== id));
  // };
  const editRow = (record,ID) => {
   
    setTitlename('Edit ');
    setVisible(true);
   const { body,title } = record;
   setId(ID);
   setTitle(title);
   setBody(body);
   

  };


  const handleCancel = () => {
    handleReset();
  };
  
   
    
    
      

   
     const dataSource = (data) => [
      data.map((data)=>
        ({
          key:data.id,
          userId:data.userId,
          id:data.id,
          title:data.title,
          body:data.body,
        }))]		
      


	const columns = [
		{
		  title: 'UserId',
		  dataIndex: 'userId',
		  key: 'userId',
		},
		  {
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		  },
		  
			{
			  title: 'Title',
			  dataIndex: 'title',
			  key: 'title',
			},
			{
			  title: 'Body',
			  dataIndex: 'body',
			  key: 'body',
			},
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, ID) => (
       <div>
       <Space>
        <EditOutlined  onClick={() => editRow(record,ID)}/>
        <DeleteOutlined />
        </Space>
    </div> 

        
      ),
    },
  ];
  function handleChange(evt) {
    const value = evt.target.value;
    setItemInput({
      ...itemInput,
      [evt.target.name]: value
    });
  }
  return (
    <div>
     
        <Table dataSource={data} columns={columns} />}
    
   
        
      <Modal
        visible={visible}
        title={titlename}
        width={1350}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
            </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
            </Button>
        ]}

      >
      <Form>
    
       
       
      <Form.Item label="title">
     <Input
          type="text"
          name="title"
          value={itemInput.title}
          placeholder="title"
          onChange={handleChange}
        />
        </Form.Item>
      <Form.Item label="body">
    
        <Input
          type="text"
          name="body"
          value={itemInput.body} 
          placeholder="body..."
          
          onChange={handleChange} 
        />
     
     </Form.Item>
    
        
         
        </Form>
      </Modal>
     
    </div>
  );
}
export default App;
