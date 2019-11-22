import React from 'react';


const LoginForm = ({ user }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(user)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="email"></input>
            <input type="text" name="password"></input>
            {user === 'new-patient' && <input type="text" name="telephoneNumber"></input>}
            <button>Submit</button>

        </form>
    )


}
export default LoginForm