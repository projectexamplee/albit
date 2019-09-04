var indicator_Xmax = 0;
var indicator_current_x = 0;
var indicator_Samples = 60;
var indicators_svg_width;
var indicators_svg_height;
var indicators_svgSize;
var status_list = [

		{
			"title":"접속차단지표",
			"title_eng":"ind_accessBlock",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"위험차단지표",
			"title_eng":"ind_threatBlock",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"네트워크 플로우지표",
			"title_eng":"ind_networkFlow",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"네트워크 응답 품질",
			"title_eng":"ind_networkQuality",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"사용자 지표",
			"title_eng":"ind_user",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"어플리케이션 지표",
			"title_eng":"ind_app",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"네트워크 전송 데이터 지표",
			"title_eng":"ind_resData",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"네트워크 수신 데이터 지표",
			"title_eng":"ind_reqData",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"서비스 지표",
			"title_eng":"ind_service",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"출발지 노드 지표",
			"title_eng":"ind_departure",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"도착지 노드 지표",
			"title_eng":"ind_arrival",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"자원 사용지표",
			"title_eng":"ind_resource",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"CPU",
			"title_eng":"ind_cpu",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"메모리",
			"title_eng":"ind_memory",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"네트워크",
			"title_eng":"ind_network",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		},
		{
			"title":"스토리지",
			"title_eng":"ind_storage",
			"data":[],
			"scaleObject":{
				xScale:null,
				ySale:null,
				xAxis:null
			},
			"line":null,
			"area":null
		}
];

function setSystemIndicator(indicatorData){

	var statusAnalysis = d3.select("#statusAnalysis")
						   .selectAll("div")
						   .data(status_list)
						   .enter();

	var statusAnalysis_item = statusAnalysis.append("div")
							                .attr("class","content_container col4_mg_1x")
							                .attr("id",function(d){
							                	return d.title_eng;
							                })
							                .style("margin-bottom","8px");

	statusAnalysis_item.append("div")
					   .attr("class","ibox-title")
					   .html(function(d){
					   		return d.title;
					   });

	status_list.forEach(function(item){
		indicatorData.index = indicator_current_x;
		item.data.push(indicatorData);
		drawLineChart(item);
	});
}

function updateSystemIndicator(indicatorData){
	indicator_current_x++;
	status_list.forEach(function(item){
		indicatorData.index = indicator_current_x;
		item.data.push(indicatorData);
		updateLineChart(item);
	});
}

function drawLineChart(item){
	
	/*인자로 받은 객체로 사이즈 및 svg,그룹 설정*/
	indicators_svg_width = $("#" + item.title_eng).width();
	indicators_svg_height = 128;
	indicators_svgSize = {margin_top:8,margin_left:48,margin_bottom:24,margin_right:12,inner_width:0,inner_height:0};

	indicators_svgSize.inner_width = indicators_svg_width - indicators_svgSize.margin_left - indicators_svgSize.margin_right;
	indicators_svgSize.inner_height = indicators_svg_height - indicators_svgSize.margin_top - indicators_svgSize.margin_bottom;
	
	var svg = d3.select("#" + item.title_eng).append("svg")
						  .attr("width",indicators_svg_width)
						  .attr("height",indicators_svg_height);

	var svg_g = svg.append("g")
			   .attr("id",function(d){
			   	return d.title_eng + "_g";
			   })
			   .attr("transform","translate(" + indicators_svgSize.margin_left + "," + indicators_svgSize.margin_right + ")");

	
	var grid_xScale = d3.scaleLinear()
						 .domain([0,indicator_Samples])
						 .range([0,indicators_svgSize.inner_width]);

	var grid_x = d3.axisBottom(grid_xScale)
				   .tickValues([0,5,10,15,20,25,30,35,40,45,50,55,60])
			       .tickSize(-indicators_svgSize.inner_height)
			       .tickFormat("");

	var grid_yScale = d3.scaleLinear()
						 .domain([0,1000])
						 .range([indicators_svgSize.inner_height,0]);

	var grid_y = d3.axisLeft(grid_yScale)
				   .tickValues([0,200,400,600,800,1000])
			       .tickSize(-indicators_svgSize.inner_width)
			       .tickFormat("");


	/*x,y스케일, 라인 함수도 인자로 받은 객체에 저장*/
	item.scaleObject.xScale = d3.scaleLinear()
								.domain([0,indicator_Xmax])
							  	.range([indicators_svgSize.inner_width*(1 - indicator_Xmax/indicator_Samples) ,indicators_svgSize.inner_width]);


	item.scaleObject.yScale = d3.scaleLinear()
								.domain([0,1200])
							  	.range([indicators_svgSize.inner_height,0]);

	item.scaleObject.xAxis = d3.axisBottom(item.scaleObject.xScale);

	var axis_y = d3.axisLeft(item.scaleObject.yScale)
				   .tickValues([0,200,400,600,800,1000,1200]);

	item.line = d3.line()
				  .x(function(d){return item.scaleObject.xScale(d.index);})
				  .y(function(d){return item.scaleObject.yScale(d.value);});

	item.area = d3.area()
				  .x(function(d){return item.scaleObject.xScale(d.index);})
				  .y0(function(d){return item.scaleObject.yScale(0);})
				  .y1(function(d){return item.scaleObject.yScale(d.value);});

	svg_g.append("path")
		 .attr("class","green_line")
		 .attr("id", function(d){
		 	return d.title_eng + "_path";
		 })
		 .attr("d",item.line(item.data));

	svg_g.append("path")
		 .attr("class","green_area")
		 .attr("id", function(d){
		 	return d.title_eng + "_area";
		 })
		 .attr("d",item.area(item.data));

	svg_g.append("circle")
		 .attr("class","current_point")
		 .attr("id", function(d){
		 	return d.title_eng + "_circle";
		 })
		 .attr("r",2)
		 .attr("cx",item.scaleObject.xScale(item.data[0].index))
		 .attr("cy",item.scaleObject.yScale(item.data[0].value));

    svg_g.append("g")
		 .attr("class", "grid")
	     .attr("transform", "translate(0," + indicators_svgSize.inner_height + ")")
	     .call(grid_x);

	svg_g.append("g")
		 .attr("class", "grid")
	     .attr("transform", "translate(0,0)")
	     .call(grid_y);

	 svg_g.append("g")
		 .attr("class", "y axis")
	     .attr("transform", "translate(0,0)")
	     .call(axis_y);

	 svg_g.append("g")
		 .attr("class", "x axis")
		 .attr("id",function(d){
		 	return "xAxis_" + d.title_eng;
		 })
	     .attr("transform", "translate(0," + indicators_svgSize.inner_height + ")")
		 .call(item.scaleObject.xAxis);


}

