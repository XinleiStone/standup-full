var chaidData = {
    "nodes": [
        {
            "name": 2,
            "value": 1000,
            "classification": "健康情况",
            "agree": 700,
            "disagree": 300,
            "square": 55.55,
            "p": 0.001,
            "tip": "FeatureType: Continuous<br\/>left: <=1.9<br\/>right: >1.9",
            "children": [
                {
                    "name": 1,
                    "value": 300,
                    "agree": 700,
                    "disagree": 300,
                    "variety": "健康",
                    "tip": "predict label:1.0<br\/>prob:1.0"
                },
                {
                    "name": 2,
                    "value": 700,
                    "agree": 700,
                    "disagree": 300,
                    "classification": "家庭收入",
                    "square": 55.55,
                    "p": 0.001,
                    "variety": "不健康",
                    "tip": "FeatureType: Continuous<br\/>left: <=4.7<br\/>right: >4.7",
                    "children": [
                        {
                            "name": 2,
                            "value": 200,
                            "agree": 700,
                            "disagree": 200,
                            "variety": "富裕",
                            "tip": "predict label:2.0<br\/>prob:1.0"
                        },
                        {
                            "name": 2,
                            "value": 200,
                            "agree": 700,
                            "disagree": 300,
                            "variety": "中等",
                            "tip": "predict label:2.0<br\/>prob:1.0"
                        },
                        {
                            "name": 2,
                            "value":300,
                            "agree": 700,
                            "disagree": 200,
                            "variety": "贫困",
                            "square": 55.55,
                            "p": 0.001,
                            "classification": "有无生病",
                            "tip": "FeatureType: Continuous<br\/>left: <=5.1<br\/>right: >5.1",
                            "children": [
                                {
                                    "name": 3,
                                    "value": 200,
                                    "agree": 700,
                                    "disagree": 300,
                                    "classification": "出入场合",
                                    "square": 55.55,
                                    "p": 0.001,
                                    "variety": "生病",
                                    "tip": "FeatureType: Continuous<br\/>left: <=1.8<br\/>right: >1.8",
                                    "children": [
                                        {
                                            "name": 3,
                                            "value": 100,
                                            "agree": 700,
                                            "disagree": 300,
                                            "variety": "高密人群",
                                            "tip": "predict label:3.0<br\/>prob:0.6"
                                        },
                                        {
                                            "name": 3,
                                            "value": 100,
                                            "agree": 700,
                                            "disagree": 300,
                                            "variety": "低密人群",
                                            "tip": "predict label:3.0<br\/>prob:1.0"
                                        }
                                    ]
                                },
                                {
                                    "name": 3,
                                    "value": 100,
                                    "agree": 700,
                                    "disagree": 300,
                                    "variety": "无病",
                                    "tip": "predict label:3.0<br\/>prob:1.0"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    "chartType": "TREE",
    "name": "医疗改革",
    "agree": 571,
    "disagree": 429
};