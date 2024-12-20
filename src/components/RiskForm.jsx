import { useState } from 'react'
function RiskForm() {
    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
      //doing the above allows us to not use use states for each value, simply take each event and set target to value of input
    }
  
    const handleSubmit = (event) => {
      event.preventDefault(); //prevents form from reloading page right away. better efficiency
      console.log(inputs);
    }
    const inputStyling="w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    return (
      <form onSubmit={handleSubmit} className="m-auto p-4 border border-gray-500 rounded-md w-1/3 bg-slate-300">
        <label>Enter your name:
        <input 
          type="text" 
          name="username" 
          value={inputs.username || ""} 
          onChange={handleChange}
          //for testing
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        
        /><br></br>
        </label>
        <label>Enter your age:
          <input 
            type="number" 
            name="age" 
            min="18"
            value={inputs.age || ""} 
            onChange={handleChange}
            className={inputStyling}
            
          />
        </label><br></br>
        

        <label>What is your employment status:
          <select type="select" name="employment" value={inputs.employment} onChange={handleChange} 
          
        className={inputStyling}>
            <option value="Student">Student</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Retired">Retired</option>
          </select>
        </label><br></br>

        <label>What is your investment goal?:
          <select type="select" name="goal" value={inputs.goal} onChange={handleChange} 
          
        className={inputStyling}>
            <option value="High-growth potential">High-growth potential</option>
            <option value="Moderate growth potential">Moderate growth potential</option>
            <option value="Self-Employed">Conservative growth</option>
          </select>
        </label><br></br>

        <label>Initially, how much money do you plan to invest?:
          <input 
            type="number" 
            name="budget" 
            min="1"
            value={inputs.budget || ""} 
            onChange={handleChange}
            className={inputStyling}
            
          />
        </label><br></br>

        <label>In how many years will you need access to your investments?:
          <input 
            type="number" 
            name="timeframe" 
            min="1"
            max="100"
            value={inputs.timeframe || ""} 
            onChange={handleChange}
            className={inputStyling}
            
          />
        </label><br></br>

        
        

          
        <input type="submit" />
      </form>
    )
  }
export default RiskForm;