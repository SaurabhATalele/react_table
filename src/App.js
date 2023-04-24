
import Tables from "./Components/Tables";
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css'


const columns = [

 
  { Header: "First Name", accessor: "first_name"},
  { Header: "Last Name", accessor: "last_name"},
  { Header: "Email", accessor: "email"},
  { Header: "Gender", accessor: "gender"},
  { Header: "Income", accessor: "income"},
  { Header: "City", accessor: "city"},
  { Header: "Car", accessor: "car"},
  { Header: "Quote", accessor: "quote"},
  { Header: "Phone Price", accessor: "phone_price"},
  
];

const query5columns = [

  { Header: "City", accessor: "_id" },
  { Header: "Count", accessor: "count"},
  { Header: "Average Income", accessor: "avg_income"},
  
  
];



export default function Home() {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const [rows, setRows] = useState(10);

  const [query1, setQuery1] = useState([]);
  const [query2, setQuery2] = useState([]);
  const [query3, setQuery3] = useState([]);
  const [query4, setQuery4] = useState([]);
  const [query5, setQuery5] = useState([]);

  useEffect(() => {
    setRender(false);
    const dataFetch=async()=>{
      // first query
      await axios
      .post("https://mobilicis-task-backend.vercel.app/",{
        "income": {
          "$lt": "$5"
        },
        "car": {
          "$in": [
            "BMW",
            "Mercedes"
          ]
        }
      })
      .then((x) => {
        setQuery1(x.data)
      })
      // second query
          await axios
        .post("https://mobilicis-task-backend.vercel.app/",{ "gender": "Male", "phone_price": { "$gt": "10000" } })
        .then((x) => {
          setQuery2(x.data)
        })
      // third query
     
          await axios
          .post("https://mobilicis-task-backend.vercel.app/",{
            "last_name": { "$regex": "^M" },
            "quote": { "$exists": true, "$gt": 15 },
            "email": { "$regex": ".*M$", "$options": "i" }
          })
          .then((x) => {
            setQuery3(x.data)
          });
        
      
      // fourth query
          await axios
          .post("https://mobilicis-task-backend.vercel.app/",{
            "car": { "$in": ["BMW", "Mercedes", "Audi"] },
            "email": { "$not": { "$regex": "\\d" } }
          })
          .then((x) => {
            setQuery4(x.data)
          });
        
      // fifth query
          await axios
          .post("https://mobilicis-task-backend.vercel.app/aggr",{
            "aggregate": "collection",
            "pipeline": [
              { "$group": { "_id": "$city", "count": { "$sum": 1 }, "avg_income": { "$avg": { "$toDouble": { "$substr": ["$income", 1, -1] } } }  } },
              { "$sort": { "count": -1 } },
              { "$limit": 10 }
            ]
          })
          .then((x) => {
            console.log("Hello 5");
            console.log(x.data);
            setQuery5(x.data)
            
          });
        
    }

    dataFetch().then(
      ()=>{
        setRender(true);
      }
    )
    


  }, [rows]);



  return ( 
    
    !render&&(<div >
      <h1>Loading Data...</h1>
      </div>) ||

    render && (

      
      <div className="container" >
        <h1 > Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</h1>
        <Tables tableData={query1} cols={columns}/>
      <br />
      <h1 >Male Users which have phone price greater than 10,000.</h1>
        <Tables tableData={query2} cols={columns}/>

        <br />
        <h1 >Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name</h1>
        <Tables tableData={query3} cols={columns}/>
        
        <br />
        <h1 >Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</h1>
        <Tables tableData={query4} cols={columns}/>
        <br />
        <h1 >Show the data of top 10 cities which have the highest number of users and their average income.</h1>
        <Tables tableData={query5} cols={query5columns}/>

       
      </div>
    )
  );
}