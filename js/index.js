$(function(){
    var database=[];
    $.setL=function(key,value){
        localStorage[key]=JSON.stringify(value);
    }
    $.getL=function(key){
      return  JSON.parse(localStorage[key])
    }
    var render=function(){
        $('.content').empty();
        database= $.getL('data');
        for(var i=0;i<database.length;i++){
            var v=database[i];
            $('<li  data-id="'+ v.id+'"  class="inner '+(v.isDone?'wangcheng':'')+'"> <div class="check">✓</div> <p>'+ v.name+'</p> <input type="text" value="'+ v.name+'"> <div class="delete">⨉</div> </li>').prependTo('.content');
        }
    }
    if(localStorage.data){
        database= $.getL('data');
        $('.footer .lenght').find('p').html(database.length);
        render();

    }
    $('.header input').on('keyup',function(e){
        if(e.keyCode===13){
            var v = $(this).val().trim();
            if(v===""){
                return;
            }
            $('<li class="inner"> <div class="check"></div> <p>'+v+'</p> <input type="text" value="'+v+'"> <div class="delete"></div> </li>').appendTo('.content');
            if(database.length===0){
               var id=1;
            }else{
                var id=database[database.length-1].id+1;
            }
           database.push(
               {id:id,name:v,isDone:0}
           )
            $.setL('data',database);
            $('.footer .lenght').find('p').html(database.length);
            render();
            $(this).val('').focus();
        }
    })
    $('.content').on('click','.inner .check',function(){
       var li= $(this).parent();
        var id=Number(li.attr('data-id'));
        li.toggleClass('wangcheng');
        if(li.hasClass('wangcheng')){
            var x=1;
        }else {
            var x=0;
        }
        for(var i=0;i<database.length;i++){
            if(database[i].id === id){
                 database[i].isDone=x;
            }
        }
        $.setL('data',database);

    })
    $('.content').on('dblclick','.inner',function(){
        $(this).addClass('bianji');
        $(this).find('input').focus();
        var el=$(this).find('input');
        el.val(el.val()).focus();
    })
    $('.content').on('blur','.inner input',function(){
       var li=$(this).parent();
        var id=Number(li.attr('data-id'));
        li.removeClass('bianji');
        li.find('p').text($(this).val());
        for(var i=0;i<database.length;i++){
            if(database[i].id === id){
              database[i].name=$(this).val();
            }
        }
        $.setL('data',database);


    })
    $('.content').on('click','.inner .delete',function(){

         var li=$(this).parent();
         var id=Number(li.attr('data-id'));
         li.remove();
         var newarr=[];
         for(var i=0;i<database.length;i++){
            if(database[i].id !== id){
                newarr.push(database[i]);
            }
        }
        database=newarr;
        $.setL('data',database);
        $('.footer .lenght').find('p').html(database.length);
        render();
    })

})
