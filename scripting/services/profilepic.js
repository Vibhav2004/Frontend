function saveProfilePic() {
    console.log("hi vibhav this side ");
    
  document.querySelectorAll('.dropdown-menu img').forEach(img => {
    img.addEventListener('click', () => {
      // Get filename only (e.g. headShock2.png)
      const fileName = img.src.split('/').pop();
console.log(fileName);

      // Optional: get display name
      const useR = localStorage.getItem("username");

      fetch(API.uploadPFP(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pfp: fileName,
          username: useR
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('Saved:', data);
      })
      .catch(err => {
        console.error('Error:', err);
      });
    });
  });

}