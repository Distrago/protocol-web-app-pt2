var list_manager = [] //компоненгт таблицы менеджеров
//asdfww212313414221

function read_manager(){
	$.getJSON($SCRIPT_ROOT + '/protocol/user/manager',{
	}, function(data){
		for(var i = 0; i< data.result.length; i++){
			list_manager.push({
				"id_user": data.result[i]["id_user"],
				"name": data.result[i]["name"],
				"mail": data.result[i]["mail"],
				"phone": data.result[i]["phone"],
				"rank_position": data.result[i]["rank_position"],
				"district": data.result[i]["district"],
				"photo": data.result[i]["photo"]
			});
		}
		if(document.location.pathname == "/protocol"){
			getQueryParametrs();
			requirementsAddFileChange();
			requirementsAddEventListener();
			sourceProductClassifierAddEventListeners();
			requirementsSourceProductClassifierAddEventListeners();
		}
		else{
			var queryString = location.search;
			var checkNewVersion = queryString.search("d_") != -1 || queryString.search("s_") != -1 ? true : false;
			
			if(!checkNewVersion)
				get_task_bitrix24(InfoDeal.id_deal);
		}
	})
	.fail(function(){
		read_manager();
	})
}

function search_user_info(id_user){
	for(var i=0; i < list_manager.length; i++){
		if(id_user == list_manager[i].id_user)
			var result = list_manager[i];
	}
	
	return result;
}