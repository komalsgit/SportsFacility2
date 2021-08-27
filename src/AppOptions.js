import React, {useState} from 'react';
import Select from 'react-select';

    function App() {
      const data={LOCATIONID};
       const[selectedValue,setSelectedValue] = useState(this.state.LOCATIONID);
       const handleChange = e =>{
         setSelectedValue(e.value);

       }
     //  componentDidMount(){
      //  fetch ('https://localhost:44345/api/Locationss')
       // .then(response => response.json())
       // .then(data => {
        //  this.setState({locations:data})
       // });
      // }
       return(
           <div>
        <Select
        value={this.state.location.LOCATIONID.find(obj=>obj.value=== selectedValue)}
        options={this.state.location.LOCATIONID}
        onChange={handleChange}
        />
        {
          selectedValue && <div style={{ marginTop:20,lineHeight:'25px'}}>
            <div><b>Selected Value: </b>{selectedValue}</div>
          </div> }
          </div>
       );
     }
     export default App;
    