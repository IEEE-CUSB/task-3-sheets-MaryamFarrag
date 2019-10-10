$(document).ready(function(){
    var firstWorkshop = ''
    var secondWorkshop = ''
    $(".workshop span").click(function(){
        $(this).parent().toggleClass("check");
        if($(".check").length > 4){//check if user chose more than two workshops
            window.alert("You can only chose two workshops!")
            $(this).parent().toggleClass("check");
            return false
        }
        $(this).toggleClass("check")
        let value = $(this).parent().siblings()[1].value// the value the user is chosing

        if($(this).hasClass("check")){// check whether the user is clicking or unclicking(here he is clicking)
            firstWorkshop == ''? firstWorkshop = value: secondWorkshop = value; //check which value is empty and fill it
            //console.log($(this).parent().siblings()[1].checked)
            $(this).parent().siblings()[1].checked = true
        }
        else{
            if(secondWorkshop == value){
                secondWorkshop = ''
                $(this).parent().siblings()[1].checked = false

            }
            else{
                firstWorkshop = ''
                $(this).parent().siblings()[1].checked = false
            }
        }
        
        //write to user which workshop is first and which is second.
        $("#chosen #first").html("First workshop: "+firstWorkshop)
        $("#chosen #second").html("Second workshop: "+secondWorkshop);
        /***REMEMBER TO CHECK IF THE USER CHOSE KUST ONE WORKSHOP BEFORE SUBMITTING! :)))))***/
      /*  console.log("first=>",firstWorkshop,"secon=>", secondWorkshop)
        console.log($(".check").length) */
    });
    $("button").click(function(){
        $('input[name="workshop"]:checked').each(function() {
            console.log(this.value);
         });
      //  window.alert("year=>",$('#year').find(":selected").text())
    })
   
});

