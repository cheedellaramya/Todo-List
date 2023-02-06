import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Home = ({children}) => {
const [activity,setActivity]=useState('');
const [listData,setListData]=useState([]);
const [status,setStatus] = useState('Incomplete');
const [selectedId, setSelectedId] = useState(0);
// const [updatedStatus,setUpdatedStatus]=useState('');
const [data,setData]=useState([]);

const addActivty=()=>{
  console.log(activity,status);
  if(activity.length === 0){
    toast.error('Please enter title !');
    return false;
  }
  setData([...data,{activity:activity,status:status, id:(data.length+1)}])
  setListData([...listData, {activity:activity,status:status, id:(data.length+1)}]);
 
  toast.success('Toast added successfully!');
  //Reset existing state variables
  setActivity('');
  setStatus('Incomplete')
}

const deleteItem=(e)=>{
  const filterData= data.filter((data)=>data.id !== Number(e.target.id))
  setListData(filterData)
  setData(filterData)
}
const editItem=(e)=>{
 const item =  data.filter((d)=>d.id === Number(e.target.id))
  setActivity(item[0].activity);
  setStatus(item[0].status);
  setSelectedId(Number(e.target.id));
}
const filterStatus=(status)=>{
  if(status !== 'All'){
    setListData(data.filter((x)=>x.status === status))
    console.log(status)
  }else{
    setListData(data);
  }
}

const updateActivity = (id) =>{
  if(activity.length === 0){
    toast.error('Please enter title !');
    return false;
  }  
  data.forEach(item => {
    if(item.id === id){
      item.activity = activity;
      item.status = status;
    }
  })

  setData(data);
  setListData(data);
  toast('Toast Updated successfully!')
  setSelectedId(0);
  
  //Reset existing state variables
  setActivity('');
  setStatus('Incomplete')
}


  return (
    <>
      <p className='HomeTitle'>{children}</p>
      <div className='Header'>
          <button type="button" className="btn btn-primary"  
            data-toggle="modal" data-target="#addTaskModal">Add Task
          </button>
          <select className='dropdown'  id='status' onChange={(e)=>{filterStatus(e.target.value)}}>
                <option value='All' >All</option>  
                <option value='Incomplete'>Incomplete</option>
                <option value='Complete'>Complete</option>
          </select>
      </div>
      <div className=" Listview">
          {listData.length  === 0 ? <p className='text'>No Todos</p>:''}
          <ul className='row-wise' style={{'listStyle':'none'}}>
            {listData && listData.map((item,i)=>(

              <li className='List' key={item.id}>
                  
                <div>
                    <input className='check' type="checkbox" checked={item.status === 'Complete'? true : false}/>
                    {item.status==='Incomplete' && item.activity}
                    {item.status === 'Complete' && <s>{item.activity}</s>}
                  </div>
                  <div>
                    <button className='icons' id={item.id} onClick={(e)=>deleteItem(e)}>   
                      <i className="fa fa-trash" id={item.id} aria-hidden="true"></i>   
                    </button>
                    <button className='icons' id={item.id} onClick={(e)=>editItem(e)} 
                        data-toggle="modal" data-target="#addTaskModal" > 
                     <i className="fas fa-edit" id={item.id} ></i>  
                    </button>
                   </div> 
                
            </li>  
            ))}
              
          </ul>
      </div>
      <ToastContainer position='bottom-right' />
     



      <div className="modal" id="addTaskModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
             {selectedId !== 0 && <h5 className="modal-title">update TODO</h5>} 
             {selectedId === 0 &&  <h5 className="modal-title">ADD TODO</h5> }
            </div>
            <div className="modal-body">
              <p>Title</p>
              <input type='text' style={{'paddingRight':'10rem'}} value={activity} 
                onChange={(e)=>setActivity(e.target.value)}>
              </input>
              <p style={{'marginTop':'7px'}}>Status</p>
              <select value={status} style={{'paddingRight':'15rem'}} onChange={(e)=>setStatus(e.target.value)} >
                <option value='Incomplete'>Incomplete</option>
                <option value='Complete'>Complete</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-dismiss={activity.length > 0 ? 'modal' : ''}  
                 onClick={ selectedId  === 0 ? () => addActivty()  : () => updateActivity(selectedId)}> { selectedId  === 0 ? 'Add' : 'Updae' } Task</button>
              <button type="submit" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default Home;
