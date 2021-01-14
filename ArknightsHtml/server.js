var express = require("express");
var server = express();
var NEDB = require("nedb");
var mongo = require("mongoose");
var bodyParser = require("body-parser");
var formidable = require("formidable");
var fs = require("fs");
var multiparty = require('multiparty');

var HomeData = new NEDB({ filename: "HomeData.db", autoload: true });
//  let yak=new NEDB({filename:"charDB/yak.db", autoload:true});
//  let vigna=new NEDB({filename:"charDB/vigna.db", autoload:true});
//  let ceylon=new NEDB({filename:"charDB/ceylon.db", autoload:true});
//  let astesi=new NEDB({filename:"charDB/astesi.db", autoload:true});

//HomeData.insert(JSON.parse(fs.readFileSync("HomeData.json")));
//  yak.insert(JSON.parse(fs.readFileSync("yak.json")));
//  vigna.insert(JSON.parse(fs.readFileSync("vigna.json")));
//  ceylon.insert(JSON.parse(fs.readFileSync("ceylon.json")));
//  astesi.insert(JSON.parse(fs.readFileSync("astesi.json")));

/*let Items = new NEDB({filename:"item.db", autoload:true})
    Items.insert(JSON.parse(fs.readFileSync("item.json")));*/


var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

server.use(express.static(__dirname));

server.set('view engine', 'ejs');

server.get("/Home", function (req, res) {

    //取得總比數 number
    HomeData.count({}, function (err, number) {
        //random
        let randomID = Math.floor(Math.random() * number) + 1;
        //拿資料
        HomeData.find({ ID: randomID }, function (err, data) {
            //給資料
            console.log(data);
            res.render('Arknights',
                {
                    star:data[0].star,
                    imgSrc: data[0].ImageName,
                    descript: data[0].Text,
                    audio: data[0].Audio
                });
        })
    })
});

server.get("/Operator", function (req, res) {

    let type = req.url.split("?")[1];
    if (typeof (type) != "undefined") {
        type = type.split("=")[1];
    }

    let query = {};



    //如果a有定義才處理資廖
    if (typeof (type) != "undefined") {
        query = { "OClass": type }
    }



    //如果有a有東西，找出對應類型的資料

    HomeData.find(query).sort({ star: -1 }).exec(function (err, charData) {
        res.render("Operator",
            {
                "charData": charData,

            })
    })
})

server.get("/item", function (req, res) {
    let Items = new NEDB({ filename: "item.db", autoload: true })
    Items.find({}).exec(function (err, item) {
        item[0].upgradematerials.sort(function (a, b) {
            return getColorGrade(a.bgColor) - getColorGrade(b.bgColor);
        })
        item[0].chip.sort(function (a, b) {
            return getColorGrade(a.bgColor) - getColorGrade(b.bgColor);
        })
        item[0].BattleRecords.sort(function (a, b) {
            return getColorGrade(a.bgColor) - getColorGrade(b.bgColor);
        })
        res.render("item",
            {
                "item": item[0],

            })
    })

})
function getColorGrade(bgColor) {
    switch (bgColor) {
        case "yellow":
            return 1;
        case "purple":
            return 2;
        case "blue":
            return 3;
        case "green":
            return 4;
        case "black":
            return 5;
    }
}


