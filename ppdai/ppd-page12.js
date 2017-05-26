var arr = [];

if(location.href.indexOf("listnew")!=-1){
	var page = 1;
	setInterval(function(){
		var url ="http://invest.ppdai.com/loan/listnew?LoanCategoryId=4&SortType=0&PageIndex="+page+"&CreditCodes=5%2C&Months=4%2C&MinAmount=2000&MaxAmount=6000";
		// var url ="http://invest.ppdai.com/loan/listnew?LoanCategoryId=4&SortType=0&PageIndex="+page+"&CreditCodes=5%2C&Months=2%2C&MinAmount=2000&MaxAmount=5200";
		$.get(url,function(data){
		  	var parser = new DOMParser();
		    var doc=parser.parseFromString(data, "text/html");

			$(doc).find(".wapBorrowList ol:lt(10)").each(function(){
		    	var href = $(this).find(".listtitle a").attr("href");
		    	var id = href.split("=")[1];

		    	$.get(href,function(data){
				  	var parser = new DOMParser();
				    var doc2=parser.parseFromString(data, "text/html");
					excuct(doc2,id);
				});
			})

		});
		page++;
	},10000);

}


function excuct(doc,listingId){
	var info = "";
	//性别
	var a1 = $(doc).find(".lender-info").find("p").eq(0).text();
	info = a1;
	//年龄
	var a2 = $(doc).find(".lender-info").find("p").eq(1).text().replace(/[^，0-9]/ig, "");
	info =info+ ">>>>>>年龄："+a2;


	var balance = $(doc).find(".newLendDetailMoneyLeft").find("dd").eq(0).text().replace(/[^，0-9]/ig, ""); //本次借款金额

	//统计信息
	var d0 = $(doc).find(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(0).text().replace(/[^，0-9]/ig, "");//借款次数
	var d1 = $(doc).find(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(5).text().replace(/[^，0-9]/ig, "");//0-15天逾期
	var d2 = $(doc).find(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(6).text().replace(/[^，0-9]/ig, "");//15天以上逾期
	var d3 = $(doc).find(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(7).text().replace(/[^，0-9]/ig, "");//历史借款总额
	var d4 = $(doc).find(".lendDetailTab_tabContent").find(".tab-contain").eq(2).find(".num").eq(8).text().replace(/[^，0-9]/ig, "");//待还总额


	info = info+">>>>>>借款金额:"+balance;
	info = info+">>>>>>借款次数:"+d0;
	info = info+">>>>>>逾期次数:"+d1+"和"+d2;
	info = info+">>>>>>历史借款:"+d3/100;
	info = info+">>>>>>历史待还:"+d4/100;
	info = info+">>>>>>认证情况："

	var c1 =false;	//人行认证
	var c2 =false;	//学历认证
	var c3 =false;	//户籍认证
	var c4 =false;	//视频认证

	$(doc).find(".record-info").find("li").each(function(){
		info= info+$(this).text()+";";
		if($(this).text().indexOf("人行")!=-1){
			c1 = true;
		}
		if($(this).text().indexOf("学历")!=-1){
			c2 = true;
		}
		if($(this).text().indexOf("户籍")!=-1){
			c3 = true;
		}
		if($(this).text().indexOf("视频")!=-1){
			c4 = true;
		}
	})

	console.log(info);


	var sex =false;
	if(a1.indexOf("女")!=-1){
		sex = true;
	}
	

	var condition0 = d1==0&&d2==0&&d0<12&&d0>1; //逾期必须为0和借款次数小于10
	var condition1 = d3<3000001; //历史借款总额
	var condition2 = d4<680001 || (c1&&d4<850001) || (c2&&d4<750001)  || (c3&&d4<750001) || d3/d4>3.5; //待还总额
	// var condition3 = c1||c2||c3||c4; //人行或学历认证或户籍认证
	var condition3 = c1||c2||c3||c4 || (d4<500001&&d4>0&&d0>1) ; //人行或学历认证或户籍认证
	var condition5 = a2>19&&a2<50 //年龄区间
	var condition7 = (d4/balance) < 250; //待还总额不能大于本次借款金额的3倍


	if(condition0&&
		condition1&&
		condition2&&
		condition3&&
		condition5&&
		condition7){

		// $(doc).find(".inputAmount").val(money);//购买金额100
		// $(doc).find(".subBtn").click();
		var money = 100; //购买金额
       	var code = $('#couponSelect').children('option:selected').val();
	    var activityId =  $('#couponSelect').children('option:selected').attr("activityId");
	    var couponAmount = $('#couponSelect').children('option:selected').attr("couponAmount");
		console.log("决定购买:"+listingId);
	    if(localStorage.getItem("listingId").indexOf(listingId)!=-1){
	    	console.log("已经买过了:"+listingId+"，不再购买");
	    	return false;
	    }


        arr = JSON.parse(localStorage.getItem("listingId"));
		if(arr.length<300){
			arr.push(listingId);
		}else{
			arr.splice(0,1);
			arr.push(listingId);
		}
		localStorage.setItem("listingId", JSON.stringify(arr));

        var data = {
            Reason: "",
            Amount: money,
            ListingId: listingId,
            UrlReferrer:'1',
            CouponCode:code,
            CouponAmount:couponAmount,
            ActivityId:activityId,
            SubListType:'0'
        };

        $.post("/Bid/Bid",data,function(e) {
        		console.info(e.Message+listingId);
        	if(e.Message=='投标成功'){

        	}
        });

	}
}



