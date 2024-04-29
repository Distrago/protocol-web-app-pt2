fileDataName = 0;

function get_fileData(){
	$.ajax({
		url: '/edit_json/load', 
		type: 'get',
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			console.log(data);
			fillSelectorFile(data);
			fileDataName = data.result;
		},
		error: function (error) {
		}
	
	})
}
function get_web_document(){
	var doc = {"id_document": FileSelect.value};
	
	$.ajax({
		url: '/edit_json/load_web_data_edit', 
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(doc), //stringify конвертирует строку в json док
		success: function(data){
			read_web_document(data);
		},
		error: function (error) {

		}
	})
}

function sendWebDocument(){
	var datas = {
		'documentName': FileSelect.value,
		'data':newMass
	}
	$.ajax({
		url: '/edit_json/save_web_data_edit', 
		type: 'post',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(datas), //stringify конвертирует строку в json док
		success: function(data){
			console.log(data)
		},
		error: function (error) {

		}
	})
}