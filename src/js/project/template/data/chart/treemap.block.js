/**
 * Created by Yinxiong on 2016/5/4 0004.
 */
import _ from 'lodash';
import random from 'src/utils/random';
import chroma from 'chroma-js';

const data = [
	{
		"tags": [
			{
				"name": "女装"
			},
			{
				"name": "男装"
			},
			{
				"name": "童装"
			},
			{
				"name": "女鞋"
			},
			{
				"name": "男鞋"
			},
			{
				"name": "童鞋"
			},
			{
				"name": "内衣"
			},
			{
				"name": "家居服装"
			},
			{
				"name": "运动户外"
			},
			{
				"name": "配饰"
			},
			{
				"name": "集合店"
			},
			{
				"name": "折扣店"
			}
		],
		"name": "服饰鞋帽"
	},
	{
		"tags": [
			{
				"name": "珠宝饰品"
			},
			{
				"name": "品牌手表"
			},
			{
				"name": "钟表行"
			}
		],
		"name": "珠宝手表"
	},
	{
		"tags": [
			{
				"name": "女包"
			},
			{
				"name": "功能包"
			},
			{
				"name": "旅行箱"
			},
			{
				"name": "男包"
			},
			{
				"name": "钱包"
			}
		],
		"name": "箱包"
	},
	{
		"tags": [
			{
				"name": "彩妆"
			},
			{
				"name": "护肤"
			},
			{
				"name": "香氛精油"
			},
			{
				"name": "假发"
			},
			{
				"name": "洗浴用品"
			},
			{
				"name": "男士护理"
			}
		],
		"name": "化妆品"
	},
	{
		"tags": [
			{
				"name": "中餐正餐"
			},
			{
				"name": "西餐正餐"
			},
			{
				"name": "自助餐"
			},
			{
				"name": "火锅涮锅"
			},
			{
				"name": "日料"
			},
			{
				"name": "韩食"
			},
			{
				"name": "快餐简餐"
			},
			{
				"name": "面包甜点"
			},
			{
				"name": "零食小吃"
			},
			{
				"name": "咖啡厅"
			},
			{
				"name": "茶座"
			},
			{
				"name": "美食广场"
			},
			{
				"name": "饮品"
			}
		],
		"name": "餐饮"
	},
	{
		"tags": [
			{
				"name": "电影院"
			},
			{
				"name": "KTV"
			},
			{
				"name": "电玩城"
			},
			{
				"name": "酒吧"
			},
			{
				"name": "体验/DIY"
			},
			{
				"name": "桌游"
			},
			{
				"name": "足疗按摩"
			},
			{
				"name": "台球室"
			},
			{
				"name": "网吧"
			},
			{
				"name": "剧院"
			},
			{
				"name": "洗浴"
			},
			{
				"name": "桑拿"
			},
			{
				"name": "采摘园"
			},
			{
				"name": "农家院"
			},
			{
				"name": "音乐厅"
			},
			{
				"name": "文化宫"
			},
			{
				"name": "夜总会"
			},
			{
				"name": "棋牌室"
			},
			{
				"name": "真人CS"
			},
			{
				"name": "游乐园"
			},
			{
				"name": "轰趴馆"
			},
			{
				"name": "游艇"
			},
			{
				"name": "温泉"
			},
			{
				"name": "壁球馆"
			},
			{
				"name": "保龄球馆"
			},
			{
				"name": "农场"
			},
			{
				"name": "密室"
			},
			{
				"name": "度假村"
			}
		],
		"name": "休闲娱乐"
	},
	{
		"tags": [
			{
				"name": "音像店"
			},
			{
				"name": "办公文具"
			},
			{
				"name": "乐器行"
			},
			{
				"name": "体育用品"
			},
			{
				"name": "工艺收藏"
			},
			{
				"name": "书店"
			},
			{
				"name": "科研机构"
			},
			{
				"name": "图书馆"
			},
			{
				"name": "留学中介"
			},
			{
				"name": "成人教育"
			},
			{
				"name": "动漫"
			},
			{
				"name": "电子学习机"
			},
			{
				"name": "会议中心"
			}
		],
		"name": "文化教育"
	},
	{
		"tags": [
			{
				"name": "皮具保养"
			},
			{
				"name": "图文快印"
			},
			{
				"name": "车辆维修"
			},
			{
				"name": "旅行社"
			},
			{
				"name": "机票/火车票代售"
			},
			{
				"name": "通讯营业厅"
			},
			{
				"name": "宠物"
			},
			{
				"name": "洗衣店"
			},
			{
				"name": "裁缝店"
			},
			{
				"name": "数码维修"
			},
			{
				"name": "邮局"
			},
			{
				"name": "快递公司"
			},
			{
				"name": "公交卡充值点"
			},
			{
				"name": "家政服务"
			},
			{
				"name": "彩票"
			},
			{
				"name": "刻章"
			},
			{
				"name": "眼镜店"
			},
			{
				"name": "房产中介"
			},
			{
				"name": "个性写真"
			},
			{
				"name": "售票处"
			},
			{
				"name": "奢侈品护理"
			},
			{
				"name": "售后客服"
			},
			{
				"name": "资源回收"
			},
			{
				"name": "家电维修"
			},
			{
				"name": "烟花爆竹"
			},
			{
				"name": "仓储出租"
			}
		],
		"name": "生活服务"
	},
	{
		"tags": [
			{
				"name": "家具"
			},
			{
				"name": "装修建材"
			},
			{
				"name": "家居装饰"
			},
			{
				"name": "床上用品"
			},
			{
				"name": "餐具"
			},
			{
				"name": "厨具"
			},
			{
				"name": "洗涤用品"
			},
			{
				"name": "卫浴产品"
			},
			{
				"name": "茶具杯具"
			}
		],
		"name": "家居厨具"
	},
	{
		"tags": [
			{
				"name": "小家电"
			},
			{
				"name": "大家电"
			},
			{
				"name": "厨房电器"
			}
		],
		"name": "家用电器"
	},
	{
		"tags": [
			{
				"name": "手机"
			},
			{
				"name": "相机"
			},
			{
				"name": "电脑"
			},
			{
				"name": "耳机音响"
			},
			{
				"name": "数码配件"
			}
		],
		"name": "数码"
	},
	{
		"tags": [
			{
				"name": "超市"
			},
			{
				"name": "便利店"
			},
			{
				"name": "数码卖场"
			},
			{
				"name": "家电卖场"
			},
			{
				"name": "杂货"
			},
			{
				"name": "烟酒行"
			},
			{
				"name": "茶叶店"
			},
			{
				"name": "购物中心"
			},
			{
				"name": "百货"
			},
			{
				"name": "花店"
			},
			{
				"name": "水果铺"
			},
			{
				"name": "礼品店"
			},
			{
				"name": "劳保用品"
			},
			{
				"name": "酒庄"
			},
			{
				"name": "农庄"
			},
			{
				"name": "名烟雪茄"
			},
			{
				"name": "家具城"
			},
			{
				"name": "农资产品"
			},
			{
				"name": "副食品"
			},
			{
				"name": "粮油店"
			},
			{
				"name": "土特产"
			}
		],
		"name": "零售卖场"
	},
	{
		"tags": [
			{
				"name": "汽车4S店"
			},
			{
				"name": "汽车装饰"
			},
			{
				"name": "汽车品牌"
			},
			{
				"name": "汽车销售综合店"
			},
			{
				"name": "汽车保养"
			},
			{
				"name": "洗车"
			},
			{
				"name": "汽车租赁"
			},
			{
				"name": "汽车维修"
			},
			{
				"name": "汽车配件"
			},
			{
				"name": "汽车检验场"
			},
			{
				"name": "二手车"
			},
			{
				"name": "车载电器"
			},
			{
				"name": "汽车改装"
			},
			{
				"name": "陪练"
			},
			{
				"name": "汽车俱乐部"
			},
			{
				"name": "代驾"
			},
			{
				"name": "汽车服务"
			}
		],
		"name": "汽车"
	},
	{
		"tags": [
			{
				"name": "健身器材"
			},
			{
				"name": "骑行运动"
			},
			{
				"name": "垂钓用品"
			},
			{
				"name": "游泳用品"
			},
			{
				"name": "户外装备"
			},
			{
				"name": "溜冰场"
			},
			{
				"name": "游泳馆"
			},
			{
				"name": "滑雪场"
			},
			{
				"name": "瑜伽馆"
			},
			{
				"name": "健身房"
			},
			{
				"name": "运动场馆"
			},
			{
				"name": "舞蹈"
			},
			{
				"name": "武术馆"
			},
			{
				"name": "极限运动"
			},
			{
				"name": "卡丁车"
			},
			{
				"name": "舍宾"
			},
			{
				"name": "高尔夫"
			},
			{
				"name": "马术"
			}
		],
		"name": "运动健康"
	},
	{
		"tags": [
			{
				"name": "母婴用品"
			},
			{
				"name": "亲子摄影"
			},
			{
				"name": "亲子游乐"
			},
			{
				"name": "早教"
			},
			{
				"name": "儿童玩具"
			},
			{
				"name": "亲子教育"
			},
			{
				"name": "月子中心"
			},
			{
				"name": "儿童家具"
			}
		],
		"name": "亲子"
	},
	{
		"tags": [
			{
				"name": "住宅区"
			},
			{
				"name": "写字楼"
			},
			{
				"name": "创业科技园"
			},
			{
				"name": "步行街"
			},
			{
				"name": "文化广场"
			},
			{
				"name": "工业区"
			},
			{
				"name": "商圈"
			},
			{
				"name": "别墅"
			},
			{
				"name": "宿舍"
			}
		],
		"name": "房地产"
	},
	{
		"tags": [
			{
				"name": "法院"
			},
			{
				"name": "检察院"
			},
			{
				"name": "政府"
			},
			{
				"name": "村民委员会"
			},
			{
				"name": "居民委员会"
			},
			{
				"name": "公证处"
			},
			{
				"name": "公安局"
			},
			{
				"name": "派出所"
			},
			{
				"name": "交通局"
			},
			{
				"name": "司法局"
			},
			{
				"name": "消防局"
			},
			{
				"name": "工商局"
			},
			{
				"name": "地税局"
			},
			{
				"name": "国税局"
			},
			{
				"name": "财政局"
			},
			{
				"name": "民政局"
			},
			{
				"name": "交管局"
			},
			{
				"name": "电信局"
			},
			{
				"name": "海关"
			},
			{
				"name": "食品局"
			},
			{
				"name": "地震局"
			},
			{
				"name": "劳动局"
			},
			{
				"name": "教育局"
			},
			{
				"name": "气象局"
			},
			{
				"name": "物价局"
			},
			{
				"name": "烟草专卖局"
			},
			{
				"name": "质监局"
			},
			{
				"name": "卫生局"
			},
			{
				"name": "规划局"
			},
			{
				"name": "水利局"
			},
			{
				"name": "文化局"
			},
			{
				"name": "审计局"
			},
			{
				"name": "旅游局"
			},
			{
				"name": "体育局"
			},
			{
				"name": "粮食局"
			},
			{
				"name": "房管所"
			},
			{
				"name": "档案馆"
			},
			{
				"name": "机关驻地办事处"
			},
			{
				"name": "大使馆"
			},
			{
				"name": "签证处"
			},
			{
				"name": "福利机构"
			},
			{
				"name": "慈善机构"
			}
		],
		"name": "政府机构"
	},
	{
		"tags": [
			{
				"name": "软件公司"
			},
			{
				"name": "互联网公司"
			},
			{
				"name": "广播电视公司"
			},
			{
				"name": "报社"
			},
			{
				"name": "杂志社"
			},
			{
				"name": "广告公司"
			},
			{
				"name": "自来水公司"
			},
			{
				"name": "电力公司"
			},
			{
				"name": "燃气公司"
			},
			{
				"name": "房地产开发公司"
			},
			{
				"name": "物业管理公司"
			},
			{
				"name": "售楼处"
			},
			{
				"name": "物流公司"
			},
			{
				"name": "律师事务所"
			},
			{
				"name": "会计事务所"
			},
			{
				"name": "审计事务所"
			},
			{
				"name": "出版社"
			},
			{
				"name": "咨询公司"
			},
			{
				"name": "纺织公司"
			},
			{
				"name": "食品公司"
			},
			{
				"name": "制药公司"
			},
			{
				"name": "通讯设备制造公司"
			},
			{
				"name": "计算机制造公司"
			},
			{
				"name": "家电制造公司"
			},
			{
				"name": "汽车制造公司"
			},
			{
				"name": "猎头公司"
			},
			{
				"name": "通讯公司"
			},
			{
				"name": "建筑公司"
			},
			{
				"name": "装修公司"
			},
			{
				"name": "经纪公司"
			},
			{
				"name": "殡葬公司"
			},
			{
				"name": "礼仪公司"
			},
			{
				"name": "公关公司"
			},
			{
				"name": "劳务公司"
			},
			{
				"name": "烟草公司"
			},
			{
				"name": "化工公司"
			},
			{
				"name": "拍卖公司"
			},
			{
				"name": "婚庆公司"
			},
			{
				"name": "园艺公司"
			},
			{
				"name": "人才市场"
			},
			{
				"name": "工厂"
			},
			{
				"name": "矿区"
			},
			{
				"name": "影视公司"
			},
			{
				"name": "艺术团"
			},
			{
				"name": "精密仪器制造公司"
			},
			{
				"name": "电力设备制造公司"
			},
			{
				"name": "贸易公司"
			},
			{
				"name": "航空公司"
			},
			{
				"name": "招标代理公司"
			},
			{
				"name": "饲料企业"
			},
			{
				"name": "皮具厂"
			},
			{
				"name": "贷款公司"
			},
			{
				"name": "酒店管理公司"
			},
			{
				"name": "重工机械"
			},
			{
				"name": "传媒公司"
			}
		],
		"name": "公司企业"
	},
	{
		"tags": [
			{
				"name": "飞机场"
			},
			{
				"name": "机场出入口"
			},
			{
				"name": "火车站"
			},
			{
				"name": "地铁站"
			},
			{
				"name": "长途汽车站"
			},
			{
				"name": "机场巴士"
			},
			{
				"name": "公交车站"
			},
			{
				"name": "港口"
			},
			{
				"name": "出租车站"
			},
			{
				"name": "高速公路服务区"
			},
			{
				"name": "收费站"
			},
			{
				"name": "停车场"
			},
			{
				"name": "加油站"
			},
			{
				"name": "红绿灯"
			}
		],
		"name": "交通设施"
	},
	{
		"tags": [
			{
				"name": "技能培训"
			},
			{
				"name": "艺术培训"
			},
			{
				"name": "语言培训"
			},
			{
				"name": "职业培训"
			},
			{
				"name": "考试培训"
			},
			{
				"name": "体育培训"
			}
		],
		"name": "培训机构"
	},
	{
		"tags": [
			{
				"name": "医院"
			},
			{
				"name": "诊所"
			},
			{
				"name": "门诊部"
			},
			{
				"name": "急救中心"
			},
			{
				"name": "疗养院"
			},
			{
				"name": "防疫站"
			},
			{
				"name": "保健院"
			},
			{
				"name": "康复中心"
			},
			{
				"name": "体检中心"
			},
			{
				"name": "药店"
			},
			{
				"name": "整形医院"
			},
			{
				"name": "医疗器械"
			},
			{
				"name": "保健品"
			},
			{
				"name": "社区卫生服务站"
			},
			{
				"name": "中医馆"
			},
			{
				"name": "畜牧兽医"
			},
			{
				"name": "心理咨询"
			},
			{
				"name": "牙科诊所"
			}
		],
		"name": "医疗"
	},
	{
		"tags": [
			{
				"name": "星级酒店"
			},
			{
				"name": "快捷酒店"
			},
			{
				"name": "公寓式酒店"
			},
			{
				"name": "旅店"
			},
			{
				"name": "商务会馆"
			},
			{
				"name": "酒店式公寓"
			},
			{
				"name": "宾馆"
			}
		],
		"name": "酒店"
	},
	{
		"tags": [
			{
				"name": "银行"
			},
			{
				"name": "典当行"
			},
			{
				"name": "信用社"
			},
			{
				"name": "保险公司"
			},
			{
				"name": "证券公司"
			},
			{
				"name": "信托公司"
			},
			{
				"name": "投资公司"
			},
			{
				"name": "担保公司"
			},
			{
				"name": "证券交易市场"
			},
			{
				"name": "理财公司"
			},
			{
				"name": "ATM"
			}
		],
		"name": "金融"
	},
	{
		"tags": [
			{
				"name": "动物园"
			},
			{
				"name": "植物园"
			},
			{
				"name": "海底世界"
			},
			{
				"name": "博物馆"
			},
			{
				"name": "美术馆"
			},
			{
				"name": "科技馆"
			},
			{
				"name": "展览馆"
			},
			{
				"name": "名胜古迹"
			},
			{
				"name": "海滨浴场"
			},
			{
				"name": "风景区"
			},
			{
				"name": "自然保护区"
			},
			{
				"name": "旅游度假区"
			},
			{
				"name": "寺庙"
			},
			{
				"name": "教堂"
			},
			{
				"name": "公园"
			},
			{
				"name": "天文馆"
			}
		],
		"name": "旅游景点"
	},
	{
		"tags": [
			{
				"name": "幼儿园"
			},
			{
				"name": "小学"
			},
			{
				"name": "初中"
			},
			{
				"name": "高中"
			},
			{
				"name": "中专"
			},
			{
				"name": "大学"
			},
			{
				"name": "特殊教育学校"
			},
			{
				"name": "大专"
			}
		],
		"name": "学校"
	},
	{
		"tags": [
			{
				"name": "农贸市场"
			},
			{
				"name": "服装批发市场"
			},
			{
				"name": "轻纺市场"
			},
			{
				"name": "药材批发市场"
			},
			{
				"name": "文具批发市场"
			},
			{
				"name": "小商品市场"
			},
			{
				"name": "花鸟市场"
			},
			{
				"name": "二手市场"
			}
		],
		"name": "集市/批发市场"
	},
	{
		"tags": [
			{
				"name": "婚纱摄影"
			},
			{
				"name": "婚纱礼服"
			},
			{
				"name": "婚庆服务"
			},
			{
				"name": "婚介"
			}
		],
		"name": "结婚"
	},
	{
		"tags": [
			{
				"name": "美容SPA"
			},
			{
				"name": "美发"
			},
			{
				"name": "美甲"
			},
			{
				"name": "刺青"
			},
			{
				"name": "瘦身纤体"
			},
			{
				"name": "养生馆"
			},
			{
				"name": "彩妆造型"
			}
		],
		"name": "丽人"
	}
];

let points = [];
_.forEach(data.slice(0, 6), function(firstLevel, index){
	let id = 'id_'+index;
	let o = {
		id: id,
		name: firstLevel.name,
		color: chroma.brewer.OrRd[index]
	};
	let firstLevelValue = 0;
	_.forEach(firstLevel.tags, function(secondLevel, sIndex){
		let s = {
			id: id+'_'+sIndex,
			name: secondLevel.name,
			parent: id,
			value: random.random(0, 100)
		};

		firstLevelValue += s.value;
		points.push(s)
	});
	o.value = Math.round(firstLevelValue/firstLevel.tags.length);
	points.push(o);
});

export default points;




