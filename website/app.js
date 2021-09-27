/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// The personal API Key for OpenWeatherMap API is saved in a named const variable. ?????????? 
const apiKey = `6ffc19308a0792a81347c074b27b29e9`;
const url =`https://api.openweathermap.org/data/2.5/weather?zip=`;

const button = document.querySelector('#generate');
button.addEventListener('click',()=>{
    let zipCode = document.querySelector('#zip').value;
    let feelings = document.querySelector('#feelings').value;

    const weatherValue = async()=>{

        if(zipCode){
            try{
                let data = await fetch(`${url}${zipCode}&appid=${apiKey}&units=metric&lang=en`).then(response => response.json())
                .then(async(data) =>{
                    await fetch("/project",{
                        method:"POST",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({temp:data.main.temp,
                            date:newDate,
                            feelings:feelings})
                    })
                    console.log(data.main.temp)
                })
                .then(updateUI())

            }catch(error){
                console.log(error)
            }
        }else{
            window.alert('please enter a valid zipcode first')
        }
    }
    weatherValue()
})
// ###########################################################################
const updateUI = async ()=>{
    try{
        let finalData = await (await fetch('/project')).json();
        let {date , feelings, temp} = finalData;
        document.querySelector("#date").innerHTML = `date is:  ${date}`;
        document.querySelector("#content").innerHTML = `message is:  ${feelings}`;
        document.querySelector("#temp").innerHTML = `temp is:  ${temp}`;
    }catch(error){
        console.log(error)
    }
}
// #############################################################################
