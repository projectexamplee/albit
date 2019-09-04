var threatEvent;
var threatEventList;
var threatEvent_item;
var threatEvent_amount;

function setThreatEvent(threatEventData){
	/*KEY MESUREMENT SECTION - START*/
	/*KEY MESUREMENT SECTION*/
	/*KEY MESUREMENT SECTION*/

	threatEventList = [
	{
		type_eng:"worst",
		type_kor:"심각",
		amount:threatEventData.serious
	},
	{
		type_eng:"danger",
		type_kor:"위험",
		amount:threatEventData.danger
	},
	{
		type_eng:"normal",
		type_kor:"보통",
		amount:threatEventData.normal
	},
	{
		type_eng:"access_block",
		type_kor:"접속차단",
		amount:threatEventData.connect_block
	},
	{
		type_eng:"threat_block",
		type_kor:"위협차단",
		amount:threatEventData.threat_block
	},
	{
		type_eng:"blacklist",
		type_kor:"블랙리스트",
		amount:threatEventData.black_list
	}
];

	/*위협 이벤트 데이터 바인딩 셀렉션*/
	threatEvent = d3.select("#threatEvent").selectAll("div")
						     .data(threatEventList)
							 .enter();
	/*위협 이벤트 DIV 추가*/
	threatEvent_item = threatEvent.append("div")
							       .attr("class","content_container card_small align_center justify_end")
							       .attr("id",function(d){
							     	return d.type_eng;
							       });

	threatEvent_item.append("img")
					.attr("src",function(d){
						return "img/icon/" + d.type_eng + ".png";
					})
					.attr("width",24)
					.attr("height",24);


	threatEvent_item.append("h3")
					.attr("class","dark_highlight")
					.html(d => d.amount);

	threatEvent_item.append("span")
					.attr("class",function(d){
						return d.type_eng + " small"
					})
					.html(function(d){
						return d.type_kor;
					});
}

function updateThreatEvent(threatEventData){
	threatEventList = [
		{
			type_eng:"worst",
			type_kor:"심각",
			amount:threatEventData.serious
		},
		{
			type_eng:"danger",
			type_kor:"위험",
			amount:threatEventData.danger
		},
		{
			type_eng:"normal",
			type_kor:"보통",
			amount:threatEventData.normal
		},
		{
			type_eng:"access_block",
			type_kor:"접속차단",
			amount:threatEventData.connect_block
		},
		{
			type_eng:"threat_block",
			type_kor:"위협차단",
			amount:threatEventData.threat_block
		},
		{
			type_eng:"blacklist",
			type_kor:"블랙리스트",
			amount:threatEventData.black_list
		}
	];


	threatEvent = d3.select("#threatEvent").selectAll("div")
						     .data(threatEventList)
							 .enter();


	threatEvent_item.select("h3")
					.html(d => d.amount);

}

var systemMeasurement_list;
var systemThreat_list;
var systemMeasurement;
var systemThreat;
var gaugeDegreeScale = d3.scaleLinear().domain([0,100])
  									   .range([-120,120]);

function setSystemManageIndicator(systemIndicatorData){

	systemMeasurement_list = [
		{
			type_eng:"",
			type_kor:"CPU",
			level:systemIndicatorData.cpu
		},
		{
			type_eng:"",
			type_kor:"메모리",
			level:systemIndicatorData.memory
		},
		{
			type_eng:"",
			type_kor:"네트워크",
			level:systemIndicatorData.network
		},
		{
			type_eng:"",
			type_kor:"스토리지",
			level:systemIndicatorData.storage
		}
	];
	systemThreat_list = [
		{
			type_eng:"worst",
			type_kor:"심각",
			amount:systemIndicatorData.serious
		},
		{
			type_eng:"danger",
			type_kor:"위험",
			amount:systemIndicatorData.danger
		},
		{
			type_eng:"normal",
			type_kor:"보통",
			amount:systemIndicatorData.normal
		}
	];

	/*위협 이벤트 데이터 바인딩 셀렉션*/
	systemMeasurement = d3.select("#systemMeasurement").selectAll(".systemMeasurement")
						     .data(systemMeasurement_list)
							 .enter();

	systemThreat = d3.select("#systemMeasurement").selectAll(".systemThreat")
						     .data(systemThreat_list)
							 .enter();
	/*위협 이벤트 DIV 추가*/
	/*게이지 추가*/
	systemMeasurement_item = systemMeasurement.append("div")
							       .attr("class","systemMeasurement content_container card_small align_center justify_end")
							       .style("position","relative")
							       .attr("id",function(d){
							     	return d.type_eng;
							       });

	systemMeasurement_item.append("img")
						.attr("src","img/gauge_bg.svg")
						.attr("class","gauge")
						.attr("width",65)
						.attr("height",55)
						.style("margin-bottom","4px");

	systemMeasurement_item.append("img")
			            .attr("class","needle")
						.attr("src","img/gauge_needle.svg")
						.attr("width",8)
						.attr("height",48)
						.style("transform",function(d){
							return "rotate(" + gaugeDegreeScale(d.level) + "deg)";
						});

	systemMeasurement_item.append("span")
						  .attr("class","rate font-bold")
						  .style("line-height","12.4px")
						  .html(d=>d.level + "%");

	systemMeasurement_item.append("span")
						.attr("class",function(d){
							return d.type_eng + " small measureTitle"
						})
						.html(function(d){
							return d.type_kor;
						});

	/*시스템 위협 추가*/
	systemThreat_item = systemThreat.append("div")
							       .attr("class","systemThreat content_container card_small align_center justify_end")
							       .attr("id",function(d){
							     	return d.type_eng;
							       });

	systemThreat_item.append("img")
					.attr("src",function(d){
						return "img/icon/" + d.type_eng + ".png";
					})
					.attr("width",24)
					.attr("height",24);

	systemThreat_item.append("h3")
					.attr("class","dark_highlight")
					.html(d => d.amount);

	systemThreat_item.append("span")
					.attr("class",function(d){
						return d.type_eng + " small"
					})
					.html(function(d){
						return d.type_kor;
					});
}

function updateSystemManageIndicator(systemIndicatorData){

	systemMeasurement_list = [
		{
			type_eng:"",
			type_kor:"CPU",
			level:systemIndicatorData.cpu
		},
		{
			type_eng:"",
			type_kor:"메모리",
			level:systemIndicatorData.memory
		},
		{
			type_eng:"",
			type_kor:"네트워크",
			level:systemIndicatorData.network
		},
		{
			type_eng:"",
			type_kor:"스토리지",
			level:systemIndicatorData.storage
		}
	];
	systemThreat_list = [
		{
			type_eng:"worst",
			type_kor:"심각",
			amount:systemIndicatorData.serious
		},
		{
			type_eng:"danger",
			type_kor:"위험",
			amount:systemIndicatorData.danger
		},
		{
			type_eng:"normal",
			type_kor:"보통",
			amount:systemIndicatorData.normal
		}
	];


	/*위협 이벤트 데이터 바인딩 셀렉션*/
	
	systemMeasurement = d3.select("#systemMeasurement").selectAll(".systemMeasurement")
						     .data(systemMeasurement_list)
							 .enter();

	systemMeasurement_item.select(".needle")
						  .style("transform",function(d){
								return "rotate(" + gaugeDegreeScale(d.level) + "deg)";
							});

	systemMeasurement_item.select(".rate")
						  .html(d=>d.level + "%");

	systemThreat = d3.select("#systemMeasurement").selectAll(".systemThreat")
						     .data(systemThreat_list)
							 .enter();


	systemThreat_item.select("h3")
					.html(d => d.amount);
}