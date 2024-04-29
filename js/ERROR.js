var queueErrorCout = 0;
function ErrorLog(errorTextMassage, queueStatus){
	overlay.children[0].textContent = "Произошла Ошибка!! Код ошибки: " + errorTextMassage;
	overlay.style.display = "flex";
	queueErrorCout = 0;

	setTimeout(function(){
			if(queueStatus){
				overlay.children[0].textContent = "Сейчас вы будете удалены из очереди, для решения проблемы свяжитесь с администратором.";
				$.post($SCRIPT_ROOT + '/errorMessageLogger',{
					errorText: errorTextMassage
					}, function(data){
						setTimeout(function(){
							location.reload();
						}, 5000);
						console.log("Ошибка записанна в лог");
				})
			}
			else{
				overlay.children[0].textContent = "Для решения проблемы свяжитесь с администратором или повторите действие позже.";
				setTimeout(function(){
					overlay.style.display = "none";
				}, 5000);
			}
		},1000);

}