var dealer_list = []

function get_dealer_list(){
	$.getJSON($SCRIPT_ROOT + '/commercial_offer_main/dealer_info',{
	}, function(data){
		for(var i = 0; i < data.result.length; i++){
			dealer_list.push({
				"id_dealer": data.result[i].id_dealer,
				"img_logoTop": data.result[i].img_logoTop,
				"img_logoBottom": data.result[i].img_logoBottom,
				"textTop": data.result[i].textTop,
				"textBottom": data.result[i].textBottom,
				"dealerBitrix24": data.result[i].dealerBitrix24,
				"companyName": data.result[i].companyName
			});
		}
		changeInfoToDealer();
	})
	.fail(function(jqXHR, exception){
		//var msg = "Status Error: " + jqXHR.status + "; exeption: " + exception + "; responseText: " + jqXHR.responseText;
		//ErrorLog(msg, false);
	});
}