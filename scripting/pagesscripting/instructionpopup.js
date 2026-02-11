
  // Close popup
  function closePopup() {
    document.getElementById("instructionPopup").style.display = "none";
  }

  // Show popup on page load
  window.onload = function() { 
    let usernamess=this.localStorage.getItem("username");
     let userType = localStorage.getItem("usertype");
  //    if(userType==="guest" || userType===null){
  //   document.getElementById("instructionPopup").style.visibility = "visible";
  // } else{
  //   document.getElementById("instructionPopup").style.display = "none";
  // }

    console.log(this.localStorage);
    
     fetch(API.getProfile(usernamess), 
 {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
  let swipe2= data.swipes;
let streak2=data.streak;
    console.log(swipe2);
    console.log("OMG",data.username);
    let guestUser=localStorage.getItem("guestUser");
    // document.getElementById("swipe").innerText=`Swipes : ${swipe2}`;
    document.getElementById("streak").innerText=`${streak2 ||0}🔥`;
     
      if (data.swipes === null || data.swipes === 0) {


  const firstTimeUser = localStorage.getItem("firstTimeUser");

  // If the flag does NOT exist, it's the user's first time
  if (firstTimeUser === null) {
    document.getElementById("instructionPopup").style.visibility = "visible";
    localStorage.setItem("firstTimeUser", "false");
  } 
} 

else {
    document.getElementById("instructionPopup").style.visibility = "hidden";
  }
})
}


function openPopup(){
  document.getElementById("instructionPopup").style.visibility = "visible";
}