function updateLineChart(item){

	if(indicator_Samples<item.data.length){
		item.data.shift();
	}
	var last_idx = item.data.length - 1;
	indicator_Xmax = item.data.length;
	/*현재 세션의 순번이 샘플수보다 작을때*/
	if(indicator_Xmax<indicator_Samples){
		item.scaleObject.xScale.domain([0,indicator_Xmax-1])
					  	.range([indicators_svgSize.inner_width*(1 - indicator_Xmax/indicator_Samples) ,indicators_svgSize.inner_width]);
	}
	/*현재 세션의 순번이 샘플보다 클때*/
	else{
		item.scaleObject.xScale.domain([indicator_current_x - (indicator_Xmax - 1) ,indicator_current_x])
					  .range([indicators_svgSize.inner_width*(1 - indicator_Xmax/indicator_Samples) ,indicators_svgSize.inner_width]);

	}

	var indicator_xAxis_ticks = [];

    for(i=indicator_current_x;0<=i;i--){
    	if(i%5==0){
    		indicator_xAxis_ticks.push(i);
    	}
    	if(indicator_xAxis_ticks.length==12){
    		break;
    	}
    	/*max값보다 클경우 틱값에서 0을 뻬줌*/
    }

    item.scaleObject.xAxis.tickValues(indicator_xAxis_ticks);

    d3.select("#xAxis_"+item.title_eng)
      .transition()
      .delay(200)
      .duration(200)
      .call(item.scaleObject.xAxis);

	/*업데이트되는 차트 그리기*/
	if(item.data.length<indicator_Samples){
		d3.select("#"+item.title_eng + "_g").append("line")
				      .attr("class","moving_line green_line")
				      .attr("x1",item.scaleObject.xScale(item.data[last_idx].index))
				      .attr("x2",item.scaleObject.xScale(item.data[last_idx].index))
				      .attr("y1",item.scaleObject.yScale(item.data[last_idx].value))
				      .attr("y2",item.scaleObject.yScale(item.data[last_idx].value))
				      .transition()
				      .duration(200)
				      .attr("x2",item.scaleObject.xScale(item.data[last_idx].index))
				      .attr("y2",item.scaleObject.yScale(item.data[last_idx].value))
				      .on('end',function(){
				      	d3.select(this).remove();
				      });
	}
	d3.select("#"+item.title_eng + "_g").select(".current_point")
  					  .transition()
  					  .duration(200)
    				  .attr("cx",item.scaleObject.xScale(item.data[last_idx].index))
    				  .attr("cy",item.scaleObject.yScale(item.data[last_idx].value));

	d3.select("#"+item.title_eng + "_g").select(".green_line")
					  .transition()
					  .duration(10)
					  .delay(200)
    				  .attr("d",item.line(item.data));

    d3.select("#"+item.title_eng + "_g").select(".green_area")
										.transition()
									    .duration(10)
									    .delay(200)
						 			    .attr("d",item.area(item.data));

}