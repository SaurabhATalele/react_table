# Data Fetch using API having MongoDb

This project was build to fetch the data from the API which is connected to the MongoDb and display it in table format.

## Code Explaination

this project has used the following libraries
`ReactJS`
 `React-Table`
 `Axios`
 
 The Data in the applicatipn is fetched by using the `axios` library using the post method by passing the query aas a parameter in the first four queries and a pipeline for the fifth query.
 
 The data in the application is stored in the state variable.
 
 After all the 5 queries are fetched then the flag is set to be True and the data is shown. Till then, the screen has the message `Loading Data...`.
 
 The data is sent using the component props to the table and the table is rendered using the `react-table` library.
 
 ### Screenshots
 
 Loading Screen
 ![image](https://user-images.githubusercontent.com/75177599/234126371-e20c1732-fc18-4175-885a-a6e9583167b7.png)
 
 Data Screen
![image](https://user-images.githubusercontent.com/75177599/234126433-13abd53a-7104-4ad7-afc0-06eb313db66e.png)

