window.addEventListener('load', () => {
    document.getElementById('twirl-button').addEventListener('click', () => {
        let numTwirls = document.getElementById('twirl-number').value;
        console.log(numTwirls);
        //creating the object
        let obj = { "numberTwirls": numTwirls };
        //stringifying the object
        let jsonData = JSON.stringify(obj);

        //fetch to route numTwirls
        fetch("/numTwirls", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => { console.log(data) })

        //make a fetch request of type POST so we can send the numTwirls info to server
    })

    document.getElementById('get-tracker').addEventListener('click', ()=>{
        //get info on all twirls and leaps so far
        fetch('/getTwirls')
        .then(resp=>resp.json())
        .then(data=>{
            document.getElementById('twirls-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i<data.data.length; i++){
                let string = data.data[i].date + " : " + data.data[i].twirl;
                let elt = document.createElement('p');
                elt.innerHTML= string;
                document.getElementById('twirls-info').appendChild(elt);
            }
        })
    })
})