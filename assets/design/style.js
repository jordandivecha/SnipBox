


$(document).ready(function(){
//    $(".tabs").swipeable(true);

Materialize.toast('I am a toast!', 3000, 'rounded') // 'rounded' is the class I'm applying to the toast

$('.collapsible').collapsible();
 // Open
 $('.collapsible').collapsible('open', 0);
 
   // Close
   $('.collapsible').collapsible('close', 0);
 
   // Destroy
});