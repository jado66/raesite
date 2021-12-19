
import React, {useState, useEffect, setModalOpen} from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({ status, message, onValidated }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if(status === "success") clearFields();
      }, [status])
    
    const clearFields = () => {
    setName('');
    setEmail('');
    }

    function handleNameChange(evt) {
        const value = evt.target.value;
        setName(value)
    }

    function handleEmailChange(evt) {
        const value = evt.target.value;
        setEmail(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        name &&
        email &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
            MERGE1: name,
        });
    }

    return (
    <form className="mc__form" onSubmit={(e) => handleSubmit(e)}>
        
        <h3 className="mc__title">
        {status === "success" 
            ? "Success!" 
            : "Join our email list for future updates."
          }
        </h3>
        
        {status === "sending" && (
          <div className="mc__alert mc__alert--sending">
            sending...
          </div>
        )}
        {status === "error" && (
          <div 
            className="mc__alert mc__alert--error"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            className="mc__alert mc__alert--success"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        
        {status !== "success" && (
            <div className="mc__field-container">
                <label>Name</label>

                <input type="text" value={name} onChange={handleNameChange} name = "name" placeholder="Jane Doe"/>
               
                <label>Email</label>

                <input type="text" value={email} onChange={handleEmailChange} name = "email" placeholder="your@email.com"/>

            </div>
        )}

        {status !== "success" ? (
        <input type="submit" value="Submit"/>     
        ) : null}
        {
          status === 'success' ? <button
            onClick={() => setModalOpen(false)}
            className="g__justify-self-center">Close</button> : 
            <input type="submit" value="Submit"/>     

        }
    </form>
    );
};

const MailchimpFormContainer = props => {

    const mailchimp_u = '71e933adace0c078dcac2c940'
    const mailchimp_id = `735078ecb6`

    const postUrl = `https://gmail.us20.list-manage.com/subscribe/post?u=${mailchimp_u}&amp;&id=${mailchimp_id}`

    // u 71e933adace0c078dcac2c940
    // id 735078ecb6
    
    // for Name MERGE1
    // for Email MERGE0
    return (
        <div className="mc__form-container">
            <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status} 
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        </div>
    );
};

export default MailchimpFormContainer;