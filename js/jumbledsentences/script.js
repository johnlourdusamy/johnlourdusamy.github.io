var score=0;
var goes=0;
var selcnt=0;
var prefix='';
var usual=true;
var bits=[];

function altscoreit(alttvo) {
  return alttvo.value;
}


function scoreit(tvo) {
  var tv=tvo.value, altis=false, wast, waso;
  if (prefix != '' && !usual) {
    wast=tvo.options[tvo.selectedIndex].title;
    waso='td' + tvo.options[tvo.selectedIndex].text;
      if ((bits[1].toLowerCase().trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ')[eval(-1 + eval(tvo.options[tvo.selectedIndex].text))] == tvo.options[tvo.selectedIndex].title.toLowerCase()) {
    usual=false;
    altis=true;
    selcnt--;
    score++;
    tvo.style.backgroundColor='green';
    if (eval(tvo.options[tvo.selectedIndex].text) == 1) {
    document.getElementById(waso).innerHTML=wast.substring(0,1).toUpperCase() + (wast + ' ').substring(1).trim();
    } else {
    document.getElementById(waso).innerHTML=wast;
    }
    tvo.value='';
      } else {
    score--;
    tvo.value='';
    tvo.style.backgroundColor='red';
      }
  } else if (tv.replace(' ','') != '') {
    selcnt--;
    score++;
    tvo.style.backgroundColor='green';
    document.getElementById('td' + tv).innerHTML=tvo.options[tvo.selectedIndex].title;
    tvo.value='';
  } else {
    wast=tvo.options[tvo.selectedIndex].title;
    waso='td' + tvo.options[tvo.selectedIndex].text;
    if (prefix != '') {
      if ((bits[1].toLowerCase().trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ')[eval(-1 + eval(tvo.options[tvo.selectedIndex].text))] == tvo.options[tvo.selectedIndex].title.toLowerCase()) {
    usual=false;
    altis=true;
    selcnt--;
    score++;
    tvo.style.backgroundColor='green';
    if (eval(tvo.options[tvo.selectedIndex].text) == 1) {
    document.getElementById(waso).innerHTML=wast.substring(0,1).toUpperCase() + (wast + ' ').substring(1).trim();
    } else {
    document.getElementById(waso).innerHTML=wast;
    }
    tvo.value='';
      }
    }
    if (!altis) {
    score--;
    tvo.value='';
    tvo.style.backgroundColor='red';
    }
  }
  document.getElementById('score').innerHTML='Score: ' + score + ' from Sentences: ' + goes;
  console.log(selcnt)
  if (selcnt <= 0) formatjson(questions);
}

function pickasentence(questions) {
	console.log(questions.length);
  var divih='', wordbits, wordbits2=[], selbit='', iid, ii, iiq, found=false, liststuff="", dl="", optstuff="";
  var choice = Math.floor(Math.random() * questions.length), opts=[], thisopt="", done=[], ioffset=0, jiid;
  console.log(choice);
  var tablebit='<br><table style=background-color:yellow;><tr></tr></table>';
  bits=questions[choice].replace(/]/g,'').split('[');
  usual=true;
  prefix='';
  selcnt=0;
  goes++;
  ioffset=0;
  liststuff='1';
  if (bits[0].trim() != (bits[0].trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','')) {
      ioffset=-1;
  }
  for (ii=0; ii<bits.length; ii++) {   //?
      tablebit='<br><table style=background-color:yellow;><tr></tr></table>';
      if (ii != 0) prefix='alt';
    if (ii == 0) {
  tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td1></td></tr>');
  for (iiq=2; iiq<=bits[0].trim().split(' ').length; iiq++) {
    liststuff+=',' + iiq;
    if (iiq == bits[0].trim().split(' ').length && ioffset != 0) {
     tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td' + iiq + '>' + (bits[0].trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ')[iiq] + '</td></tr>');
    } else {
     tablebit=tablebit.replace('</tr>','<td id=' + prefix + 'td' + iiq + '></td></tr>');
    }
  }
      if (prefix != '') {
        //opts=[];
        //done=[];
        bits[0]=bits[1];
        wordbits=(bits[ii].trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ');
      } else {
        wordbits=(bits[ii].trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ');
        if (bits.length >= 2) wordbits2=(bits[eval(1 + ii)].toLowerCase().trim() + '~').replace('.~',' .').replace('?~',' ?').replace('!~',' !').replace('~','').split(' ');
      }
      optstuff="";
      selbit="";
      for (iid=0; iid<eval(ioffset + wordbits.length); iid++) {
        if (ii == 0) selcnt++;
        if (bits.length >= 2) {

          thisopt='<option value="">' + ('~' + wordbits[iid].toLowerCase() + '~').replace('~i~',' I').replace('~','').replace('~','') + '</option>';
          for (jiid=1; jiid<=eval(ioffset + wordbits.length); jiid++) {
            if (eval(-1 + jiid) == iid) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else if (wordbits[eval(-1 + jiid)].toLowerCase() == wordbits[iid].toLowerCase()) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else {
             thisopt+='<option title="' + wordbits[iid] + '" value=" ">' + jiid + '</option>';
            }
          }


        } else {
          thisopt='<option value="">' + ('~' + wordbits[iid].toLowerCase() + '~').replace('~i~',' I').replace('~','').replace('~','') + '</option>';
          for (jiid=1; jiid<=eval(ioffset + wordbits.length); jiid++) {
            if (eval(-1 + jiid) == iid) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else if (wordbits[eval(-1 + jiid)].toLowerCase() == wordbits[iid].toLowerCase()) {
             thisopt+='<option title="' + wordbits[iid] + '" value="' + jiid + '">' + jiid + '</option>';
            } else {
             thisopt+='<option title="' + wordbits[iid] + '" value=" ">' + jiid + '</option>';
            }
          }
        }
        opts.push(thisopt);
        //if (ii != 0) alert(opts.length + ' ... ' + thisopt);
      }
      done=[];
      for (iid=0; iid<eval(ioffset + wordbits.length); iid++) {
       optstuff='';
       if (iid == 0) {
        choice = Math.floor(Math.random() * eval(ioffset + wordbits.length));
       } else {
        while (done.indexOf('' + choice) != -1) {
         choice = Math.floor(Math.random() * eval(ioffset + wordbits.length));
        }
       }
       done.push('' + choice);
       //if (ii != 0) alert("opts[" + choice + "]='" + opts[eval(choice)] + "'");
       optstuff+=opts[eval(choice)];
       //if (ii != 0) alert(optstuff);
       if (prefix != '') {
       selbit='<select id=' + prefix + wordbits[iid].toLowerCase() + ' style="font-size:24px;background-color:pink;" onchange="' + prefix + 'scoreit(this);">' + optstuff + '</select>';
       } else {
       selbit='<select id=' + prefix + 's' + eval(1 + iid) + ' style="font-size:24px;background-color:pink;" onchange="' + prefix + 'scoreit(this);">' + optstuff + '</select>';
       }
       divih+=selbit;
      }
      if (ioffset != 0) divih+=wordbits[eval(-1 + wordbits.length)];
      //alert(tablebit);
      document.getElementById(prefix + 'askthis').innerHTML=divih + tablebit;
  }
  }
  
}

function addthis(questions) {
  var idea=prompt("Optionally, add you own sentence, into the mix, as exemplified by ...", "It was great to see them again after all those years. [After all those years it was great to see them again.]");
  if (idea != null) {
    if (idea != '') {
     questions.push(idea);
    }
  }
}

function formatjson(questions) {
	document.getElementById("jsondata").value=JSON.stringify(questions);
	questions = questions.quests;
	console.log(questions);
	pickasentence(questions);
}
