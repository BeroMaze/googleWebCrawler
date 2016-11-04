var express = require('express');
var app = express();
var Crawler = require("node-webcrawler");
var GoogleSearch = require('google-search');
var google = require('google');
var googleSearch = new GoogleSearch({
  // key: 'YOUR_API_KEY',
  cx: ''//your_cx_search_key
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./'));
var info;

var c = new Crawler({
    maxConnections : 20,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        if(error){
            console.log(error);
        }else{
            // console.log($("body").html());
            // var result = $('body').html();
            // var results = result.text;
            // var body = results.toLowerCase();
            // var whereIn = body.indexOf('happy hour');
            // happyData = body.substr(whereIn, '300');
        }
    }
});

google.resultsPerPage = 5;
var nextCounter = 0;

var resturant;
var InfoArray=[];
var places =[
  {id:'the-cozy-nut-tavern-seattle',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id:'hazlewood-seattle',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id:'ocho-seattle',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id:'the-gerald-seattle',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id: 'essex-seattle',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id: 'the-tin-hat-seattle-2',
  happyHour:{
    Sunday:[[""],[""]],
    Monday:[[""],[""]],
    Tuesday:[[""],[""]],
    Wednesday:[[""],[""]],
    Thursday:[[""],[""]],
    Friday:[[""],[""]],
    Saterday: [[""],[""]]
  }, website: '', logo: ''},
  {id: 'via-tribunali-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'primo-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'quarter-lounge-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'ayutthaya-thai-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'six-arms-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'café-presse-seattle-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'hot-off-the-coals-queen-anne',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'harrys-on-the-green-denton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'washington-street-pub-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'o-shucks-irish-pub-centerville',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: '404-taphouse-denton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'market-street-public-house-denton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'good-guys-sports-bar-centreville',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'docs-downtown-grille-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'applebees-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'docs-riverside-grille-centreville',
 happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'olive-garden-italian-restaurant-easton-3',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'bannings-tavern-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'out-of-the-fire-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'bartlett-pear-inn-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'scossa-restaurant-and-lounge-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-bbq-joint-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'ruby-tuesday-easton',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'hunters-tavern-easton-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'cabin-club-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'moosehead-saloon-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'hooley-house-sports-pub-and-grille-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'yard-house-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'stella-mia-ristorante-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'houlihans-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'ironwood-cafe-westlake-4',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'burntwood-tavern-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'crabbys-pub-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],

  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'mitchells-tavern-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'miami-nights-grill-bar-and-lounge-westlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-wild-goose-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-captains-club-eastlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'two-bucks-eastlake',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'local-tavern-willoughby-hills',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'croagh-patricks-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'beals-pickles-n-pints-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'twisted-paddy-mentor',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'ballantine-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'manhattan-deli-bar-and-grille-willoughby-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'billys-a-cappelli-martini-bar-mentor',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'paragon-wines-martinis-plates-euclid',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-woodroom-martini-and-wine-bar-willoughby-hills',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'sports-fanatics-willowick',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'lure-bistro-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'hooley-house-sports-pub-and-grille-mentor',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-1899-pub-willoughby',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'firehouse-grille-and-pub-willoughby-hills',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'cask-and-trotter-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-wurst-place-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'victory-lounge-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'lunchbox-laboratory-seattle-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'novilhos-brazilian-steak-house-seattle',
 happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'cuoco-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: '13-coins-restaurant-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-night-owl-lounge-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'osteria-rigoletto-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'mollusk-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-sitting-room-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'ten-mercer-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'queen-anne-beerhall-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'streamline-tavern-seattle-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'solo-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'via-tribunali-seattle-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-tin-lizzie-lounge-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'buckleys-on-queen-anne-seattle-2',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'mcmenamins-queen-anne-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'plaza-garibaldi-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-great-nabob-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-innkeeper-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'bathtub-gin-and-co-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'roccos-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''},
{id: 'the-whisky-bar-seattle',
happyHour:{
  Sunday:[[""],[""]],
  Monday:[[""],[""]],
  Tuesday:[[""],[""]],
  Wednesday:[[""],[""]],
  Thursday:[[""],[""]],
  Friday:[[""],[""]],
  Saterday: [[""],[""]]
}, website: '', logo: ''}
];

// places.forEach(function(each) {
//
//   google(each.id +' Happy Hour', function (err, res){
//     console.log(res);
//     for (var i = 0; i < res.links.length; ++i) {
//       var link = res.links[i];
//       // var smallDesc = link.description.toLowerCase();
//       var whereIn = smallDesc.indexOf('happy hour');
//       var happyData = smallDesc.substr(whereIn, '300');
//       // console.log(whereIn);
//       // console.log(link.href);
//       // console.log(smallDesc);
//       // console.log(happyData);
//       // console.log('PUSHED');
//       var place = {
//         place: each.id,
//         url: link.href,
//         happyHours: happyData
//       };
//
//       if (place.happyHours.length > 2) {
//         if ((place.happyHours.indexOf(':') > 0)) {
//           InfoArray.push(place);
//           console.log(InfoArray);
//         }
//       }
//     }
//
//     // if (nextCounter < 1) {
//     //   nextCounter += 1;
//     //   if (res.next){
//     //      res.next();
//     //   }
//     // }
//   });
// });

// Queue just one URL, with default callback
var count = 0
places.forEach(function(each) {
  count++;
  google(each.id, function (err, res){
    console.log(res);
    for (var i = 0; i < 1; ++i) {
      if (res !== null) {
        var link = res.links[i];
        var happyData;
        // console.log(link);
        if (link !== undefined) {
          var url =link.link;
          // console.log(each.id);
          crawl(url, each.id, link.href);
        }
      }
    }
  });
});

var crawl = function(website, id, href) {
  // console.log(website);
  // c.queue('http://thewhiskybar.com/happy-hour');
  c.queue([{
      uri: website,
      jQuery: true,

      // The global callback won't be called
      callback: function (error, result) {
        var rightHHData;
          if(error){
              console.log(error);
          }else{
              // console.log('Grabbed', result.body, 'bytes');
              var results = result.body;
              // console.log(results);
              var body = results.toLowerCase();
              var whereIn = body.indexOf('happy hour');
              var whereIn1 = body.indexOf('happy hour',whereIn+1);
              var whereIn2 = body.indexOf('happy hour',whereIn1+1);
              var whereIn3 = body.indexOf('happy hour',whereIn2+1);
              // console.log(whereIn);
              happyData = body.substr(whereIn, '300');
              happyData1 = body.substr(whereIn1, '300');
              happyData2 = body.substr(whereIn2, '300');
              happyData3 = body.substr(whereIn3, '300');
              // console.log(happyData3);
              if (happyData.length > 2) {
                if ((happyData.indexOf(':0') > 0)||(happyData.indexOf(':3') > 0)||(happyData.indexOf('am') > 0)||(happyData.indexOf('pm') > 0)) {
                  rightHHData = happyData;
                }
                else if ((happyData1.indexOf(':0') > 0)||(happyData1.indexOf(':3') > 0)||(happyData1.indexOf('am') > 0)||(happyData1.indexOf('pm') > 0)) {
                  rightHHData = happyData1;
                }
                else if ((happyData2.indexOf(':0') > 0)||(happyData2.indexOf(':3') > 0)||(happyData2.indexOf('am') > 0)||(happyData2.indexOf('pm') > 0)) {
                  rightHHData = happyData2;
                }
                else if ((happyData3.indexOf(':0') > 0)||(happyData3.indexOf(':3') > 0)||(happyData3.indexOf('am') > 0)||(happyData3.indexOf('pm') > 0)) {
                  rightHHData = happyData3;
                  // console.log(happyData3);
                }
              }

              addPlace(rightHHData);
            }
          function addPlace(data){
            // console.log(data);
            var place = {
              place: id,
              url: href,
              happyHours: data
            };
            // console.log(place.happyHours);
            if (place.happyHours !== undefined) {
              if (place.happyHours.length > 2) {
                if ((place.happyHours.indexOf(':0') > 0)||(place.happyHours.indexOf(':3') > 0)||(place.happyHours.indexOf('AM') > 0)||(place.happyHours.indexOf('PM') > 0)) {
                  InfoArray.push(place);
                  console.log(InfoArray);
                  console.log(count);
                }
              }
            }
          }

      }
  }]);

};
// crawl()


// });
  app.listen('3000', function(){
    console.log('listen on port: 3000');
    console.log('server running');
  });
