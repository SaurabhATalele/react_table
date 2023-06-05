
import Tables from "./Components/Tables";
import './App.css'
import data from './data.json'


const columns =  [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
      },
     
    ]





export default function Home() {

  return ( 
    
  
      
      <div className="container" >
       <Tables tableData={data} cols={columns}/>

       
      </div>
    
  );
}