
// IE hack for indexOf
if(!Array.indexOf){
  Array.prototype.indexOf = function(obj){
   for(var i=0; i<this.length; i++){
    if(this[i]==obj){
     return i;
    }
   }
   return -1;
  }
}
	  
	  
	  	    let questions = {};

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


		orderselection[0] = './js/fillin/class' + orderselection[0] + '/';
		orderselection[orderselection.length - 1] = '/' + orderselection[orderselection.length - 1] + '/questions.json';
		selectedjsonpath = orderselection.join('');

		questionsurl = (orderselection.length == 3) ? selectedjsonpath : questionsurl;
		
		fetjsonfile(questionsurl);

		//console.log(questionsurl);
		

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
    //console.log(questions.quests[0].blockSize);
    formatjson(questions);
  });

}

(function($) {
  $.fn.quizyFillBlank = function(options) {
	  
		  //console.log(options.quests[0].textItems);
    
    // VARIABLES **************************************************************
    // ************************************************************************

    // gets the parameters
    var opts = $.extend({}, $.fn.quizyFillBlank.defaults, options.quests[0]);
	
    
    // keeps the text items given in the parameters
    var textItems = opts.textItems;
    
    // keeps the order of the items given in the parameters
    var anItemsOrderArr = opts.anItemsCorrect;
    
    // keeps all the answers themself given in the parameters
    var anItemsArr = opts.anItems;
	
	// keeps all the answers themself given in the parameters
    //var anLabelsArr = opts.anLabels;
	  let anLabelsArr = opts.anLabels;

    
    // keeps the number of the answers and the number of the drop places
    var anNum = anItemsArr.length;
    var phNum = anItemsOrderArr.length;
    
    // keeps the number of successful drop attemts
    var anCount = 0;
    
    //counts the amount of seconds to complete it
    var numSeconds = 0;
    
    //keeps how many correct answers the user has
    var correctDrops = 0;
    
    // a timer variable
    var gameTimer;
    
    // DOM elements for the text and the draggable answers
    var el1 = $('#'+opts.elementAnId);
    var el2 = $('#'+opts.elementTextId);
    
    // making the placeholder size
    var placeHolder = '';
    for(i=0;i<Math.round(opts.blockSize/10);i++){
      placeHolder += '_';
    }
    
    
    // FUNCTIONS **************************************************************
    // ************************************************************************    
    
    // Function for handling the dragging
    function handleDragStop( event, ui ) {
      var offsetXPos = parseInt( ui.offset.left );
      var offsetYPos = parseInt( ui.offset.top );
    }
    
    // Function for handling the dropping
    function handleDropOn( event, ui ) {
      // disables the draggable element and adds the necessary classes
      $(this).droppable( 'disable' );
      ui.draggable.addClass('quizy-fitb-dropelement-disabled');
      ui.draggable.draggable( 'disable' );
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      ui.draggable.draggable( 'option', 'revert', false );
      
      // gets the corresponding id's of the droppabe and draggable elemts
      var idAttr = $(this).attr('id');
      var dropId = idAttr.substring(opts.phId.length,idAttr.length);
      idAttr = ui.draggable.attr('id');
      var dragId = idAttr.substring(opts.answerId.length,idAttr.length);
      
      // compares the ids and adds the necessary class if they match, meaning
      // that the answer the user has dropped is correct
      if(anItemsOrderArr[dropId]==dragId){
        $('#'+opts.checkId+dragId).removeClass('quizy-fitb-res-no')
                                  .addClass('quizy-fitb-res-yes');
        $('#'+opts.checkId+dragId).html('&#10003'); //adds tick in place of 'x'
        correctDrops ++; //increases the correct answers counter
      }
      
      // starts the counter if it's the first time the user drops an element
      if(anCount == 0) gameTimer = setInterval(incTime,1000);
      
      // increases the total answer counter
      anCount++;
      
      // if the the number of dropped items is the same as the placeholders
      if(anCount == phNum){
        // clears the timer
        clearInterval(gameTimer);
        // shows the correct answers
        $('.'+opts.checkId).fadeIn();
        $('.'+opts.numberId).fadeIn();
        // if set in the opts, calls the callback function
        if(opts.onFinishCall!=''){
          opts.onFinishCall({ correct_answers: correctDrops, 
                                     all_answers:phNum, 
                                     time: numSeconds } );
        }
      }
    }
    
    // Time increase function
    var incTime = function(){
      numSeconds ++;
    }
    
     // Funcitons for handling the touch events in the touch devices********
     
    // Merging the attachEvent func of IE to the standard one
    function bindEvent(el, eventName, eventHandler, boolr) {
      if (el.addEventListener){
        el.addEventListener(eventName, eventHandler, boolr); 
      } else if (el.attachEvent){
        el.attachEvent('on'+eventName, eventHandler);
      }
    }
    
    // Makes elements with class 'draggalbe-element' draggable on touch devices
    function touchHandler(event)
    {
     var touches = event.changedTouches,
        first = touches[0],
        type = "";

         switch(event.type)
    {
        case "touchstart": type = "mousedown"; break;
        case "touchmove":  type="mousemove"; break;        
        case "touchend":   type="mouseup"; break;
        default: return;
    }
      var simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

      first.target.dispatchEvent(simulatedEvent);

      if( $(event.target).hasClass('draggable-element') 
          || $(event.target).parent().hasClass('draggable-element') ) {  
        event.preventDefault();  
      }
    }

    // A Function to define the touch event
    function initTouch()
    {
       bindEvent(document, "touchstart", touchHandler, true);
       bindEvent(document, "touchmove", touchHandler, true);
       bindEvent(document, "touchend", touchHandler, true);
       bindEvent(document, "touchcancel", touchHandler, true);    
    }
	
	function makeOL(array) {
    // Create the list element:
      var list = document.createElement('ol');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
	}

    
    
    // MAIN CODE **************************************************************
    // ************************************************************************    
    
    // if set, allows dragging in touch devices
    if(opts.allowTouchDrag) initTouch();
    
    // Adding the text and the placeholders (the drop-target places)
    for(var i=0; i<phNum; i++){
      el2.append('<span>'+textItems[i]+'</span> <span id="'+
                  opts.phId+i+
                  '" class="droppable-element quizy-fitb-droptarget">'+
                  placeHolder+'</span> ');
                  
      // If it's the last drop item, adds one text more at the end
      if(i == phNum-1){
        var nId = i+1;
        el2.append('<span>'+textItems[nId]+'</span>');
      }
    }
    
    // Adding the draggable elements - the possible answers
    var elToAppend = el1;
	
	document.getElementById('ansoptions').appendChild(makeOL(anLabelsArr));
    
    for(var i=0; i<anNum; i++){
      // appends the div with the draggable answers
      elToAppend.append('<div id="'
                        +opts.answerId+i+
                        '" class="quizy-fitb-answer draggable-element '+
                        'quizy-fitb-dropelement" style="width:'+
                        opts.blockSize+'px">'+
                        anItemsArr[i]+'</div>');
                        
      // appends divs showing if the answers are correct (They will be hidden)
      $('#'+opts.answerId+i).append('<div id="'+opts.checkId+i+
                                    '" class="quizy-fitb-res quizy-fitb-res-no '+
                                    opts.checkId+'">x</div>');
      $('#'+opts.answerId+i).append('<div id="'+
                                      opts.numberId+i+
                                      '" class="quizy-fitb-res quizy-fitb-res-num '+
                                      opts.checkId+'">'+
                                      (parseInt(anItemsOrderArr.indexOf(i))+1)+
                                      '</div>');
    }
    
    // Adding drag functionality to the draggable elements (from jQuery UI)
    $('.draggable-element').draggable( {
      cursor: 'move',
      containment: 'document',
      stop: handleDragStop,
      revert: true
    } );
    
    // Adding drop functionality to the draggable elements (from jQuery UI)
    $('.droppable-element').droppable( {
      drop: handleDropOn,
      hoverClass: 'quizy-fitb-droptarget-hover'
    } );
    
    // Positions the results/correct answers to the draggable elements
    // and makes it right aligned to them
    for(var i=0; i<anNum; i++){
      $('#'+opts.checkId+i).position( { of: $('#'+opts.answerId+i), 
                                        my: 'right center ', 
                                        at: 'right center', 
                                        offset:'0 5px' } );
      $('#'+opts.numberId+i).position( { of: $('#'+opts.answerId+i), 
                                         my: 'right center', 
                                         at: 'right center', 
                                         offset:'10px -10px' } );
      // Hides the answers at the begining of the exercise
      $('#'+opts.checkId+i).hide();
      $('#'+opts.numberId+i).hide();
    }

  }
  

  /**** plugin parameters *****************************************************
  *****************************************************************************
  
    * elementAnId:      String to change the id of the div id with the answers.
                        default: fillblank-ph
    * elementTextId:    String to change the id of the div id with the answers
                        default: fillblank-text
    * textItems:        Array which comprises the texts in-between the blanks.
                        It should include all the text fragments except the 
                        missing words (they are like separators of the texts)
                        Should look like this: 
                        ['text starts here','continues here', 'finishes here']
    * anItems:          Array with the strings, listing the possible answers
                        Should look like this:
                        ['answer 1', 'answer 2', 'answer 3']
    * anItemsCorrect:   Array with the correct items and their position in 
                        the anItems array. Should look like this:
                        [3,0,1] - means:
                        on place 1 goes element 3
                        on place 2 goes element 0
                        on place 3 goes element 1
                        (2 is missing as it's a wrong answer and fits nowhere)
    * answerId:         String to change the class of the div with
                        the answers to prevent any potential conflicts 
                        in your code
    * phId:             String to change the class of the spans with the 
                        blank spaces to prevent any potential conflicts 
                        in your code. 
                        default: 'd-nest'
    * checkId:          String to change the class of the divs with the icons
                        showing if the answers was correct or not (in order to
                        prevent any potential conflicts in your code). 
                        default:'d-check'
    * numberId:         String to change the class of the divs with the icons
                        showing if the correct position of the item (in order
                        to prevent any potential conflicts in your code). 
                        default: 'd-number'
    * blockSize:        The size of the answer divs and also the blank spaces. 
                        Change it if you have shorter or longer words than normal
                        default: 100
    * allowTouchDrag:   A boolean parameter (true or false), which enables
                        dragging on touch devices. 
                        default: true
    * onFinishCall:     The call back function
                        It sends three arguments: correct_answers, 
                                                  all_answers, 
                                                  time
                         
  ****************************************************************************/

  $.fn.quizyFillBlank.defaults = {elementAnId: 'fillblank-ph', textItems:['Text part1','text part 2', 'text part 3'], elementTextId: 'fillblank-text', anItems: ['an1','an2','an3'], anItemsCorrect:[2,0], answerId:'d-answer', phId: 'd-nest', checkId:'d-check', numberId:'d-number', blockSize:100, onFinishCall:'', allowTouchDrag:true}
  

  
})(jQuery);





function formatjson(questions) {

$("#tutorial-fillblank").quizyFillBlank(questions);
}


		// start quiz
			const startQuiz = () => {
				document.querySelector(".jsq_header").removeAttribute("style");
				document.querySelector(".jsq_main_content").removeAttribute("style");
				document.querySelector(".jsq_footer").removeAttribute("style");
				document.querySelector("#jsq_ifo_box").remove();
			};

const start_button = document.getElementById("jsq_start");
			start_button.addEventListener("click", startQuiz);
