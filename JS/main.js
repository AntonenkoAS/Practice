$(document).ready(function(event){
	async function addUser() {
		  let password = '';
		  let formData = new FormData();
		  let input = $('#formRegistration').find("input, select, textarea")
		  for (let i = 0; i < input.length; i++) {
		  	if (input[i].name == "mail") if(await searchMail(input[i].value)){ swal('Почта занята'); return;} 
		  	if (input[i].name == "password"){
		  		password = input[i].value;
		  		if(!/(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}/g.test(password)) {swal('Пароль не удовлетворяет пораметрам: не меньше 6 символов, латинские буквы и цифры'); return;}
		  	}
		  if (input[i].name == "agreement"){ if(!input[i].checked){ swal('Вы не согласились с условиями использования и политикой конфиденциальности'); return;}}
		  	if (input[i].name == "re-password" && input[i].value != password){swal('Пароли не совподают'); return;}
		  	
		  	if(input[i].name != "") formData.append(input[i].name, input[i].value);
		  }
		  let data = await fetch('http://localhost/Practice/API/user', {
		  								method: 'POST',
		  								body: formData
		  							});
		  let dataUser = await data.json();
		  window.location.replace("http://localhost/Practice/authorization.html");
	}
	async function logeIn() {
		const json = new Map();
		let input = $('#formAuthorization').find("input, select, textarea");
		let value = '';
		for (let i = 0; i < input.length; i++) 
		{
		  if(input[i].name != "") json.set(input[i].name, input[i].value);
		}
		let jsonObject = {};  
		json.forEach((value, key) => {  
		    jsonObject[key] = value  
		}); 
		let data = await fetch('http://localhost/Practice/API/user', {
		  								method: 'VIEW',
		  								body: JSON.stringify(jsonObject)
		  							});
		let dataMail = await data.json();
		if(dataMail['status'] == false) swal('Данные не верны');
		else window.location.replace("http://localhost/Practice/user.html");
	}

	async function searchMail(value) {
	
		  let data = await fetch('http://localhost/Practice/API/user', {
		  								method: 'VIEW',
		  								body: JSON.stringify({ 'mail': value })
		  							});
		  let dataMail = await data.json();
		  if(dataMail['status'] == false) return false;
		  else return true;
	}


	async function getSession() {
		  let data = await fetch('http://localhost/Practice/API/session');
		  let dataMail = await data.json();
		  if(dataMail['status'] == false) return;
		  else return dataMail;
	}
	
	async function getDocument() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/document/'+user_id['id_user']);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getEducation() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/education/'+user_id['id_user']);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getQuality() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/quality/'+user_id['id_user']);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getWork() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/work/'+user_id['id_user']);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getUser() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/user/'+user_id['id_user']);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getUsers() {
		let user_id = await getSession();
		let data = await fetch('http://localhost/Practice/API/user');
		let dataUser = await data.json();
		return dataUser;
	}
	async function getEvents() {
		let data = await fetch('http://localhost/Practice/API/events');
		let dataUser = await data.json();
		return dataUser;
	}
	async function getMessage() {
		let message_id = 0;
		if(localStorage.getItem('message_id') != null) {
		 	message_id = localStorage.getItem('message_id');
		  	localStorage.clear(); 
		}
		let data = await fetch('http://localhost/Practice/API/message/'+message_id);
		let dataUser = await data.json();
		return dataUser;
	}
	async function getMessages() {
		let data = await fetch('http://localhost/Practice/API/message');
		let dataUser = await data.json();
		return dataUser;
	}


	async function printMessage() {
		let data = await getMessage();
		let session = await getSession();
		let my;
		const json = new Map();
		$('#message .message').html('')
		if(data['status'] == undefined)
		{
			data.forEach((message) => {
				if(message.user_id != session['id_user']) json.set( 'contact', ''+ message.name +' '+ message.surname +'') 
				if(message.user_id == session['id_user']) my = 'my';
				else my = '';
				$('#message .message').append(` 
					<div class="item ${my}">
						<p>${message.message}</p>
						<p>${message.date}</p>
					</div>
				`)
			})

			$('#message .contact').html('')
			$('#message .contact').append(` 
				${json.get('contact')}
			`)
		}
	}

	async function printMessages() {
		let data = await getMessages();
		$('#messages .category').html('')
		data.forEach((message) => {
			$('#messages .category').append(` 
				<div class="item" data-id=${message.message_id}>
						<div class="item">
							<img src="IMG/no_image.png">
							<div>
								<p class="weight-600">${message.name} ${message.surname}</p>
								<p>${message.message}</p>
							</div>
						</div>
						<p>${message.date}</p>
					</div>
			`)
		})
	}



	async function printUser() {
		let data = await getUser();
		let rol = "Студент";
		if (data.role > 0) rol = "Преподователь";
		$('.user').html('');
		$('.user').append(` 
				<div><img src="IMG/no_image.png"></div>
				<div>
					<p class="h5 userName">${data.name} ${data.surname}</p>
					<hr>
					<a href="tel:${data.tel}">${data.tel}</a>
					<a href="mailto:${data.mail}">${data.mail}</a>
					<p>${rol}</p>
				</div>
			`)
	}

	async function printMyProfile() {
		let data = await getEducation();
		
		$('#myProfile .category').html('');

		$('#myProfile .category').append(`
				<div class="item categoryName">
					<p class="weight-600">ОБРАЗОВАНИЕ</p>
					<hr>
				</div>
			`);
		data.forEach((education) => {
			let display = "";
			if(education.start_year == "0000") education.start_year = "....";
			if(education.end_year == "0000") education.end_year = "....";
			if(education.speciality == "") display = "display_none";
			$('#myProfile .category').append(` 
					<div class="item">
						<p class="weight-500">Учреждение:</p>
						<p>${education.institution}</p>
					</div>
					<div class="item ${display}">
						<p class="weight-500">Специальность:</p>
						<p>${education.speciality}</p>
					</div>
					<div class="item">
						<p class="weight-500">Годы обучения:</p>
						<p>${education.start_year} - ${education.end_year}</p>
					</div>
			`)
		})
		data = await getDocument();
		$('#myProfile .category').append(`
				<div class="item categoryName">
					<p class="weight-600">Работы</p>
					<hr>
				</div>
			`);
		data.forEach((document) => {
			let year = $.datepicker.formatDate('yy', new Date(document.year));
			if(document.type_document != "Рекомендация" && document.type_document != "Портфолио")
			$('#myProfile .category').append(` 
					<div class="item">
						<p class="weight-500">${document.type_document }</p>
						<p>${document.name_document}</p>
					</div>
					<div class="item">
						<p class="weight-500">Год написания работы:</p>
						<p>${year}</p>
					</div>
			`)
		})
		$('#myProfile .category').append(`
				<div class="item categoryName">
					<p class="weight-600">ЛИЧНЫЕ КАЧЕСТВА</p>
					<hr>
				</div>
			`);
		data = await getQuality();
		data.forEach((quality) => {
			$('#myProfile .category').append(` 
					<div class="item">
						<p class="weight-500">${quality.name_quality}</p>
						<p>${quality.quality}</p>
					</div>
			`)
		})
		$('#myProfile .category').append(`
				<div class="item">
						<p class="weight-500">Хобби:</p>
						<input type="" name="" placeholder="Нажмите, чтобы добавить">
					</div>
			`);
		$('#myProfile .category').append(`
				<div class="item categoryName">
					<p class="weight-600">КАРЬЕРА</p>
					<hr>
				</div>
			`);
		data = await getWork();
		data.forEach((work) => {
			if(work.year_end == "0000") work.year_end = "....";
			if(work.year_start == "0000") work.year_start = "....";
			$('#myProfile .category').append(` 
					<div class="item">
						<p class="weight-500">Место работы:</p>
						<p>${work.name_company}<br>${work.year_start} - ${work.year_end}<br>${work.name_work}</p>
					</div>
			`)
		})

		data = await getDocument();
		$('#myProfile .category').append(`
				<div class="item categoryName">
					<p class="weight-600">Рекомендации:</p>
					<hr>
				</div>
			`);
		data.forEach((document) => {
			let year = $.datepicker.formatDate('yy', new Date(document.year));
			if(document.type_document == "Рекомендация")
			$('#myProfile .category').append(` 
					<div class="item">
						<p class="weight-500">${document.type_document }</p>
						<p>${document.name_document}</p>
					</div>
					<div class="item">
						<p class="weight-500">Год:</p>
						<p>${year}</p>
					</div>
			`)
		})
		$('#myProfile .category').append(`
				<div class="item">
						<p class="weight-500">Рекомендации:</p>
						<label for="recommendation">Прикрепить</label>
						<input id="recommendation" type="file" name="">	 
					</div>
			`);
	}


	async function printMyPortfolio() {
		let data = await getDocument();
		
		$('#myPortfolio .category').html('');

		$('#myPortfolio .category').append(`
				<div class="item categoryName">
					<p class="weight-600">ПОРТФОЛИО</p>
					<hr>
				</div>
			`);
		data.forEach((document) => {
			if(document.type_document == "Портфолио")
			$('#myPortfolio .category').append(` 

					<div class="item">
						<div class="item">
							<img src="IMG/file_icon.png">
							<div>
								<p>${document.name_document}</p>
								<p class="color_opacity_blue">${document.year}</p>
							</div>
						</div>
						<p class="color_opacity_blue"><span class="color_opacity_blue">23</span>МБ</p>
					</div>
			`)
		})
	}


	async function printSearch(dataSearch) {
		let data;
		if(dataSearch != "") data = dataSearch;
		else data = await getUsers();
		
		$('#search .js').html('');

		$('#search .js').append(`
				<div class="item categoryName">
					<p class="weight-600">РЕЗУЛЬТАТЫ ПОИСКА</p>
					<hr>
				</div>
			`);
		data.forEach((user) => {
			$('#search .js').append(` 

					<div class="item">
							<div class="item">
								<img src="IMG/no_image.png">
								<p class="weight-600">${user.name} ${user.surname}</p>
							</div>
						</div>
			`)
		})
	}


	async function searchUser(name, role) {

	  let data = await fetch('http://localhost/Practice/API/user', {
	  								method: 'VIEW',
	  								body: JSON.stringify({ 'name': name, 'role': role })
	  							});
	  let dataMail = await data.json();
	  if(dataMail['status'] == false) return;
	  else printSearch(dataMail);
	}

	$('input[name="search"]').on('keyup', function() {
		let name = $('input[name="search"]').val();
		let role = '';
		let input = $('#search').find("input[name='role']");
		for (let i = 0; i < input.length; i++) 
		{
		  if(input[i].checked) role = input[i].value;
		}
		switch (role) {
		  case 'students':
		  	role = 0;
		    break;
		  case 'teacher':
		    role = 1;
		    break;
		  default:
		    role = "";
		}
		searchUser(name, role);
	})

	$('input[name="role"]').on('change', function() {
		let role = $(this).val();
		let name = $('input[name="search"]').val();
		switch (role) {
		  case 'students':
		  	role = 0;
		    break;
		  case 'teacher':
		    role = 1;
		    break;
		  default:
		    role = "";
		}
		searchUser(name, role);
	})

	$(document).on('click', '#messages .category > .item', function () {
		let id = $(this).attr('data-id');
		localStorage.setItem('message_id', id);
		document.location.replace("http://localhost/Practice/message.html");
	})



	async function printEvents() {
		let data = await getEvents();
		$('#events .category').html('');

		$('#events .category').append(`
			<div class="item message">Новых событий не обноруженно</div>
		`);
		$('#events .category').append(`
			<div class="item categoryName">
				<p class="weight-600">СЕГОДНЯ</p>
				<hr>
			</div>
		`);
		data.forEach((events) => {
			$('#events .category').append(` 

					<div class="item">
						<div>
							<p class="weight-500">${events.name_event}</p>
							<p>${events.description}</p>
						</div>
						<p>${events.date}</p>
					</div>
			`)
		})
	}

	$('#formRegistration .pass').on('focus', function(){
		$(this).attr('type','text');
	})
	$('#formRegistration .pass').on('blur', function(){
		$(this).attr('type','password');
	})
	$('#formAuthorization .pass').on('focus', function(){
		$(this).attr('type','text');
	})
	$('#formAuthorization .pass').on('blur', function(){
		$(this).attr('type','password');
	})

	printMessage();
	printMessages();
	printUser();
	printMyProfile();
	printMyPortfolio();
	printSearch("");
	printEvents();


	$('form').submit(function (event) {
		  event.preventDefault();
		  
		  switch ($(this).attr("id")) {
			  case "formRegistration":
			    addUser();
			    break;
			  case "formAuthorization":
			   	logeIn();
			    break;
			  default:
			  swal('Ошибка');
			}
	})

	
})