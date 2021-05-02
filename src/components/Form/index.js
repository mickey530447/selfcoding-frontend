 import React, {useEffect, useState} from 'react'
 import APIService from '../../core/api/APIService';
 
 function Form(props) {
     const [title, setTitle] = useState('')
     const [content, setContent] = useState('')
     const [user, setUser] = useState(1)

     useEffect (() => {
        setTitle(props.topic.title)
        setContent(props.topic.content)
     }, [props.topic])

     const updateTopic = () => {
        APIService.UpdateTopic(props.topic.id, {title, content,user})
        .then(res => props.updatedInformation(res))
     }
     const insertTopic = () => {
          APIService.InsertTopic({title, content,user})
          .then(res => props.insertedInformation(res))
     }
     return (
         <div>
             {props.topic ? (

                <div className = "mb-3">
                    <label htmlFor = "title" className = "form-label" >Title</label>
                    <input type="text" className = "form-control" id = "title" placeholder = "Please Enter The Title"
                        value = {title}
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <label htmlFor = "content" className = "form-label" >Content</label>
                    <textarea className = "form-control" id = "content" rows = "5"
                        value = {content}
                        onChange = {e => setContent(e.target.value)}
                    >

                    </textarea>
                    <br/>

                    {
                        props.topic.id ? <button type="button" onClick = {updateTopic} className = "btn btn-success">Update topic</button>
                        : <button type="button" onClick = {insertTopic} className = "btn btn-success">Insert topic</button>
                    }
                    
                </div>
    
             ): null}
         </div>
     )
 }
 
 export default Form
 