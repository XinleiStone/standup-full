var chaid = function() {
    var chart_config;
    var containerId = '';
    var width = 750;
    var height = 570;
    var DataArray = [];
    var chartName = "医疗改革意见";
    var seriesPutData = [];

    function treeChart(chaidData, options) {

        checkOptions(options);
        //先获取根节点
        var nodeData = chaidData.nodes[0];
        generateData(nodeData);
        generatePieData(nodeData);
        generatePie(DataArray);
        //console.log(seriesPutData);
        drawGraph();

        function drawGraph() {
            chart_config = {
                chart: {
                    container: "#" + containerId,

                    levelSeparation: 10,
                    nodeAlign: 'BOTTOM',

                    connectors: {
                        type: 'step'
                    },
                    node: {
                        HTMLclass: 'nodeExample1',
                        collapsable: true
                    },
                    padding: 50,
                    scrollbar: 'fancy'
                },

                nodeStructure: nodeData
            };

            $("#" + containerId).attr("class", $("#" + containerId).attr("class") + " chaid-container")
                .append(
                    "<div id='btdiv' style='width: 100%; padding-left: 15px'>" + "<button id='chaid-pie' class='treebtn treebtn4 treebtn-default treebtn-xs'>饼 图</button> " + "<img src='images/downloadImg.png' id='saveImg' title='保存图片' class='treebtn treebtn5'></button> " + "</div>"
                );

            // save image
            $("#saveImg").click(function() {
                $("#" + containerId).css("overflow", "visible");
                $("#btdiv").hide();
                html2canvas($("#" + containerId).children("div"), {
                    background: "#fff",
                    onrendered: function(canvas) {
                        var triggerDownload = $("<a>").attr("href", canvas.toDataURL()).attr("download", "img.png").appendTo("body");
                        triggerDownload[0].click();
                        triggerDownload.remove();
                    }
                });
                $("#" + containerId).css("overflow", "hidden");
                $("#btdiv").show();
            });

            $("#chaid-pie").click(function() {
                pieCahart();
            });

            new Treant(chart_config);

            $("#" + containerId).children("div").append("<div style='font-size: 18px; font-family: \"微软雅黑\", Helvetica, Arial, sans-serf; position: absolute; top: 10px; left: 15px;'><p>回归算法</p></div>");
            $("#" + containerId).children("div").append("<div style='font-size: 12px; font-family: \"微软雅黑\", Helvetica, Arial, sans-serf; position: absolute; top: 38px; left: 15px;'><p>CHAID</p></div>");
        }

    }

    function pieCahart() {
        $("#" + containerId).children().hide();
        $("#" + containerId).append("<div id='pieid' style='width: " + $("#" + containerId).width() + "px; height: " + $("#" + containerId).height() + "px;'></div>")
            //$("#"+containerId).attr("class", "chart chaid-container");


        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: '回归算法',
                subtext: 'CHAID',
                textStyle: {
                    fontWeight: 'normal'
                },
                top: 5,
                left: 10,
                subtextStyle: {
                    color: 'black'
                }
            },

            legend: {
                selectMode: false,
                orient: 'vertical',
                data: ['健康', '不健康'],
                top: 100,
                right: '18%'
            },
            series: seriesPutData
        };

        var dom = document.getElementById("pieid");
        var myChart = echarts.init(dom);
        myChart.setOption(option, true);

        var $pieTable = $("<table class='table table-bordered' id='km-pieTable'></table>");
        $pieTable.attr("style", "width: " + (900 * 0.27) + "px; text-align: center; font-family: '微软雅黑', Helvetica, Arial, sans-serf;" +
            "position: absolute; bottom: 60px; right: 20px;").appendTo($("#pieid"));
        $pieTable.append("<tr><td>同意</td><td>"+ chaidData.agree +"("+ (chaidData.agree / (chaidData.disagree + chaidData.agree) * 100).toFixed(2)  +"%)</td></tr>");
        $pieTable.append("<tr><td>不同意</td><td>"+ chaidData.disagree +"("+ (chaidData.disagree / (chaidData.disagree + chaidData.agree) * 100).toFixed(2)  +"%)</td></tr>");

        $("#" + containerId).append(
            "<div id='btdiv' style='width: 100%; padding-left: 15px'>" + "<img src='images/downloadImg.png' id='pie-saveImg' title='保存图片' class='treebtn treebtn5'></button> " + "<button id='chaid-pie-close' class='treebtn treebtn4 treebtn-default treebtn-xs'>树 图</button> " + "</div>"
        );

        $("#chaid-pie-close").click(function() {
            $(this).remove();
            $("#pieid").remove();
            $("#pie-saveImg").remove();
            $("#" + containerId).children().show();
        });

        $("#pie-saveImg").click(function() {
            //div2img.downImg("containerId", "no");
            html2canvas($("#pieid"), {
                background: "#fff",
                onrendered: function(canvas) {
                    var triggerDownload = $("<a>").attr("href", canvas.toDataURL()).attr("download", "img.png").appendTo("body");
                    triggerDownload[0].click();
                    triggerDownload.remove();
                }
            });
        });
    }

    function generateData(data) {
        //节点的类别不为空，并且有子节点
        if (data.classification && data.children) {
            //得到子节点
            var nextChildren = data.children;
            //遍历子节点
            for (var i = 0; i < nextChildren.length; i++) {
                //获取第一个子节点
                var temp = nextChildren[i];
                nextChildren[i] = {
                    text: {
                        title: temp.variety

                    },
                    HTMLclass: "edge-text",
                    collapsable: false,

                    children: [temp]
                };
            }
            data.children = [{
                text: {
                    name: data.classification,
                    title: "调整P值=" + data.p + "，卡方= " + data.square
                },
                collapsable: false,
                HTMLclass: "edge-text",
                children: nextChildren
            }];
        }

        if (data.children) {
            for (var j = 0; j < data.children.length; j++) {
                generateData(data.children[j]);
            }
        }

        if (data.classification || data.variety) {
            data.innerHTML = "<table class='table table-striped'><tr><td>类别</td><td>%</td><td>N</td></tr>" +
                "<tr><td>同意</td><td>" + (data.agree / (data.agree + data.disagree)).toFixed(2) + "</td><td>" + data.agree + "</td></tr>" +
                "<tr><td>不同意</td><td>" + (data.disagree / (data.agree + data.disagree)).toFixed(2) + "</td><td>" + data.disagree + "</td></tr></table>";
        }
    }


    function mergeArray(arr2, arr1) {
        var _arr = [];
        for (var i = 0; i < arr1.length; i++) {
            _arr.push(arr1[i]);
        }
        var _dup;
        for (var i = 0; i < arr2.length; i++) {
            _dup = false;
            for (var _i = 0; _i < arr1.length; _i++) {
                if (arr2[i] === arr1[_i]) {
                    _dup = true;
                    break;
                }
            }
            if (!_dup) {
                _arr.push(arr2[i]);
            }
        }

        return _arr;
    }

    function contains(a, obj) {
        var i = a.length;
        while (i--) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;

    }

    function generatePieData(data) {

        chartName = data.name;
        // DataArray.push(data);
        if (data.classification && data.children) {
            var nextChildren = data.children;
            DataArray.push(data);
        }
        if (data.children) {
            for (var j = 0; j < data.children.length; j++) {
                generatePieData(data.children[j]);
            }
        }
    }

    function generatePie(data) {
        var childData = [];
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].children.length; j++) {
                childData.push(data[i].children[j]);
            }
        }

        var r1 = 0;
        var r2 = 0;
        var len;
        var noChildData = [];
        var color1 = '#FF8247';
        var color2 = '#7D9EC0';
        var allchildren = [];
        var perWidth = 80 / childData.length;
        for (var i = 0; i < childData.length; i++) {
            r1 = i * perWidth;
            r2 = (i + 1) * perWidth;
            var childrenData = [];

            for (var j = 0; j < childData[i].children.length; j++) {
                var chilLen = childData[i].children[j].children.length;
                for (var k = 0; k < chilLen; k++) {
                    var cData = childData[i].children[j].children[k];
                    childrenData.push(cData);
                    if (!cData.children) {
                        noChildData.push(cData);
                    }
                }
            }
            var allchildrenData = [];
            allchildrenData = mergeArray(childrenData, noChildData);
            allchildren.push(allchildrenData);
            len = allchildrenData.length;

            seriesPut = {
                center: ['35%', '50%'],
                name: chartName,
                type: 'pie',
                radius: [r1 + '%', r2 + '%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },

                data: (function() {
                    var res = [];
                    while (len--) {
                        res.push({
                            name: allchildrenData[len].variety,
                            value: allchildrenData[len].value,
                            itemStyle: {
                                normal: {
                                    // color: '#FF8247',
                                    color: (function() {
                                        if (0 === len) {
                                            return color1;
                                            // console.log(color1)
                                        } else {
                                            return color2;
                                        }
                                    })(),

                                    borderColor: 'white',
                                    borderWidth: 5,
                                    opacity: 1
                                }
                            }
                        });
                    }
                    return res;
                })()

            };
            seriesPutData.push(seriesPut);
        }

    }

    function checkOptions(options) {
        containerId = options.containerId || "";
        width = options.width || width;
        height = options.height || height;
    }

    return {
        createGraph: treeChart
    };
}();