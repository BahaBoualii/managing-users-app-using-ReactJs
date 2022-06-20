import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button.js";
import { useState } from "react";
import ErrorModel from "../UI/ErrorModel";

const AddUser = props => {
    
    const[enteredUserName, setEnterdUserName] = useState('');
    const[enteredAge, setEnterdAge] = useState('');
    const[error, setError] = useState(undefined);
    
    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)"
            })
            return;
        }
        if(+enteredAge < 1) {
            setError({
                title: "Invalid Age",
                message:"Age should be a positive integer obviously !!"
            })
            return;
        }
        props.onAddUser(enteredUserName,enteredAge);
        setEnterdUserName('');
        setEnterdAge('');
    }

    const useNameChangeHandler = event => {
        setEnterdUserName(event.target.value);
    }

    const ageChangeHandler = event => {
        setEnterdAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
        {error && <ErrorModel title= {error.title} message= {error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={enteredUserName} onChange={useNameChangeHandler}></input>
                <label htmlFor="age">Age (years)</label>
                <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler}></input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>

        </div>
    );
}

export default AddUser;