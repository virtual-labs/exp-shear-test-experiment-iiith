function myfun1()
{ var a=0;
	document.getElementById("bt2").innerHTML = "254";
  var elem1=document.getElementById("break1");
  var elem2=document.getElementById("break2");
	var id1 = setInterval(frame1, 500);
	
  function frame1() {
    
    if(a==4)
    { 
      elem1.style.left=350+'px';
      elem2.style.background-color=white;
      clearInterval(id1);
    } 
    else if(a<4){
    a++;}
    }
  }
