let questions = {};
let url = window.location.pathname;
let filename = url.substring(url.lastIndexOf('/')+1).split('.').slice(0, -1).join('.');
console.log(filename);

$("#jsonpathselect").chosen().change(function() {
		let orderselection = [];
		let selectedjsonpath = [];
        let questionsurl = "";

		const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/;

		$.each($(this).val(), function(index, value) {
			orderselection.push(value);
			$.isNumeric(value) ? orderselection.push(orderselection.splice(orderselection.indexOf(value), 1)[0]) : '';
			pattern.test(value) ? orderselection.unshift(value) : '';
		});


		orderselection[0] = './js/' + filename + '/class' + orderselection[0] + '/';
		orderselection[orderselection.length - 1] = '/' + orderselection[orderselection.length - 1] + '/questions.json';
		selectedjsonpath = orderselection.join('');

		questionsurl = (orderselection.length == 3) ? selectedjsonpath : questionsurl;
		
		fetjsonfile(questionsurl);

		console.log(questionsurl);
		

});
	  


function fetjsonfile(questionsurl) {
		

var myInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
		   },
  mode: 'cors',
  cache: 'default'
  };
		
		//console.log(questionsurl);

  let myRequest = new Request(questionsurl, myInit);

  fetch(myRequest).then(function(resp) {
    return resp.json();
  }).then(function(data) {
    Object.assign(questions, data);
    //console.log(questions.quests[0]);
    formatjson(questions);
  });

}



const startQuiz = () => {
	document.querySelector(".jsq_header").removeAttribute("style");
	document.querySelector(".jsq_main_content").removeAttribute("style");
	document.querySelector(".jsq_footer").removeAttribute("style");
	document.querySelector("#jsq_ifo_box").remove();
	//shuffleCard();
};

const start_button = document.getElementById("jsq_start");
start_button.addEventListener("click", startQuiz);