server.get("/MD2020", function (req, res) {
    let uploadImgName = ["精一縮圖：", "精二縮圖：", "時裝1縮圖：","時裝2縮圖：", "精一立繪：", "精二立繪：", "時裝1立繪：","時裝2立繪：",
        "動態GIF：", "技能1圖示：", "技能2圖示：", "技能3圖示：", "語音音檔："];
    let skillLV = ["LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "Rand I", "Rand II", "Rand III",]
    res.render("MD2020", {
        "uploadImgName": uploadImgName,
        "skillLV": skillLV
    });
});


server.get("*", function (req, res) {
    //解析url 
    let charName = req.url.toString().substring(1);

    //用url的名字去找腳色DB那邊有沒有東西
    let dataPath = "charDB/" + charName + ".db";

    fs.access(dataPath, function (err) {

        //    檔案和目錄不存在的情況下；
        if (err) {
            console.log("檔案和目錄不存在")
            //沒有就給她錯誤404
            res.send("Page not found", 404);
        }
        else {
            //有就顯示
            let charDB = new NEDB({ filename: dataPath, autoload: true });
            charDB.find({}).exec(function (err, charData) {
                HomeData.find({ ImageName: charName + ".png" }, function (err, imgData) {

                    console.log(imgData);

                    res.render("Char_interface", {
                        "charData": charData[0],
                        "imgData": imgData[0]
                    })
                })
            })


        }

    })











})

server.listen(8080);
console.log("Server running on port: 8080")


server.post("/test", function (req, res) {
    res.send("成功!");
})

function uploadFile() {

}

server.post("/insert", function (req, res) {
    let imgPath =
        [
            "Image/character/smallcharacter/promotion",
            "Image/character/smallcharacter/promotion2",
            "Image/character/smallcharacter/skin",
            "Image/character/smallcharacter/skin2",
            "Image/character/promotion",
            "Image/character/promotion2",
            "Image/character/skin",
            "Image/character/skin2",
            "Image/character/gif",
            "Image/character/skill",
            "Image/character/skill",
            "Image/character/skill",
            "Image/character/Audio",
        ];



    (new multiparty.Form()).parse(req, function (err, fields, files) {
        // handling fields and files code


        if (err) {
            console.log(err);
            //res.send("錯誤");
            res.send("上傳錯誤");
            return;
        }
        else {

            console.log('received fields: ');
            console.log(fields);
            console.log('received files: ');
            console.log(files);
            //res.send("傳送成功");
            console.log("傳送成功");
            //console.log(fields.charName);
            res.send("上傳成功");
            
            let charDbName=fields.charEName[0];
            let dataPath = "charDB/" + charDbName + ".db";
            let charDb = new NEDB({ filename: dataPath, autoload: true });

            //設定檔案路徑
            HomeData.count({}, function (err, number) {
                HomeData.insert({
                ID: number + 1,
                Name: fields.charName[0],
                ImageName: fields.charEName[0] + ".png",
                OClass: fields.OClass[0],
                promotion: fields.promotion[0],
                promotion2: fields.promotion2[0],
                skin1: fields.skin[0],
                skin2: fields.skin2[0],
                gif: fields.charEName[0] + ".gif",
                star: fields.star[0],
                Audio: fields.charEName[0] + ".wav",
                Text: fields.Text[0]
            });
        })
            let basicData=[];
            for(let i=0;i<fields.hp.length;i++)
            {
                if(fields.hp[i]==""){break;}
                basicData.push({
                sp: i+1,
                hp: fields.hp[i],
                atk: fields.atk[i],
                def: fields.def[i],
                mdef: fields.mdef[i]
                })
            }
            let skillLV = ["LV1", "LV2", "LV3", "LV4", "LV5", "LV6", "LV7", "Rand I", "Rand II", "Rand III",]
            let skillData1=[];
            let skillData2=[];
            let skillData3=[];
            for(let i=0;i<fields.skillStart1.length;i++)
            {
                if(fields.skillStart1[i]==""){break;}
                skillData1.push({
                    LV:skillLV[i],
                    text:fields.skillText1[i],
                    start:fields.skillStart1[i],
                    cost:fields.skillCost1[i]
                })
                skillData2.push({
                    LV:skillLV[i],
                    text:fields.skillText2[i],
                    start:fields.skillStart2[i],
                    cost:fields.skillCost2[i]
                })
                skillData3.push({
                    LV:skillLV[i],
                    text:fields.skillText3[i],
                    start:fields.skillStart3[i],
                    cost:fields.skillCost3[i]
                })
            }
            
            let talentData1=[];
            let talentData2=[];
            for(let i=0;i<fields.talentName1.length;i++){
                if(fields.talentName1[i]==""){break;}
                talentData1.push({
                    name:fields.talentName1[i],
                    request:fields.talentRequest1[i],
                    text:fields.talentText1[i]
                })
            }
            for(let i=0;i<fields.talentName2.length;i++){
                if(fields.talentName2[i]==""){break;}
                talentData2.push({
                    name:fields.talentName2[i],
                    request:fields.talentRequest2[i],
                    text:fields.talentText2[i]
                })
            }

            charDb.insert({
                basic:basicData,
                skill1:skillData1,
                skill2:skillData2,
                skill3:skillData3,
                talent1:talentData1,
                talent2:talentData2,
                character_name:fields.charName[0],
                character_Ename:fields.charEName[0],
                star:fields.star[0],
                position:fields.position[0],
                tag:fields.tag[0],
                function:fields.function[0],
                block:fields.block[0],
                cost:fields.cost[0],
                set_time:fields.set_time[0],
                atk_time:fields.atk_time[0],
                skill_name1:fields.skillName1[0],
                skill_Imagename1:fields.charEName[0]+"_skill1.png",
                skill_name2:fields.skillName2[0],
                skill_Imagename2:fields.charEName[0]+"_skill2.png",
                skill_name3:fields.skillName3[0],
                skill_Imagename3:fields.charEName[0]+"_skill3.png",
                atkposition0:fields.atkposition0[0],
                atkposition1:fields.atkposition1[0],
                atkposition2:fields.atkposition2[0]
            });


            for (let i = 0; i < files.pic.length; i++) {


                let fileName;

                switch (i) {

                    case 9:
                        fileName = fields.charEName[0]+"_skill1" + "." + files.pic[i].path.split(".")[1];
                        break;

                    case 10:
                        fileName = fields.charEName[0]+"_skill2" + "." + files.pic[i].path.split(".")[1];
                        break;

                    case 11:
                        fileName = fields.charEName[0]+"_skill3" + "." + files.pic[i].path.split(".")[1];
                        break;

                    default:
                        fileName = fields.charEName[0] + "." + files.pic[i].path.split(".")[1];
                        break;
                }


                let uploadPath = __dirname + "/" + imgPath[i] + "/" + fileName;

                console.log(files.pic.length);

                fs.rename(files.pic[i].path, uploadPath, function (err) {
                    if (err) {

                        console.log("重新命名失敗");
                        console.log(err);
                    } else {

                        console.log("重新命名成功!");
                    }
                })

            }

        }
    });



})

