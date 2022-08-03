	//let optionList = document.getElementById('questionjson').options;
	let optionsdata = [{
	"CLASS": [{
		"title": 'IV',
		"value": 'iv',
		"selected": false
	}, {
		"title": 'VIII',
		"value": 'viii',
		"selected": false
	}], 
	"SUBJECTS": [{
		"title": 'Physics',
		"value": 'physics',
		"selected": false
	}, {
		"title": 'Chemistry',
		"value": 'chemistry',
		"selected": false
	}, {
		"title": 'Biology',
		"value": 'biology',
		"selected": false
	}, {
		"title": 'History',
		"value": 'history',
		"selected": false
	}, {
		"title": 'Geography',
		"value": 'geography',
		"selected": false
	}, {
		"title": 'Civics',
		"value": 'civics',
		"selected": false
	}, {
		"title": 'Economics',
		"value": 'economics',
		"selected": false
	}, {
		"title": 'Tamil',
		"value": 'tamil',
		"selected": false
	}, {
		"title": 'English',
		"value": 'english',
		"selected": false
	}, {
		"title": 'Maths',
		"value": 'maths',
		"selected": false
	}, {
		"title": 'Moral',
		"value": 'moral',
		"selected": false
	}], 
	"LESSON NUMBERS": [{
		"title": '1',
		"value": 'l01',
		"selected": false
	}, {
		"title": '2',
		"value": 'l02',
		"selected": false
	}, {
		"title": '3',
		"value": 'l03',
		"selected": false
	}, {
		"title": '4',
		"value": 'l04',
		"selected": false
	}, {
		"title": '5',
		"value": 'l05',
		"selected": false
	}, {
		"title": '6',
		"value": 'l06',
		"selected": false
	}, {
		"title": '7',
		"value": 'l07',
		"selected": false
	}, {
		"title": '8',
		"value": 'l08',
		"selected": false
	}, {
		"title": '9',
		"value": 'l09',
		"selected": false
	}, {
		"title": '10',
		"value": 'l10',
		"selected": false
	}, {
		"title": '11',
		"value": 'l11',
		"selected": false
	}, {
		"title": '12',
		"value": 'l12',
		"selected": false
	}, {
		"title": '13',
		"value": 'l13',
		"selected": false
	}, {
		"title": '14',
		"value": 'l14',
		"selected": false
	}, {
		"title": '15',
		"value": 'l15',
		"selected": false
	}, {
		"title": '16',
		"value": 'l16',
		"selected": false
	}, {
		"title": '17',
		"value": 'l17',
		"selected": false
	}, {
		"title": '18',
		"value": 'l18',
		"selected": false
	}, {
		"title": '19',
		"value": 'l19',
		"selected": false
	}, {
		"title": '20',
		"value": 'l20',
		"selected": false
	}]
}];

/*	options.forEach(option =>
		optionList.add(
			new Option(option.text, option.value, option.selected)
		)
	); */

$.each(optionsdata, function(i, optgroups) {
            $.each(optgroups, function(groupName, options) {
                var $optgroup = $("<optgroup>", {
                    label: groupName
                });
                $optgroup.appendTo('#jsonpathselect');
                $.each(options, function(j, option) {
                    var $option = $("<option>", {
                        text: option.title,
                        value: option.value,
						selected: option.selected
                    });
                    $option.appendTo($optgroup);
                });
            });
        });