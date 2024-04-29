var CRB_RUB_RATE;

function get_crd_daily_ru(){
	//'https://www.cbr-xml-daily.ru/daily_json.js'
	$.getJSON($SCRIPT_ROOT + "/cache/crb/daily_json", {
	},function (data){
		CRB_RUB_RATE = data.Valute;
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
} 