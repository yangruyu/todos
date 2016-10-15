var todo=angular.module('todo',['ngAnimate']);
todo.controller('mian',['$scope','$timeout',function ($scope,$timeout) {
    $scope.title="Todos";
   /* setInterval(function () {
        $timeout(function () {
            var date=new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            s=(s<10)?('0'+s):s;
            $scope.title=h+':'+m+':'+s;
        },0)
    },500)*/
    $scope.name='';
    $scope.todos=[];
    if(localStorage.shuju){
        $scope.todos=JSON.parse(localStorage.shuju);
    }else{
        $scope.todos=[];
    }
    $scope.save=function () {
        localStorage.shuju=JSON.stringify($scope.todos);
    }

    $scope.delete=function (id) {
        var index ;
        for(var i=0;i<$scope.todos.length;i++){
            if($scope.todos[i].id===id){
                index=i;
            }
        }
        $scope.todos.splice(index,1);
    }
        $scope.focus=function (e) {
            $timeout(function () {
            $(e.currentTarget)
                .find('input')
                .trigger('focus');
            },0)
        }
    $scope.add=function (e) {
        if(e.keyCode === 13){
            if($scope.todos.length===0){
                 var id=0;
            }else {
            var max=-Infinity;
            for(var i=0;i<$scope.todos.length;i++){
                var value=$scope.todos[i];
                if(value.id>max){
                    max=value.id;
                }

            }
            var id=max+1;
        }
                if($scope.name===''){
                    return;
                }
                $scope.todos.unshift({id:id,name:$scope.name,isDone:false});
                console.table($scope.todos)
                $scope.name="";
        }
    }
    $scope.clear=function () {
        var arr=[];
        for(var i=0;i<$scope.todos.length;i++){
            if(!$scope.todos[i].isDone){
                arr.push($scope.todos[i]);
            }

        }
        $scope.todos=arr;
    }

}])
/*    {
 id:1,
 listsName:'买车',
 theme:'blue',
 todo:[
 {id:1,name:'保时捷',isDone:false},
 {id:2,name:'宝马',isDone:true}
 ]
 },
 {
 id:2,
 listsName:'买房',
 theme:'yellow',
 todo:[
 {id:1,name:'别墅',isDone:false},
 {id:2,name:'单身公寓',isDone:true},
 {id:3,name:'沙滩别墅',isDone:true},
 {id:4,name:'海底飞船',isDone:true},
 {id:5,name:'沙滩别墅',isDone:false},
 {id:6,name:'露天别墅',isDone:false}

 ]
 },
 {
 id:3,
 listsName:'买书',
 theme:'green',
 todo:[
 {id:1,name:'别墅',isDone:false},
 {id:2,name:'单身公寓',isDone:true},
 {id:3,name:'沙滩别墅',isDone:true},
 {id:4,name:'海底飞船',isDone:true},
 {id:5,name:'沙滩别墅',isDone:false},
 {id:6,name:'露天别墅',isDone:false}

 ]
 }*/
/* $scope.tianjia=function () {
 var list={id:1,name:'',isDone:false};
 $scope.currentlist.todo.push(list);
 }*/