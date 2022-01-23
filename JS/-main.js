$(document).ready(function(event) {
	async function getUser() {
		let data = await fetch('http://localhost/Practice/API/user');
		let dataUser = await data.json();
		console.log(dataUser);
		$('.users').html('')
		dataUser.forEach((user) => {
			$('.users').append(` 
				<h6>${user.id}</h6>
				<h1>${user.name}</h1>
				<h2>${user.surname}</h2>
				<h3>${user.mail}</h3>
				<h4>${user.password}</h4>
				<h5>${user.role}</h5>
			`)
		})
	}
	getUser();



	async function addUser() {
		  //const json = new Map();
		  let formData = new FormData();
		  let input = $('#formReg').find("input, select, textarea")
		  for (let i = 0; i < input.length; i++) {
		  	if(input[i].name != "") formData.append(input[i].name, input[i].value); //json.set(input[i].name, input[i].value);
		  }
		  let data = await fetch('http://localhost/Practice/API/user', {
		  								method: 'POST',
		  								body: formData //JSON.stringify(json)
		  							});
		  let dataUser = await data.json();
		  console.log(dataUser['message']);
		  getUser();
	}

	$('#formReg').submit(function (event) {
		  event.preventDefault();
		  addUser();
	})

	
})