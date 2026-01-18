console.log("hello world")
let username=localStorage.getItem("username");    
console.log(username);

document.getElementById("swipe").innerText=`Swipes : 0`;
// window.onload = function () {
//   fetch(`http://localhost:8080/profile/${username}`, 
//  {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//     console.log(data);
//   let swipe2= data.swipes;
// let streak2=data.streak;
//     console.log(swipe2);
//     document.getElementById("swipe").innerText=`Swipes : ${swipe2}`;
//     document.getElementById("streak").innerText=`${streak2}🔥`;

// })
// };


