export default class APIService{
    static UpdateTopic(topic_id,body){
        return fetch(`http://127.0.0.1:8000/api/topics/${topic_id}/`, {
            'method':'PUT',
            headers:{
             'Content-Type':'application/json'
            },
            body:JSON.stringify(body)        
        }).then (res => res.json())
    }

    static InsertTopic(body) {
        return fetch('http://127.0.0.1:8000/api/topics/' , {
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${sessionStorage.getItem('mytoken')}`,
            },
            body:JSON.stringify(body)
        }).then(res => res.json())
    }

    static DeleteTopic(topic_id){
        return fetch(`http://127.0.0.1:8000/api/topics/${topic_id}/`, {
            'method':'DELETE',
            headers:{
             'Content-Type':'application/json'
            }        
        })
    }

    static LoginUser(body) {
        return fetch('http://127.0.0.1:8000/api/login/' , {
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        }).then(res => res.json())
    }

    static CompileCode(body) {
        return fetch('https://api.jdoodle.com/v1/execute', {
            'method' : 'POST',
            headers: {
                'Contentype-Type' : 'application/json',
            },
            body:JSON.stringify(body)
        }).then(res => res.json)
    }
}