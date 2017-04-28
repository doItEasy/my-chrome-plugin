
if(location.href.indexOf("listnew")!=-1){
	setInterval(function(){
		var url ="http://invest.ppdai.com/loan/listnew?LoanCategoryId=4&CreditCodes=5%2C&ListTypes=&Rates=&Months=2%2C&AuthInfo=&BorrowCount=&didibid=&SortType=0&MinAmount=1200&MaxAmount=5200";
		$.get(url,function(data){
		  	var parser = new DOMParser();
		    var doc=parser.parseFromString(data, "text/html");

			$(doc).find(".wapBorrowList ol:lt(4)").each(function(){
		    	var href = $(this).find(".listtitle a").attr("href");
				window.open(href);
			})
		});
	},5000);

		
}


if(location.href.indexOf("loan/info")!=-1){
	console.log("开始购买");
	// var count = 0 ;
	// var i = 0;
	// var money = 0;
	// $(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").each(function(){
	// 	var num = $(this).text().replace(/[^，0-9]/ig, "");
	// 	console.log(num);
	// 	if(num==0){//逾期次数为0
	// 		count++;
	// 	}
	// 	if(i==8){
	// 		money = num;
	// 		console.log("历史待还"+money);
	// 	}
	// 	i++;
	// })


	//性别
	var a1 = $(".lender-info").find("p").eq(0).text();
	var sex =false;
	if(a1.indexOf("女")!=-1){
		sex = true;
	}
	//年龄
	var a2 = $(".lender-info").find("p").eq(1).text().replace(/[^，0-9]/ig, "");
	var age =false;
	if(a2>20&&a2<45){
		age = true;
	}

	var c1 =false;	//人行认证
	var c2 =false;	//学历认证


	$(".record-info").find("li").each(function(){
		console.log($(this).text());
		if($(this).text().indexOf("人行")!=-1){
			c1 = true;
		}
		if($(this).text().indexOf("学历")!=-1){
			c2 = true;
		}
	})


	//统计信息
	var d1 = $(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(5).text().replace(/[^，0-9]/ig, "");//0-15天逾期
	var d2 = $(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(6).text().replace(/[^，0-9]/ig, "");//15天以上逾期
	var d3 = $(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(7).text().replace(/[^，0-9]/ig, "");//历史借款总额
	var d4 = $(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(8).text().replace(/[^，0-9]/ig, "");//待还总额
	var money = 100; //购买金额

	// console.log("性别>>"+a1+">>年龄>>"+a2+">>0-15天逾期>>"+d1+">>15天以上逾期>>"+d2+">>历史借款总额>>"+d3+">>待还总额>>"+d4);


	if(d1==0&&d2==0&&d3<2500000&&d4<650000){
		$(".inputAmount").val(money);//购买金额100
		$(".subBtn").click();

		setTimeout(function(){
			$("#btBid").click();
		},120);
	}

	setTimeout(function(){window.close();},3000);

}







