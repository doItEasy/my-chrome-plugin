
if(location.href.indexOf("listnew")!=-1){
	setInterval(function(){
		var url ="http://invest.ppdai.com/loan/listnew?LoanCategoryId=4&CreditCodes=4%2C5%2C&ListTypes=&Rates=&Months=2%2C&AuthInfo=&BorrowCount=&didibid=&SortType=0&MinAmount=500&MaxAmount=5000";
		$.get(url,function(data){
		  	var parser = new DOMParser();
		    var doc=parser.parseFromString(data, "text/html");

			$(doc).find(".wapBorrowList ol:lt(4)").each(function(){
		    	var href = $(this).find(".listtitle a").attr("href");
				window.open(href);
			})
		});
	},10000);

		
}


if(location.href.indexOf("loan/info")!=-1){
	console.log("开始购买");

	//借款人信息
	//认证信息
	//统计信息
	//历史逾期次数

	var count = 0 ;
	var i = 0;
	var money = 0;
	$(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").each(function(){
		var num = $(this).text().replace(/[^，0-9]/ig, "");
		console.log(num);
		if(num==0){//逾期次数为0
			count++;
		}
		if(i==8){
			money = num;
			console.log("历史待还"+money);
		}
		i++;
	})


	console.log(count);


	if(count==3&&money<1000000){
		$(".inputAmount").val(100);//购买金额100
		$(".subBtn").click();

		setTimeout(function(){
			$("#btBid").click();
		},200);
	}

	setTimeout(function(){window.close();},1500);

}





// if(location.href.indexOf("transferDetail")!=-1){
// 	var a = document.getElementsByClassName("all-in")[0];
// 	a.click();

// 	setTimeout(function(){
// 		$('#buy_form').submit();
// 	},10)

// }


// if(location.href.indexOf("transfer/accept")!=-1){
// 	$("#pay_password").val("626386");
// 	setTimeout(function(){
// 		$("#sure_btn_id1").click();
// 	},10)
	
// 	console.log("购买成功");
// }



